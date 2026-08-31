from datetime import datetime
from typing import Optional, TYPE_CHECKING

from sqlmodel import Field, Relationship, SQLModel

if TYPE_CHECKING:
    from app.models.user import User


class RoleScreening(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    user_id: int = Field(foreign_key="user.id", index=True, unique=True)

    role: str
    verdict: str
    reasoning: str
    screened_at: datetime = Field(default_factory=datetime.utcnow)

    user: Optional["User"] = Relationship(back_populates="screening")
