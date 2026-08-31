from sqlmodel import Session, select

from app.agents.chat import answer_question, build_candidates_block
from app.models import Analysis, RoleScreening, User


async def answer_chat_question(question: str, session: Session) -> str:
    users = session.exec(select(User)).all()
    analyses = session.exec(select(Analysis)).all()
    screenings = session.exec(select(RoleScreening)).all()
    analysis_by_user_id = {a.user_id: a for a in analyses}
    screening_by_user_id = {s.user_id: s for s in screenings}

    rows = [
        (user, analysis_by_user_id.get(user.id), screening_by_user_id.get(user.id))
        for user in users
    ]

    block = build_candidates_block(rows)
    return await answer_question(question, block)
