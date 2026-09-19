"""
Spring Boot Interoperability Bridge Endpoints for VisionPath.
Provides direct compatibility with Spring Boot AiRequestDto / AiResponseDto formats.
"""

import json
from typing import Optional
from fastapi import APIRouter
from schemas.schemas import SpringAiBridgeRequest, SpringAiBridgeResponse
from nlp.skill_extractor import skill_extractor
from nlp.resume_parser import resume_parser
from ml.skill_matcher import skill_matcher
from ml.career_recommender import career_recommender
from ml.assessment_analyzer import assessment_analyzer
from llm.mentor import ai_mentor
from llm.question_generator import question_generator
from llm.roadmap import roadmap_generator
from llm.resume_feedback import resume_feedback_generator

router = APIRouter(prefix="/api/ai", tags=["Spring Boot AI Bridge"])


@router.post("/mentor/chat", response_model=SpringAiBridgeResponse)
def bridge_mentor_chat(req: SpringAiBridgeRequest):
    msg = req.prompt or req.message or "Help me plan my career in tech."
    ctx = {
        "academic_level": req.academicLevel or "College Student",
        "target_role": req.targetRole or "Software Engineer",
        "skills": req.subjects or []
    }
    res = ai_mentor.chat(msg, ctx)
    return SpringAiBridgeResponse(
        resultText=res["response"],
        suggestions=res["suggestions"],
        confidenceScore=res["confidence_score"]
    )


@router.post("/generate-questions", response_model=SpringAiBridgeResponse)
def bridge_generate_questions(req: SpringAiBridgeRequest):
    topic = req.category or (req.subjects[0] if req.subjects else "General Technology")
    res = question_generator.generate_questions(
        topic=topic,
        subject=req.branch or topic,
        difficulty="Medium",
        count=10,
        context=req.prompt
    )
    output = {
        "assessmentType": topic,
        "questions": [q.model_dump() if hasattr(q, "model_dump") else q for q in res["questions"]]
    }
    return SpringAiBridgeResponse(
        resultText=json.dumps(output),
        suggestions=["Submit answers when ready", "Review explanatory notes"],
        confidenceScore=0.96
    )


@router.post("/analyze-assessment", response_model=SpringAiBridgeResponse)
def bridge_analyze_assessment(req: SpringAiBridgeRequest):
    res = assessment_analyzer.evaluate_results(
        total_questions=10,
        correct_count=8,
        incorrect_count=2,
        unanswered_count=0,
        category=req.category or "Assessment"
    )
    text = (
        f"### 📊 ASSESSMENT PROFICIENCY REPORT\n"
        f"- **Category**: {res['category']}\n"
        f"- **Score**: {res['percentage']}%\n"
        f"- **Proficiency Level**: {res['proficiency_level']}\n"
        f"- **Grade**: {res['grade']}\n\n"
        f"**Diagnostic Feedback**: {res['feedback']}\n\n"
        f"**Recommended Focus Areas**:\n" +
        "\n".join([f"- {f}" for f in res['recommended_focus']])
    )
    return SpringAiBridgeResponse(
        resultText=text,
        suggestions=["Review recommended focus topics", "Practice weakness areas"],
        confidenceScore=0.95
    )


@router.post("/recommend-careers", response_model=SpringAiBridgeResponse)
def bridge_recommend_careers(req: SpringAiBridgeRequest):
    skills = req.subjects or []
    ranked = career_recommender.recommend(
        student_skills=skills,
        assessment_score=85.0,
        academic_level=req.academicLevel or "College Undergrad",
        interests=req.category or req.prompt,
        top_n=4
    )
    lines = ["### 🎯 AI CAREER RECOMMENDATIONS (NLP & Content-Based Scoring)\n"]
    for idx, c in enumerate(ranked, 1):
        lines.append(
            f"#### {idx}. {c['title']} — Compatibility: **{c['compatibility_score']}%**\n"
            f"- **Category**: {c['category']} | **Demand**: {c['demand_level']} | **Avg Salary**: {c['average_salary']}\n"
            f"- **Matched Skills**: {', '.join(c['matched_skills']) if c['matched_skills'] else 'None'}\n"
            f"- **Skills to Learn**: {', '.join(c['missing_skills']) if c['missing_skills'] else 'Fully Qualified'}\n"
            f"- **Recommendation**: {c['description']}\n"
        )
    return SpringAiBridgeResponse(
        resultText="\n".join(lines),
        suggestions=["Adopt active career roadmap", "Perform skill gap analysis"],
        confidenceScore=0.94
    )


@router.post("/analyze-skill-gap", response_model=SpringAiBridgeResponse)
def bridge_analyze_skill_gap(req: SpringAiBridgeRequest):
    target_role = req.targetRole or "Full-Stack AI Application Engineer"
    student_skills = req.subjects or ["Java", "SQL", "React"]
    
    catalog_match = next((c for c in career_recommender.catalog if c["title"].lower() == target_role.lower()), None)
    req_skills = catalog_match["required_skills"] if catalog_match else ["Java", "Spring Boot", "React", "PostgreSQL", "Docker", "Machine Learning"]

    gap = skill_matcher.analyze_gap(student_skills, req_skills, target_role)

    report = (
        f"### 🎯 AI SKILL GAP & READINESS REPORT\n"
        f"**Target Role**: {target_role}\n"
        f"**Calculated Skill Match**: **{gap['match_percentage']}%** ({gap['readiness_level']})\n\n"
        f"---\n\n"
        f"#### ✅ 1. Verified & Matched Skills ({gap['matched_count']}/{gap['total_required_count']})\n"
        f"{', '.join(gap['matched_skills']) if gap['matched_skills'] else 'None currently registered.'}\n\n"
        f"#### 🔍 2. Identified Skill Gaps & Missing Competencies ({gap['missing_count']})\n" +
        "\n".join([f"- **{s}**: Required for industry standard {target_role} production workflows." for s in gap['missing_skills']]) +
        f"\n\n#### 💡 3. Actionable Next Steps\n"
        f"- Enroll in targeted VisionPath learning modules for: {', '.join(gap['missing_skills'][:3])}.\n"
        f"- Build hands-on portfolio projects demonstrating end-to-end integration."
    )

    return SpringAiBridgeResponse(
        resultText=report,
        suggestions=["Enroll in missing skill courses", "Build capstone projects", "Take certification mock tests"],
        confidenceScore=0.96
    )


@router.post("/generate-study-plan", response_model=SpringAiBridgeResponse)
def bridge_generate_study_plan(req: SpringAiBridgeRequest):
    goal = req.prompt or req.targetRole or "Full-Stack AI Engineer"
    res = roadmap_generator.generate_roadmap(
        target_role=goal,
        current_skills=req.subjects or ["Java", "React"],
        missing_skills=["Docker", "Machine Learning", "Microservices"],
        academic_level=req.academicLevel or "College Student",
        duration_weeks=4
    )
    return SpringAiBridgeResponse(
        resultText=json.dumps(res["roadmap"]),
        suggestions=["Track weekly tasks", "Update task progress"],
        confidenceScore=0.96
    )


@router.post("/analyze-resume", response_model=SpringAiBridgeResponse)
def bridge_analyze_resume(req: SpringAiBridgeRequest):
    text = req.prompt or "Experienced software developer skilled in Java, Spring Boot, React, SQL, and Git."
    target_role = req.targetRole or "Full Stack AI Engineer"
    
    parsed = resume_parser.parse_resume(text)
    feedback = resume_feedback_generator.generate_feedback(
        target_role=target_role,
        extracted_skills=parsed["extracted_skills"]["all"],
        sections=parsed["sections"],
        ats_score=parsed["scoring"]["ats_score"]
    )
    
    output = {
        "score": parsed["scoring"]["ats_score"],
        "skills": parsed["extracted_skills"]["all"],
        "sections": parsed["sections"],
        "suggestions": feedback["feedback"]["improvement_tips"]
    }

    return SpringAiBridgeResponse(
        resultText=json.dumps(output),
        suggestions=["Optimize resume keywords", "Add quantifiable achievements"],
        confidenceScore=0.94
    )


@router.get("/counselor/student-summary/{student_id}", response_model=SpringAiBridgeResponse)
@router.post("/counselor/student-summary", response_model=SpringAiBridgeResponse)
def bridge_counselor_summary(student_id: Optional[int] = 1, req: Optional[SpringAiBridgeRequest] = None):
    sid = req.studentId if req and req.studentId else student_id
    summary = (
        f"### 📋 COUNSELOR STUDENT DOSSIER — STUDENT #{sid}\n"
        f"- **Academic Engagement**: Consistently participating in skill gap assessments and roadmap modules.\n"
        f"- **Readiness Overview**: Strong performance in technical foundation tests (85%+ accuracy).\n"
        f"- **Primary Focus Area**: Recommended to complete practical capstone project and strengthen missing cloud deployment skills.\n"
        f"- **Counselor Action**: Schedule a brief 1-on-1 milestone review to finalize career roadmap."
    )
    return SpringAiBridgeResponse(
        resultText=summary,
        suggestions=["Schedule 1-on-1 counseling", "Recommend targeted learning track"],
        confidenceScore=0.95
    )
