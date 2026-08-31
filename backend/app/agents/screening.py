from typing import List, TypedDict

from langchain_core.prompts import ChatPromptTemplate

from app.agents.llm import get_llm
from app.schemas.screening import RoleFitVerdict


class AnalysisSnapshot(TypedDict):
    github_username: str
    score: int
    recommended_role: str
    experience_level: str
    summary: str
    strengths: List[str]
    weaknesses: List[str]
    skills: List[dict]


def _skills_block(skills: List[dict]) -> str:
    return ", ".join(f"{s['name']} ({s['proficiency']}%)" for s in skills) or "none listed"


async def screen_candidate(snapshot: AnalysisSnapshot, role: str) -> RoleFitVerdict:
    llm = get_llm().with_structured_output(RoleFitVerdict)
    prompt = ChatPromptTemplate.from_messages(
        [
            (
                "system",
                "You are a technical recruiter deciding whether a candidate should be "
                "Approved or Rejected for a specific open role, based solely on their "
                "existing AI-generated profile analysis. Be decisive and justify your "
                "verdict with specific evidence from the analysis given.",
            ),
            (
                "human",
                "Target role: {role}\n\n"
                "Candidate: {github_username}\n"
                "Score: {score}/100\n"
                "Recommended role (from prior analysis): {recommended_role}\n"
                "Experience level: {experience_level}\n"
                "Summary: {summary}\n"
                "Strengths: {strengths}\n"
                "Weaknesses: {weaknesses}\n"
                "Skills: {skills}",
            ),
        ]
    )
    chain = prompt | llm
    return await chain.ainvoke(
        {
            "role": role,
            "github_username": snapshot["github_username"],
            "score": snapshot["score"],
            "recommended_role": snapshot["recommended_role"],
            "experience_level": snapshot["experience_level"],
            "summary": snapshot["summary"],
            "strengths": ", ".join(snapshot["strengths"]) or "none listed",
            "weaknesses": ", ".join(snapshot["weaknesses"]) or "none listed",
            "skills": _skills_block(snapshot["skills"]),
        }
    )
