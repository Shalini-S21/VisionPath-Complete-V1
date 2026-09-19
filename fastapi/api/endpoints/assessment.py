"""
Assessment Proficiency Analysis Endpoints for VisionPath.
"""

from fastapi import APIRouter, HTTPException
from schemas.schemas import AssessmentAnalyzeRequest, AssessmentAnalyzeResponse
from ml.assessment_analyzer import assessment_analyzer

router = APIRouter(prefix="/ai/assessment", tags=["Assessment Analysis"])


@router.post("/analyze", response_model=AssessmentAnalyzeResponse)
def analyze_assessment(request: AssessmentAnalyzeRequest):
    try:
        res = assessment_analyzer.evaluate_results(
            total_questions=request.total_questions,
            correct_count=request.correct_count,
            incorrect_count=request.incorrect_count,
            unanswered_count=request.unanswered_count,
            category=request.category,
            duration_minutes=request.duration_minutes
        )
        return AssessmentAnalyzeResponse(**res)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Assessment analysis error: {str(e)}")
