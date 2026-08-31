import asyncio
from datetime import datetime
from typing import List

from sqlmodel import Session, select

from app.agents.screening import AnalysisSnapshot, screen_candidate
from app.models import Analysis, RoleScreening, User
from app.schemas.candidate import CandidateSummary
from app.services.candidate_service import list_candidates

_CONCURRENCY = asyncio.Semaphore(5)


async def _screen_with_limit(snapshot: AnalysisSnapshot, role: str):
    async with _CONCURRENCY:
        return await screen_candidate(snapshot, role)


async def screen_candidates(role: str, session: Session) -> List[CandidateSummary]:
    users = session.exec(select(User)).all()
    analyses = session.exec(select(Analysis)).all()
    analysis_by_user_id = {a.user_id: a for a in analyses}

    targets = [(user, analysis_by_user_id[user.id]) for user in users if user.id in analysis_by_user_id]

    snapshots: List[AnalysisSnapshot] = [
        {
            "github_username": user.github_username,
            "score": analysis.score,
            "recommended_role": analysis.recommended_role,
            "experience_level": analysis.experience_level,
            "summary": analysis.summary,
            "strengths": analysis.strengths,
            "weaknesses": analysis.weaknesses,
            "skills": analysis.skills,
        }
        for user, analysis in targets
    ]

    results = await asyncio.gather(
        *[_screen_with_limit(snapshot, role) for snapshot in snapshots],
        return_exceptions=True,
    )

    for (user, _analysis), result in zip(targets, results):
        if isinstance(result, BaseException):
            continue

        existing = session.exec(
            select(RoleScreening).where(RoleScreening.user_id == user.id)
        ).first()
        screening = existing or RoleScreening(user_id=user.id)
        screening.role = role
        screening.verdict = result.verdict
        screening.reasoning = result.reasoning
        screening.screened_at = datetime.utcnow()
        session.add(screening)

    session.commit()
    return list_candidates(session)
