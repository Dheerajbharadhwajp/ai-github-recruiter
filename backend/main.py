from contextlib import asynccontextmanager

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api.routes import analyze, candidates, chat, profile
from app.core.config import CORS_ORIGINS
from app.database import create_db_and_tables


@asynccontextmanager
async def lifespan(app: FastAPI):
    create_db_and_tables()
    yield


app = FastAPI(
    title="AI GitHub Recruiter API",
    version="1.0.0",
    lifespan=lifespan,
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(profile.router)
app.include_router(analyze.router)
app.include_router(candidates.router)
app.include_router(chat.router)


@app.get("/")
def root():
    return {"message": "AI GitHub Recruiter API is running"}

@app.get("/health")
def health():
    return {"status": "healthy"}
