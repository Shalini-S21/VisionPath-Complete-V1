"""
Skill Gap Analysis and Matching Module for VisionPath.
Provides deterministic, explainable mathematical skill gap calculations.
"""

from typing import Any, Dict, List, Optional, Set
from nlp.skill_normalizer import SkillNormalizer, normalizer


class SkillMatcher:
    """Computes algorithmic skill gap, matched skills, missing skills, and match percentage."""

    def __init__(self, skill_normalizer: Optional[SkillNormalizer] = None):
        self.normalizer = skill_normalizer or normalizer

    def analyze_gap(
        self,
        student_skills: List[str],
        required_skills: List[str],
        target_role: Optional[str] = None
    ) -> Dict[str, Any]:
        norm_student = self.normalizer.normalize_list(student_skills or [])
        norm_required = self.normalizer.normalize_list(required_skills or [])

        student_set: Set[str] = {s.lower() for s in norm_student}
        
        matched: List[str] = []
        missing: List[str] = []

        for req in norm_required:
            if req.lower() in student_set:
                matched.append(req)
            else:
                missing.append(req)

        total_req = len(norm_required)
        if total_req > 0:
            match_percentage = round((len(matched) / total_req) * 100.0, 1)
        else:
            match_percentage = 100.0 if len(norm_student) > 0 else 0.0

        if match_percentage >= 80.0:
            readiness_level = "High Readiness (Ready for Interviews / Capstone)"
        elif match_percentage >= 50.0:
            readiness_level = "Moderate Readiness (Needs targeted module completion)"
        else:
            readiness_level = "Foundational Stage (Beginner path recommended)"

        return {
            "target_role": target_role or "Target Career Track",
            "student_skills": norm_student,
            "required_skills": norm_required,
            "matched_skills": matched,
            "missing_skills": missing,
            "match_percentage": match_percentage,
            "total_required_count": total_req,
            "matched_count": len(matched),
            "missing_count": len(missing),
            "readiness_level": readiness_level,
            "is_fully_qualified": len(missing) == 0 and total_req > 0
        }


# Global skill matcher instance
skill_matcher = SkillMatcher()
