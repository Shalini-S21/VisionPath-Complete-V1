"""
Pydantic Schemas for VisionPath FastAPI Layer.
Maintains strict type checking and interoperability with Spring Boot DTOs and React frontend.
"""

from typing import Any, Dict, List, Optional
from pydantic import BaseModel, Field


# --- Skill Schemas ---
class SkillExtractRequest(BaseModel):
    text: str = Field(..., description="Raw text or resume string to extract skills from")


class SkillExtractResponse(BaseModel):
    technical: List[str]
    soft: List[str]
    all: List[str]
    total_count: int


class SkillGapRequest(BaseModel):
    student_skills: List[str] = Field(default_factory=list)
    required_skills: List[str] = Field(default_factory=list)
    target_role: Optional[str] = "Target Role"


class SkillGapResponse(BaseModel):
    target_role: str
    student_skills: List[str]
    required_skills: List[str]
    matched_skills: List[str]
    missing_skills: List[str]
    match_percentage: float
    total_required_count: int
    matched_count: int
    missing_count: int
    readiness_level: str
    is_fully_qualified: bool


# --- Career Recommendation Schemas ---
class CareerRecommendRequest(BaseModel):
    student_skills: List[str] = Field(default_factory=list)
    assessment_score: Optional[float] = None
    academic_level: Optional[str] = "College Undergrad"
    interests: Optional[str] = None
    top_n: Optional[int] = 5


class CareerItem(BaseModel):
    career_id: Optional[int] = None
    title: str
    category: str
    compatibility_score: float
    skill_match_percentage: float
    matched_skills: List[str]
    missing_skills: List[str]
    average_salary: str
    demand_level: str
    description: str
    explanation: str


class CareerRecommendResponse(BaseModel):
    recommendations: List[CareerItem]
    total_considered: int


# --- Question Generation & Validation Schemas ---
class QuestionItem(BaseModel):
    question: str
    options: List[str]
    correct_answer: str
    explanation: str
    difficulty: str
    topic: str


class QuestionGenerateRequest(BaseModel):
    topic: str
    subject: Optional[str] = None
    difficulty: Optional[str] = "Medium"
    count: Optional[int] = 5
    context: Optional[str] = None


class QuestionGenerateResponse(BaseModel):
    topic: str
    difficulty: str
    requested_count: int
    generated_count: int
    questions: List[QuestionItem]
    validation: Dict[str, Any]
    source: str


class QuestionValidateRequest(BaseModel):
    questions: List[Dict[str, Any]]
    expected_count: Optional[int] = None
    topic: Optional[str] = None


class QuestionValidateResponse(BaseModel):
    is_valid: bool
    total_received: int
    valid_count: int
    duplicates_removed: int
    duplicate_details: List[Any]
    validated_questions: List[Dict[str, Any]]
    errors: List[Dict[str, Any]]


# --- AI Mentor Schemas ---
class MentorChatRequest(BaseModel):
    message: str
    student_context: Optional[Dict[str, Any]] = None


class MentorChatResponse(BaseModel):
    response: str
    suggestions: List[str]
    confidence_score: float
    source: str


# --- Study Roadmap Schemas ---
class RoadmapGenerateRequest(BaseModel):
    target_role: str
    current_skills: List[str] = Field(default_factory=list)
    missing_skills: List[str] = Field(default_factory=list)
    academic_level: Optional[str] = "College Student"
    duration_weeks: Optional[int] = 4


class RoadmapGenerateResponse(BaseModel):
    status: str
    roadmap: Dict[str, Any]
    source: str


# --- Assessment Analysis Schemas ---
class AssessmentAnalyzeRequest(BaseModel):
    total_questions: int = 10
    correct_count: int = 0
    incorrect_count: int = 0
    unanswered_count: int = 0
    category: Optional[str] = "General"
    duration_minutes: Optional[int] = None


class AssessmentAnalyzeResponse(BaseModel):
    category: str
    total_questions: int
    correct_count: int
    incorrect_count: int
    unanswered_count: int
    attempted_count: int
    percentage: float
    accuracy_percentage: float
    grade: str
    proficiency_level: str
    performance_tier: str
    feedback: str
    recommended_focus: List[str]


# --- Resume Analysis Schemas ---
class ResumeAnalyzeRequest(BaseModel):
    text: Optional[str] = None
    target_role: Optional[str] = "Full Stack AI Engineer"
    target_role_skills: Optional[List[str]] = None


class ResumeAnalyzeResponse(BaseModel):
    candidate_name: Optional[str] = None
    contact_info: Dict[str, Optional[str]]
    sections: Dict[str, str]
    extracted_skills: Dict[str, List[str]]
    scoring: Dict[str, Any]
    qualitative_feedback: Dict[str, Any]


# --- Spring Boot Unified Bridge Schemas ---
class SpringAiBridgeRequest(BaseModel):
    studentId: Optional[int] = None
    prompt: Optional[str] = None
    category: Optional[str] = None
    academicLevel: Optional[str] = None
    targetRole: Optional[str] = None
    subjects: Optional[List[str]] = None
    branch: Optional[str] = None
    year: Optional[str] = None
    message: Optional[str] = None


class SpringAiBridgeResponse(BaseModel):
    resultText: str
    suggestions: List[str] = Field(default_factory=list)
    confidenceScore: float = 0.95
    metadata: Optional[Dict[str, Any]] = None
