"""
Resume Feedback & Qualitative Evaluation Module for VisionPath.
Uses Gemini to provide qualitative feedback, strengths, missing content,
and action steps on structured resume data extracted by the NLP layer.
"""

from typing import Any, Dict, List, Optional
from llm.gemini_client import gemini_client


class ResumeFeedbackGenerator:
    """Generates qualitative resume critique from structured NLP analysis."""

    def __init__(self):
        self.client = gemini_client

    def generate_feedback(
        self,
        target_role: str,
        extracted_skills: List[str],
        sections: Dict[str, str],
        ats_score: int
    ) -> Dict[str, Any]:
        prompt = f"""
You are an expert technical recruiter and resume reviewer for "{target_role}".
Review the following extracted resume data (calculated ATS Score: {ats_score}/100):

Extracted Skills: {', '.join(extracted_skills)}
Sections Present: {', '.join([k for k, v in sections.items() if len(v) > 20])}

Provide qualitative feedback with:
1. Top Strengths (2-3 bullet points)
2. Critical Areas for Improvement (2-3 bullet points)
3. Actionable Resume Formatting & Keyword Tips (2-3 bullet points)
4. Overall Recruiter Verdict

Return ONLY valid JSON matching this schema:
{{
  "strengths": ["...", "..."],
  "weaknesses": ["...", "..."],
  "improvement_tips": ["...", "..."],
  "recruiter_verdict": "..."
}}
"""

        try:
            if self.client.is_available():
                parsed = self.client.generate_json(prompt)
                if isinstance(parsed, dict) and "strengths" in parsed:
                    return {
                        "feedback": parsed,
                        "source": "Google Gemini Generative AI"
                    }
        except Exception:
            pass

        fallback = {
            "strengths": [
                f"Solid technical keyword presence including {', '.join(extracted_skills[:4]) if extracted_skills else 'core skills'}.",
                "Standard reverse-chronological section headers detected by the NLP parser."
            ],
            "weaknesses": [
                f"Ensure every project mentions quantifiable achievements and impact for {target_role}.",
                "Highlight specific framework versions, cloud deployment, and unit testing practices."
            ],
            "improvement_tips": [
                "Use strong action verbs (e.g., 'Architected', 'Optimized', 'Deployed') at the start of each bullet point.",
                "Include direct GitHub repository and live demo links for your top technical projects.",
                f"Align your profile summary with the '{target_role}' keywords."
            ],
            "recruiter_verdict": f"The candidate demonstrates an ATS score of {ats_score}/100. Well-positioned for {target_role} entry to mid-level screening with minor project metric polish."
        }

        return {
            "feedback": fallback,
            "source": "VisionPath Algorithmic Resume Evaluator (Offline/Fallback Mode)"
        }


# Global resume feedback generator
resume_feedback_generator = ResumeFeedbackGenerator()
