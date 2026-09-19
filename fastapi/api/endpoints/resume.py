"""
Resume Analysis API Endpoints for VisionPath.
Accepts raw text or PDF multipart upload, runs full NLP extraction,
computes deterministic ATS scoring, and generates Gemini qualitative feedback.
"""

from typing import List, Optional
from fastapi import APIRouter, File, Form, HTTPException, UploadFile
from schemas.schemas import ResumeAnalyzeRequest, ResumeAnalyzeResponse
from nlp.resume_parser import resume_parser
from llm.resume_feedback import resume_feedback_generator

router = APIRouter(prefix="/ai/resume", tags=["Resume Analysis"])


@router.post("/analyze", response_model=ResumeAnalyzeResponse)
def analyze_resume_json(request: ResumeAnalyzeRequest):
    try:
        parsed = resume_parser.parse_resume(
            raw_text_or_bytes=request.text or "",
            target_role_skills=request.target_role_skills
        )
        feedback = resume_feedback_generator.generate_feedback(
            target_role=request.target_role or "Full Stack AI Engineer",
            extracted_skills=parsed["extracted_skills"]["all"],
            sections=parsed["sections"],
            ats_score=parsed["scoring"]["ats_score"]
        )
        return ResumeAnalyzeResponse(
            candidate_name=parsed["candidate_name"],
            contact_info=parsed["contact_info"],
            sections=parsed["sections"],
            extracted_skills=parsed["extracted_skills"],
            scoring=parsed["scoring"],
            qualitative_feedback=feedback["feedback"]
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Resume analysis error: {str(e)}")


@router.post("/upload", response_model=ResumeAnalyzeResponse)
async def upload_and_analyze_resume(
    file: UploadFile = File(...),
    target_role: Optional[str] = Form("Full Stack AI Engineer"),
    target_role_skills: Optional[str] = Form(None)
):
    try:
        content_bytes = await file.read()
        skills_list = [s.strip() for s in target_role_skills.split(",")] if target_role_skills else None

        parsed = resume_parser.parse_resume(
            raw_text_or_bytes=content_bytes,
            target_role_skills=skills_list
        )
        feedback = resume_feedback_generator.generate_feedback(
            target_role=target_role or "Full Stack AI Engineer",
            extracted_skills=parsed["extracted_skills"]["all"],
            sections=parsed["sections"],
            ats_score=parsed["scoring"]["ats_score"]
        )
        return ResumeAnalyzeResponse(
            candidate_name=parsed["candidate_name"],
            contact_info=parsed["contact_info"],
            sections=parsed["sections"],
            extracted_skills=parsed["extracted_skills"],
            scoring=parsed["scoring"],
            qualitative_feedback=feedback["feedback"]
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Resume upload error: {str(e)}")
