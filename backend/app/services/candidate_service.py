from typing import List

from sqlmodel import Session, select

from app.models import Analysis, RoleScreening, User
from app.schemas.candidate import CandidateSummary, ScreeningInfo


def reset_candidates(session: Session) -> None:
    users = session.exec(select(User)).all()
    for user in users:
        session.delete(user)
    session.commit()


def list_candidates(session: Session) -> List[CandidateSummary]:
    users = session.exec(select(User)).all()
    analyses = session.exec(select(Analysis)).all()
    screenings = session.exec(select(RoleScreening)).all()
    analysis_by_user_id = {a.user_id: a for a in analyses}
    screening_by_user_id = {s.user_id: s for s in screenings}

    candidates = []
    for user in users:
        analysis = analysis_by_user_id.get(user.id)
        screening = screening_by_user_id.get(user.id)
        candidates.append(
            CandidateSummary(
                id=user.id,
                github_username=user.github_username,
                name=user.name,
                avatar_url=user.avatar_url,
                has_analysis=analysis is not None,
                score=analysis.score if analysis else None,
                recommended_role=analysis.recommended_role if analysis else None,
                experience_level=analysis.experience_level if analysis else None,
                screening=(
                    ScreeningInfo(
                        role=screening.role,
                        verdict=screening.verdict,
                        reasoning=screening.reasoning,
                    )
                    if screening
                    else None
                ),
            )
        )
    return candidates
