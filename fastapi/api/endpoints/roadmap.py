"""
Personalized Study Roadmap Endpoints for VisionPath.
"""

from fastapi import APIRouter, HTTPException
from schemas.schemas import RoadmapGenerateRequest, RoadmapGenerateResponse
from llm.roadmap import roadmap_generator

router = APIRouter(prefix="/ai/roadmap", tags=["Study Roadmap"])


@router.post("/generate", response_model=RoadmapGenerateResponse)
def generate_roadmap(request: RoadmapGenerateRequest):
    try:
        res = roadmap_generator.generate_roadmap(
            target_role=request.target_role,
            current_skills=request.current_skills,
            missing_skills=request.missing_skills,
            academic_level=request.academic_level or "College Student",
            duration_weeks=request.duration_weeks or 4
        )
        return RoadmapGenerateResponse(**res)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Roadmap generation error: {str(e)}")
