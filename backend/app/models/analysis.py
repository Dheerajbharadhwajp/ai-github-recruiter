from typing import List, Optional, TYPE_CHECKING

from sqlalchemy import Column, JSON
from sqlmodel import Field, Relationship, SQLModel

if TYPE_CHECKING:
    from app.models.user import User


class Analysis(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    user_id: int = Field(foreign_key="user.id", index=True, unique=True)

    score: int = 0
    summary: str = ""
    recommended_role: str = ""
    experience_level: str = ""

    documentation: str = ""
    architecture: str = ""
    testing: str = ""

    strengths: List[str] = Field(default_factory=list, sa_column=Column(JSON))
    weaknesses: List[str] = Field(default_factory=list, sa_column=Column(JSON))
    skills: List[dict] = Field(default_factory=list, sa_column=Column(JSON))

    user: Optional["User"] = Relationship(back_populates="analysis")
