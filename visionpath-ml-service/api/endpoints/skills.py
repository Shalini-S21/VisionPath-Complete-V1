"""
Skills API Endpoints for VisionPath.
"""

from fastapi import APIRouter, HTTPException
from schemas.schemas import (
    SkillExtractRequest, SkillExtractResponse,
    SkillGapRequest, SkillGapResponse
)
from nlp.skill_extractor import skill_extractor
from ml.skill_matcher import skill_matcher

router = APIRouter(prefix="/ai/skills", tags=["Skills & Gap Analysis"])


@router.post("/extract", response_model=SkillExtractResponse)
def extract_skills(request: SkillExtractRequest):
    try:
        skills = skill_extractor.extract_skills(request.text)
        return SkillExtractResponse(
            technical=skills["technical"],
            soft=skills["soft"],
            all=skills["all"],
            total_count=len(skills["all"])
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Skill extraction error: {str(e)}")


@router.post("/gap", response_model=SkillGapResponse)
def analyze_skill_gap(request: SkillGapRequest):
    try:
        gap = skill_matcher.analyze_gap(
            student_skills=request.student_skills,
            required_skills=request.required_skills,
            target_role=request.target_role
        )
        return SkillGapResponse(**gap)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Skill gap analysis error: {str(e)}")
