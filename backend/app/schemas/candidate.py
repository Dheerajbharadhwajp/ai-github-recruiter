from typing import List, Optional

from pydantic import BaseModel


class ScreeningInfo(BaseModel):
    role: str
    verdict: str
    reasoning: str


class CandidateSummary(BaseModel):
    id: int
    github_username: str
    name: Optional[str] = None
    avatar_url: Optional[str] = None
    has_analysis: bool
    score: Optional[int] = None
    recommended_role: Optional[str] = None
    experience_level: Optional[str] = None
    screening: Optional[ScreeningInfo] = None


class CandidateListResponse(BaseModel):
    candidates: List[CandidateSummary]
