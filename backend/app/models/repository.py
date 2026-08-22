from typing import Optional, TYPE_CHECKING

from sqlmodel import Field, Relationship, SQLModel, UniqueConstraint

if TYPE_CHECKING:
    from app.models.user import User


class Repository(SQLModel, table=True):
    __table_args__ = (
        UniqueConstraint(
            "user_id", "owner_login", "repo_name", name="uq_repository_user_owner_repo_name"
        ),
    )

    id: Optional[int] = Field(default=None, primary_key=True)
    user_id: int = Field(foreign_key="user.id", index=True)
    owner_login: str
    repo_name: str
    description: Optional[str] = None
    language: Optional[str] = None
    stars: int = 0
    forks: int = 0
    url: str
    is_contributed: bool = False

    user: Optional["User"] = Relationship(back_populates="repositories")
