"""
Question Generation and Validation Endpoints for VisionPath.
"""

from fastapi import APIRouter, HTTPException
from schemas.schemas import (
    QuestionGenerateRequest, QuestionGenerateResponse,
    QuestionValidateRequest, QuestionValidateResponse, QuestionItem
)
from llm.question_generator import question_generator
from nlp.question_validator import question_validator

router = APIRouter(prefix="/ai/questions", tags=["Questions"])


@router.post("/generate", response_model=QuestionGenerateResponse)
def generate_questions(request: QuestionGenerateRequest):
    try:
        result = question_generator.generate_questions(
            topic=request.topic,
            subject=request.subject,
            difficulty=request.difficulty or "Medium",
            count=request.count or 5,
            context=request.context
        )
        q_items = [QuestionItem(**q) for q in result["questions"]]
        return QuestionGenerateResponse(
            topic=result["topic"],
            difficulty=result["difficulty"],
            requested_count=result["requested_count"],
            generated_count=result["generated_count"],
            questions=q_items,
            validation=result["validation"],
            source=result["source"]
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Question generation error: {str(e)}")


@router.post("/validate", response_model=QuestionValidateResponse)
def validate_questions(request: QuestionValidateRequest):
    try:
        res = question_validator.validate_question_batch(
            questions=request.questions,
            expected_count=request.expected_count,
            topic=request.topic
        )
        return QuestionValidateResponse(**res)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Question validation error: {str(e)}")
