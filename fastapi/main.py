"""
VisionPath - Python FastAPI AI Integration Layer
Entrypoint application for real NLP, lightweight ML/recommendation, and Google Gemini LLM processing.
"""

import sys
import os

# Ensure current directory is in sys.path
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

from dotenv import load_dotenv
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

# Load environment variables
load_dotenv()

# Import endpoint routers
from api.endpoints.skills import router as skills_router
from api.endpoints.career import router as career_router
from api.endpoints.questions import router as questions_router
from api.endpoints.mentor import router as mentor_router
from api.endpoints.roadmap import router as roadmap_router
from api.endpoints.assessment import router as assessment_router
from api.endpoints.resume import router as resume_router
from api.endpoints.bridge import router as bridge_router

app = FastAPI(
    title="VisionPath AI Integration Layer",
    description="Executable NLP, ML Career Recommender, and Google Gemini LLM API Layer for VisionPath",
    version="1.0.0"
)

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Mount Routers
app.include_router(skills_router)
app.include_router(career_router)
app.include_router(questions_router)
app.include_router(mentor_router)
app.include_router(roadmap_router)
app.include_router(assessment_router)
app.include_router(resume_router)
app.include_router(bridge_router)


@app.get("/")
def root():
    return {
        "service": "VisionPath AI Integration Layer",
        "status": "ONLINE",
        "architecture": "React -> Spring Boot -> FastAPI (NLP + ML + Gemini) -> PostgreSQL",
        "version": "1.0.0"
    }


@app.get("/health")
def health_check():
    return {
        "status": "UP",
        "nlp_engine": "READY",
        "ml_recommender": "READY",
        "gemini_integration": "ONLINE"
    }


if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
