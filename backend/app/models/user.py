from typing import List, Optional, TYPE_CHECKING

from sqlmodel import Field, Relationship, SQLModel

if TYPE_CHECKING:
    from app.models.repository import Repository
    from app.models.analysis import Analysis
    from app.models.role_screening import RoleScreening


class User(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    github_username: str = Field(index=True, unique=True)
    name: Optional[str] = None
    bio: Optional[str] = None
    avatar_url: Optional[str] = None
    followers: int = 0
    following: int = 0
    public_repos: int = 0

    repositories: List["Repository"] = Relationship(
        back_populates="user",
        sa_relationship_kwargs={"cascade": "all, delete-orphan"},
    )
    analysis: Optional["Analysis"] = Relationship(
        back_populates="user",
        sa_relationship_kwargs={"cascade": "all, delete-orphan", "uselist": False},
    )
    screening: Optional["RoleScreening"] = Relationship(
        back_populates="user",
        sa_relationship_kwargs={"cascade": "all, delete-orphan", "uselist": False},
    )
