from langchain_groq import ChatGroq

from app.core.config import GROQ_API_KEY, GROQ_MODEL


def get_llm(temperature: float = 0.2) -> ChatGroq:
    if not GROQ_API_KEY:
        raise RuntimeError(
            "GROQ_API_KEY is not set. Generate a free key at https://console.groq.com "
            "and set it in backend/.env."
        )
    return ChatGroq(
        model=GROQ_MODEL,
        api_key=GROQ_API_KEY,
        temperature=temperature,
        timeout=30,
        max_retries=2,
    )
