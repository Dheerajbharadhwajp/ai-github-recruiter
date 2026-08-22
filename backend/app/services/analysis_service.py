from fastapi import HTTPException
from sqlmodel import Session, select

from app.agents.graph import run_analysis_graph
from app.models import Analysis, Repository, User
from app.services.github_service import fetch_readmes_for_top_repos


async def run_analysis(username: str, session: Session, force: bool = False) -> Analysis:
    user = session.exec(select(User).where(User.github_username == username)).first()
    if user is None:
        raise HTTPException(
            status_code=404,
            detail=f"No profile found for '{username}'. Call POST /api/profile first.",
        )

    existing = session.exec(select(Analysis).where(Analysis.user_id == user.id)).first()
    if existing is not None and not force:
        return existing

    repos = session.exec(select(Repository).where(Repository.user_id == user.id)).all()
    languages = sorted({r.language for r in repos if r.language})

    repo_dicts = [
        {
            "repo_name": r.repo_name,
            "description": r.description,
            "language": r.language,
            "stars": r.stars,
            "forks": r.forks,
        }
        for r in repos
    ]
    readmes = await fetch_readmes_for_top_repos(user.github_username, repo_dicts)
    repo_contexts = [
        {**rd, "readme": readmes.get(rd["repo_name"])}
        for rd in repo_dicts
        if rd["repo_name"] in readmes
    ]

    initial_state = {
        "github_username": user.github_username,
        "name": user.name,
        "bio": user.bio,
        "followers": user.followers,
        "following": user.following,
        "public_repos": user.public_repos,
        "languages": languages,
        "repo_count": len(repos),
        "repos": repo_contexts,
    }

    result = await run_analysis_graph(initial_state)

    profile = result["profile_analysis"]
    repo_analysis = result["repository_analysis"]
    skills = result["skill_extraction"]
    verdict = result["recruiter_verdict"]

    analysis = existing or Analysis(user_id=user.id)
    analysis.score = verdict.score
    analysis.summary = verdict.summary
    analysis.recommended_role = verdict.recommended_role
    analysis.experience_level = profile.experience_level
    analysis.documentation = repo_analysis.documentation
    analysis.architecture = repo_analysis.architecture
    analysis.testing = repo_analysis.testing
    analysis.strengths = verdict.strengths
    analysis.weaknesses = verdict.weaknesses
    analysis.skills = [s.model_dump() for s in skills.skills]

    session.add(analysis)
    session.commit()
    session.refresh(analysis)
    return analysis
