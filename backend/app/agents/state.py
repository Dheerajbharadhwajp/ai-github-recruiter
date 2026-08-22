from typing import List, Optional, TypedDict

from app.schemas.analysis import (
    ProfileAnalysis,
    RecruiterVerdict,
    RepositoryAnalysis,
    SkillExtraction,
)


class RepoContext(TypedDict):
    repo_name: str
    description: Optional[str]
    language: Optional[str]
    stars: int
    forks: int
    readme: Optional[str]


class AnalysisState(TypedDict, total=False):
    github_username: str
    name: Optional[str]
    bio: Optional[str]
    followers: int
    following: int
    public_repos: int
    languages: List[str]
    repo_count: int
    repos: List[RepoContext]

    profile_analysis: ProfileAnalysis
    repository_analysis: RepositoryAnalysis
    skill_extraction: SkillExtraction
    recruiter_verdict: RecruiterVerdict
