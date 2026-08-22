from langchain_core.prompts import ChatPromptTemplate

from app.agents.llm import get_llm
from app.agents.state import AnalysisState
from app.schemas.analysis import (
    ProfileAnalysis,
    RecruiterVerdict,
    RepositoryAnalysis,
    SkillExtraction,
)


def _repos_block(state: AnalysisState) -> str:
    lines = []
    for r in state.get("repos", []):
        readme_excerpt = (r["readme"] or "")[:2000]
        lines.append(
            f"- {r['repo_name']} (lang: {r['language'] or 'n/a'}, "
            f"stars: {r['stars']}, forks: {r['forks']})\n"
            f"  description: {r['description'] or 'n/a'}\n"
            f"  README excerpt: {readme_excerpt or '[no README found]'}"
        )
    return "\n".join(lines) or "No repositories available."


async def profile_analyzer(state: AnalysisState) -> dict:
    llm = get_llm().with_structured_output(ProfileAnalysis)
    prompt = ChatPromptTemplate.from_messages(
        [
            (
                "system",
                "You are an expert technical recruiter assessing a developer's GitHub profile. "
                "Infer their experience level and write a concise summary.",
            ),
            (
                "human",
                "GitHub username: {username}\nBio: {bio}\nFollowers: {followers}\n"
                "Following: {following}\nPublic repos: {public_repos}\n"
                "Languages seen across repos: {languages}\n"
                "Repo count considered: {repo_count}",
            ),
        ]
    )
    chain = prompt | llm
    result = await chain.ainvoke(
        {
            "username": state["github_username"],
            "bio": state.get("bio") or "No bio provided.",
            "followers": state.get("followers", 0),
            "following": state.get("following", 0),
            "public_repos": state.get("public_repos", 0),
            "languages": ", ".join(state.get("languages", [])) or "unknown",
            "repo_count": state.get("repo_count", 0),
        }
    )
    return {"profile_analysis": result}


async def repository_analyzer(state: AnalysisState) -> dict:
    llm = get_llm().with_structured_output(RepositoryAnalysis)
    prompt = ChatPromptTemplate.from_messages(
        [
            (
                "system",
                "You are a senior engineer reviewing a developer's repositories for code quality "
                "signals. Judge documentation, architecture, and testing practices using the "
                "metadata and README excerpts provided. If evidence is thin, rate conservatively "
                "rather than assuming quality.",
            ),
            ("human", "Repositories:\n{repos_block}"),
        ]
    )
    chain = prompt | llm
    result = await chain.ainvoke({"repos_block": _repos_block(state)})
    return {"repository_analysis": result}


async def skill_extractor(state: AnalysisState) -> dict:
    llm = get_llm().with_structured_output(SkillExtraction)
    prompt = ChatPromptTemplate.from_messages(
        [
            (
                "system",
                "You extract technical skills from a developer's GitHub activity. For each "
                "skill, estimate a proficiency from 0-100 based on how prominently and how well "
                "it's used across the repos and READMEs given. Be judicious - this is your "
                "expert estimate, not a fabricated exact measurement.",
            ),
            ("human", "Languages: {languages}\nRepositories:\n{repos_block}"),
        ]
    )
    chain = prompt | llm
    result = await chain.ainvoke(
        {
            "languages": ", ".join(state.get("languages", [])) or "unknown",
            "repos_block": _repos_block(state),
        }
    )
    return {"skill_extraction": result}


async def recruiter_agent(state: AnalysisState) -> dict:
    llm = get_llm().with_structured_output(RecruiterVerdict)
    prompt = ChatPromptTemplate.from_messages(
        [
            (
                "system",
                "You are the lead recruiter. Combine the profile analysis, repository analysis, "
                "and extracted skills into a final employability verdict: a 0-100 score, a "
                "recommended role, concrete strengths, concrete weaknesses, and a short summary.",
            ),
            (
                "human",
                "Profile analysis: {profile_analysis}\n"
                "Repository analysis: {repository_analysis}\n"
                "Skills: {skills}",
            ),
        ]
    )
    chain = prompt | llm
    result = await chain.ainvoke(
        {
            "profile_analysis": state["profile_analysis"].model_dump_json(),
            "repository_analysis": state["repository_analysis"].model_dump_json(),
            "skills": state["skill_extraction"].model_dump_json(),
        }
    )
    return {"recruiter_verdict": result}
