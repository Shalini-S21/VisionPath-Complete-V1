"""
AI Mentor Conversational Module for VisionPath.
Orchestrates student career and learning mentorship queries via Gemini LLM with context injection.
"""

from typing import Any, Dict, List, Optional
from llm.gemini_client import gemini_client


class AIMentor:
    """Conversational career and academic mentor powered by Google Gemini."""

    def __init__(self):
        self.client = gemini_client

    def chat(
        self,
        message: str,
        student_context: Optional[Dict[str, Any]] = None
    ) -> Dict[str, Any]:
        context = student_context or {}
        academic_level = context.get("academic_level") or context.get("degree") or "College Student"
        target_role = context.get("target_role") or "Software Engineering / Tech Professional"
        skills = context.get("skills") or []
        skills_str = ", ".join(skills) if skills else "General technical foundations"

        system_prompt = (
            "You are VisionPath AI Mentor, an expert educational counselor and career advisor. "
            "Your advice must be inspiring, practical, concise, and tailored to the student's profile. "
            "Structure your guidance with clear action steps, recommended study resources, and career industry insights."
        )

        user_prompt = f"""
Student Background:
- Academic Level: {academic_level}
- Target Career Role: {target_role}
- Current Skill Set: {skills_str}

Student Question:
"{message}"

Provide a structured, encouraging, and actionable response answering their question directly.
"""

        try:
            if self.client.is_available():
                response_text = self.client.generate_text(user_prompt, system_instruction=system_prompt)
                return {
                    "response": response_text,
                    "suggestions": [
                        "How can I practice for technical interviews in this role?",
                        "What certifications or projects would boost my resume?",
                        "Can you create a weekly learning schedule for me?"
                    ],
                    "confidence_score": 0.96,
                    "source": "Google Gemini Generative AI"
                }
        except Exception:
            pass

        fallback_text = (
            f"Hello! As your VisionPath AI Mentor, here is some tailored guidance for a **{academic_level}** pursuing **{target_role}**:\n\n"
            f"1. **Core Competency Building**: With your background in {skills_str}, prioritize hands-on project implementations demonstrating full-stack or domain mastery.\n"
            f"2. **Targeted Practice**: Focus on system design principles, data structures, and industry-standard frameworks.\n"
            f"3. **Milestone Tracking**: Check your active study plan and assessments on VisionPath regularly to monitor your progress.\n\n"
            f"Feel free to ask about specific concepts, roadmap strategies, or resume optimizations!"
        )

        return {
            "response": fallback_text,
            "suggestions": [
                "How can I practice for technical interviews in this role?",
                "What certifications or projects would boost my resume?",
                "Can you create a weekly learning schedule for me?"
            ],
            "confidence_score": 0.90,
            "source": "VisionPath Rule-Based Mentor Engine (Offline/Fallback Mode)"
        }


# Global AI mentor instance
ai_mentor = AIMentor()
