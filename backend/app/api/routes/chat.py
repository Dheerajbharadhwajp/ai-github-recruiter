from fastapi import APIRouter, Depends, HTTPException
from sqlmodel import Session

from app.database import get_session
from app.schemas.chat import ChatRequest, ChatResponse
from app.services.chat_service import answer_chat_question

router = APIRouter(prefix="/api", tags=["chat"])


@router.post("/chat", response_model=ChatResponse)
async def chat(payload: ChatRequest, session: Session = Depends(get_session)):
    try:
        answer = await answer_chat_question(payload.question, session)
    except RuntimeError as e:
        raise HTTPException(status_code=503, detail=str(e))
    except Exception:
        raise HTTPException(
            status_code=502,
            detail="Chat failed. Check that GROQ_API_KEY is valid and try again.",
        )
    return ChatResponse(answer=answer)
