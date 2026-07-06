from fastapi import FastAPI

app = FastAPI(
    title="AI GitHub Recruiter API",
    version="1.0.0"
)

@app.get("/")
def root():
    return {"message": "AI GitHub Recruiter API is running"}

@app.get("/health")
def health():
    return {"status": "healthy"}
