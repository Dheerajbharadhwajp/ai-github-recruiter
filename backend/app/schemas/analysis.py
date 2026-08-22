from typing import List, Literal

from pydantic import BaseModel, Field

QualityRating = Literal["Poor", "Average", "Good", "Excellent"]


class ProfileAnalysis(BaseModel):
    experience_level: Literal["Beginner", "Intermediate", "Advanced", "Expert"] = Field(
        description="Overall experience level inferred from bio, activity, and repo signals."
    )
    summary: str = Field(description="One to two sentence summary of the developer's profile.")


class RepositoryAnalysis(BaseModel):
    documentation: QualityRating
    architecture: QualityRating
    testing: QualityRating
    notes: str = Field(description="Short justification referencing specific repos/READMEs.")


class SkillItem(BaseModel):
    name: str
    proficiency: int = Field(ge=0, le=100, description="Estimated proficiency 0-100.")


class SkillExtraction(BaseModel):
    skills: List[SkillItem]


class RecruiterVerdict(BaseModel):
    score: int = Field(ge=0, le=100)
    recommended_role: str
    strengths: List[str]
    weaknesses: List[str]
    summary: str


class AnalyzeRequest(BaseModel):
    username: str
    force: bool = False


class AnalysisResponse(BaseModel):
    id: int
    user_id: int
    score: int
    summary: str
    recommended_role: str
    experience_level: str
    documentation: str
    architecture: str
    testing: str
    strengths: List[str]
    weaknesses: List[str]
    skills: List[SkillItem]

    model_config = {"from_attributes": True}
