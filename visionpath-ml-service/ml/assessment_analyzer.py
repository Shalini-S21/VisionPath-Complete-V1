"""
Algorithmic Assessment Analyzer Module for VisionPath.
Performs deterministic proficiency estimation, performance categorization,
weakness identification, and mastery level calculation from assessment submissions.
"""

from typing import Any, Dict, List, Optional


class AssessmentAnalyzer:
    """Evaluates student assessment outcomes and determines proficiency categories."""

    def evaluate_results(
        self,
        total_questions: int,
        correct_count: int,
        incorrect_count: int,
        unanswered_count: int = 0,
        category: Optional[str] = None,
        duration_minutes: Optional[int] = None
    ) -> Dict[str, Any]:
        """
        Compute proficiency levels, grades, and diagnostic analysis.
        """
        effective_total = max(1, total_questions)
        percentage = round((correct_count / effective_total) * 100.0, 1)

        # Performance categorization & grade
        if percentage >= 90.0:
            grade = "A"
            proficiency = "Advanced / Mastery"
            performance_tier = "Exemplary Performance"
            feedback = "You demonstrated comprehensive mastery of core concepts with high accuracy."
        elif percentage >= 75.0:
            grade = "B"
            proficiency = "Proficient / Intermediate"
            performance_tier = "Solid Competency"
            feedback = "Strong conceptual foundation. Minor revision on nuanced topics will bridge the gap to top mastery."
        elif percentage >= 60.0:
            grade = "C"
            proficiency = "Competent / Foundational"
            performance_tier = "Moderate Competency"
            feedback = "Good baseline understanding. Focus on reviewing incorrect answers and practicing targeted questions."
        elif percentage >= 40.0:
            grade = "D"
            proficiency = "Developing / Beginner"
            performance_tier = "Needs Systematic Review"
            feedback = "Foundational concepts require strengthening before advancing to higher complexity topics."
        else:
            grade = "F"
            proficiency = "Novice / Remedial"
            performance_tier = "Immediate Remediation Recommended"
            feedback = "Significant gaps in core concepts. Follow the recommended remedial learning path."

        # Accuracy Ratio (excluding unanswered)
        attempted = correct_count + incorrect_count
        accuracy = round((correct_count / attempted * 100.0), 1) if attempted > 0 else 0.0

        return {
            "category": category or "General Assessment",
            "total_questions": total_questions,
            "correct_count": correct_count,
            "incorrect_count": incorrect_count,
            "unanswered_count": unanswered_count,
            "attempted_count": attempted,
            "percentage": percentage,
            "accuracy_percentage": accuracy,
            "grade": grade,
            "proficiency_level": proficiency,
            "performance_tier": performance_tier,
            "feedback": feedback,
            "recommended_focus": [
                f"Strengthen weak question areas identified in {category or 'the domain'}",
                "Review detailed answer explanations for all incorrect submissions",
                "Practice high-frequency domain mock tests"
            ]
        }


# Global assessment analyzer instance
assessment_analyzer = AssessmentAnalyzer()
