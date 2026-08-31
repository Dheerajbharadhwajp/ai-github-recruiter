from typing import Literal

from pydantic import BaseModel, Field


class ScreenRequest(BaseModel):
    role: str


class RoleFitVerdict(BaseModel):
    verdict: Literal["Approved", "Rejected"]
    reasoning: str = Field(
        description="1-2 sentence justification referencing the candidate's stored analysis."
    )
