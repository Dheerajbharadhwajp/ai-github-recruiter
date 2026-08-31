from fastapi import APIRouter, Depends, status
from sqlmodel import Session

from app.database import get_session
from app.schemas.candidate import CandidateListResponse
from app.schemas.screening import ScreenRequest
from app.services.candidate_service import list_candidates, reset_candidates
from app.services.screening_service import screen_candidates

router = APIRouter(prefix="/api", tags=["candidates"])


@router.get("/candidates", response_model=CandidateListResponse)
def get_candidates(session: Session = Depends(get_session)):
    return CandidateListResponse(candidates=list_candidates(session))


@router.delete("/candidates", status_code=status.HTTP_204_NO_CONTENT)
def delete_candidates(session: Session = Depends(get_session)):
    reset_candidates(session)


@router.post("/candidates/screen", response_model=CandidateListResponse)
async def screen(payload: ScreenRequest, session: Session = Depends(get_session)):
    candidates = await screen_candidates(payload.role, session)
    return CandidateListResponse(candidates=candidates)
