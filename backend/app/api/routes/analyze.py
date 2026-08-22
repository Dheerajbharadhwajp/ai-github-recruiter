from fastapi import APIRouter, Depends, HTTPException
from sqlmodel import Session

from app.database import get_session
from app.schemas.analysis import AnalysisResponse, AnalyzeRequest
from app.services.analysis_service import run_analysis

router = APIRouter(prefix="/api", tags=["analyze"])


@router.post("/analyze", response_model=AnalysisResponse)
async def analyze_profile(payload: AnalyzeRequest, session: Session = Depends(get_session)):
    try:
        analysis = await run_analysis(payload.username, session, force=payload.force)
    except HTTPException:
        raise
    except RuntimeError as e:
        raise HTTPException(status_code=503, detail=str(e))
    except Exception:
        raise HTTPException(
            status_code=502,
            detail="AI analysis failed. Check that GROQ_API_KEY is valid and try again.",
        )

    return AnalysisResponse.model_validate(analysis)
