"""
Personalized Study Roadmap Generation Module for VisionPath.
Generates structured multi-week learning phases, weekly tasks, and milestones
based on actual skill gap analysis and student profile data.
"""

from typing import Any, Dict, List, Optional
from llm.gemini_client import gemini_client
from nlp.skill_normalizer import normalizer


class RoadmapGenerator:
    """Generates personalized study roadmaps and milestone schedules."""

    def __init__(self):
        self.client = gemini_client

    def generate_roadmap(
        self,
        target_role: str,
        current_skills: List[str],
        missing_skills: List[str],
        academic_level: Optional[str] = "College Student",
        duration_weeks: int = 4
    ) -> Dict[str, Any]:
        norm_current = normalizer.normalize_list(current_skills or [])
        norm_missing = normalizer.normalize_list(missing_skills or [])
        
        prompt = f"""
You are an expert curriculum architect. Create a structured {duration_weeks}-week study roadmap.
Target Role: {target_role}
Student Academic Level: {academic_level}
Verified Student Skills: {', '.join(norm_current) if norm_current else 'Foundational'}
Missing Skills to Master: {', '.join(norm_missing) if norm_missing else 'Advanced ' + target_role + ' Architecture'}

Return ONLY a valid JSON object matching this schema:
{{
  "goal": "{target_role} Readiness",
  "durationWeeks": {duration_weeks},
  "weeklyPlans": [
    {{
      "week": 1,
      "focus": "Core Language & Foundational Architecture",
      "tasks": [
        {{ "title": "Specific actionable study task", "estimatedMinutes": 120, "priority": "HIGH" }},
        {{ "title": "Build a hands-on coding component", "estimatedMinutes": 90, "priority": "MEDIUM" }}
      ],
      "milestone": "Measurable goal achieved by end of week"
    }}
  ],
  "recommendedCertifications": ["Cert 1", "Cert 2"],
  "capstoneProject": {{
    "title": "Project Name",
    "description": "Brief description integrating the target role skills"
  }}
}}
"""

        try:
            if self.client.is_available():
                parsed = self.client.generate_json(prompt)
                if isinstance(parsed, dict) and "weeklyPlans" in parsed:
                    return {
                        "status": "success",
                        "roadmap": parsed,
                        "source": "Google Gemini Generative AI"
                    }
        except Exception:
            pass

        weekly_plans = []
        missing_chunks = [norm_missing[i:i + 2] for i in range(0, max(1, len(norm_missing)), 2)]
        
        for w in range(1, duration_weeks + 1):
            chunk = missing_chunks[(w - 1) % len(missing_chunks)] if missing_chunks else [target_role]
            skills_focus = ", ".join(chunk) if chunk else "Core Architecture"
            weekly_plans.append({
                "week": w,
                "focus": f"Week {w}: Mastery of {skills_focus}",
                "tasks": [
                    {"title": f"Study deep concepts and documentation for {skills_focus}", "estimatedMinutes": 120, "priority": "HIGH"},
                    {"title": f"Complete hands-on implementation and test cases using {skills_focus}", "estimatedMinutes": 180, "priority": "HIGH"},
                    {"title": "Review code quality, architecture patterns, and push to GitHub", "estimatedMinutes": 90, "priority": "MEDIUM"}
                ],
                "milestone": f"Demonstrate working prototype integrating {skills_focus}"
            })

        fallback_roadmap = {
            "goal": f"{target_role} Accelerated Career Track",
            "durationWeeks": duration_weeks,
            "weeklyPlans": weekly_plans,
            "recommendedCertifications": [
                f"{target_role} Industry Specialist",
                "Cloud & DevOps Practitioner"
            ],
            "capstoneProject": {
                "title": f"Full-Scale {target_role} Portfolio Platform",
                "description": f"End-to-end production application demonstrating proficiency in {', '.join(norm_missing[:4]) if norm_missing else 'enterprise technologies'}."
            }
        }

        return {
            "status": "success",
            "roadmap": fallback_roadmap,
            "source": "VisionPath Algorithmic Study Plan Generator (Offline/Fallback Mode)"
        }


# Global roadmap generator instance
roadmap_generator = RoadmapGenerator()
