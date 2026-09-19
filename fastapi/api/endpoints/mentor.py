"""
AI Mentor API Endpoints for VisionPath.
"""

from fastapi import APIRouter, HTTPException
from schemas.schemas import MentorChatRequest, MentorChatResponse
from llm.mentor import ai_mentor

router = APIRouter(prefix="/ai/mentor", tags=["AI Mentor"])


@router.post("/chat", response_model=MentorChatResponse)
def mentor_chat(request: MentorChatRequest):
    try:
        res = ai_mentor.chat(
            message=request.message,
            student_context=request.student_context
        )
        return MentorChatResponse(**res)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Mentor chat error: {str(e)}")
