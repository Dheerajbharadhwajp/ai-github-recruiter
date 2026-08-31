from typing import List, Optional, Tuple

from langchain_core.prompts import ChatPromptTemplate

from app.agents.llm import get_llm
from app.models import Analysis, RoleScreening, User


def _candidate_block(
    user: User, analysis: Optional[Analysis], screening: Optional[RoleScreening]
) -> str:
    if analysis is None:
        return f"- {user.github_username}: no AI analysis yet."

    strengths = ", ".join(analysis.strengths[:5]) or "none listed"
    weaknesses = ", ".join(analysis.weaknesses[:5]) or "none listed"
    skills = (
        ", ".join(f"{s['name']} ({s['proficiency']}%)" for s in analysis.skills[:5])
        or "none listed"
    )

    lines = [
        f"- {user.github_username} (score: {analysis.score}/100, "
        f"experience: {analysis.experience_level}, recommended role: {analysis.recommended_role})",
        f"  summary: {analysis.summary}",
        f"  strengths: {strengths}",
        f"  weaknesses: {weaknesses}",
        f"  skills: {skills}",
    ]
    if screening:
        lines.append(
            f"  screening verdict: {screening.verdict} for '{screening.role}' — {screening.reasoning}"
        )
    return "\n".join(lines)


def build_candidates_block(
    rows: List[Tuple[User, Optional[Analysis], Optional[RoleScreening]]],
) -> str:
    blocks = [_candidate_block(user, analysis, screening) for user, analysis, screening in rows]
    return "\n".join(blocks) or "No candidates have been searched yet."


async def answer_question(question: str, candidates_block: str) -> str:
    llm = get_llm()
    prompt = ChatPromptTemplate.from_messages(
        [
            (
                "system",
                "You are an AI assistant helping a technical recruiter evaluate candidates. "
                "Answer the recruiter's question using ONLY the candidate data provided below. "
                "If the question is about someone not in the list, or asks for information not "
                "present in the data, say so plainly rather than guessing.\n\n"
                "Candidates:\n{candidates_block}",
            ),
            ("human", "{question}"),
        ]
    )
    chain = prompt | llm
    result = await chain.ainvoke({"candidates_block": candidates_block, "question": question})
    return result.content
