from fastapi import APIRouter, Depends
from sqlmodel import Session, select

from app.database import get_session
from app.models import Repository
from app.schemas.profile import ProfileRequest, ProfileResponse, RepositoryRead
from app.services.profile_service import sync_profile

router = APIRouter(prefix="/api", tags=["profile"])


@router.post("/profile", response_model=ProfileResponse)
async def analyze_profile(payload: ProfileRequest, session: Session = Depends(get_session)):
    user = await sync_profile(payload.username, session)
    repos = session.exec(select(Repository).where(Repository.user_id == user.id)).all()
    return ProfileResponse(
        id=user.id,
        github_username=user.github_username,
        name=user.name,
        bio=user.bio,
        avatar_url=user.avatar_url,
        followers=user.followers,
        following=user.following,
        public_repos=user.public_repos,
        repositories=[RepositoryRead.model_validate(r) for r in repos],
    )
