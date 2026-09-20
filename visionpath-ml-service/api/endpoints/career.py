"""
Career Recommendation Endpoints for VisionPath.
"""

from fastapi import APIRouter, HTTPException
from schemas.schemas import (
    CareerRecommendRequest, CareerRecommendResponse, CareerItem
)
from ml.career_recommender import career_recommender

router = APIRouter(prefix="/ai/career", tags=["Career Recommendation"])


@router.post("/recommend", response_model=CareerRecommendResponse)
def recommend_careers(request: CareerRecommendRequest):
    try:
        ranked = career_recommender.recommend(
            student_skills=request.student_skills,
            assessment_score=request.assessment_score,
            academic_level=request.academic_level,
            interests=request.interests,
            top_n=request.top_n or 5
        )
        items = [CareerItem(**r) for r in ranked]
        return CareerRecommendResponse(
            recommendations=items,
            total_considered=len(career_recommender.catalog)
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Career recommendation error: {str(e)}")
