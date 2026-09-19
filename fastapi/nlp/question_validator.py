"""
NLP Question Validation Module for VisionPath.
Validates structure, content, option uniqueness, correct answer integrity,
and semantic uniqueness of LLM-generated questions.
"""

from typing import Any, Dict, List, Optional, Tuple
from nlp.duplicate_detector import duplicate_detector

VALID_DIFFICULTIES = {"easy", "medium", "hard", "beginner", "intermediate", "advanced"}


class QuestionValidator:
    """Rigorous NLP validation engine for multiple choice questions (MCQs)."""

    def __init__(self):
        self.detector = duplicate_detector

    def validate_single_question(self, q: Dict[str, Any], topic: Optional[str] = None) -> Tuple[bool, List[str], Dict[str, Any]]:
        errors = []
        normalized: Dict[str, Any] = {}

        q_text = str(q.get("question") or q.get("questionText") or q.get("text") or "").strip()
        if not q_text:
            errors.append("Question text is empty.")
        elif len(q_text) < 10:
            errors.append(f"Question text is too short ({len(q_text)} chars).")
        normalized["question"] = q_text

        raw_options = q.get("options")
        clean_options = []
        if isinstance(raw_options, list):
            clean_options = [str(opt).strip() for opt in raw_options if str(opt).strip()]
        elif isinstance(raw_options, dict):
            clean_options = [str(v).strip() for k, v in raw_options.items() if str(v).strip()]

        if len(clean_options) < 2:
            errors.append(f"MCQ must have at least 2 non-empty options (found {len(clean_options)}).")
        
        seen_opts = set()
        has_dup_opts = False
        for opt in clean_options:
            lower_opt = opt.lower()
            if lower_opt in seen_opts:
                has_dup_opts = True
                break
            seen_opts.add(lower_opt)
        if has_dup_opts:
            errors.append("MCQ contains duplicate options.")

        normalized["options"] = clean_options

        raw_ans = str(q.get("correct_answer") or q.get("correctAnswer") or q.get("answer") or "").strip()
        if not raw_ans:
            errors.append("Correct answer is missing.")
        else:
            matched_option = None
            if len(raw_ans) == 1 and raw_ans.upper() in ["A", "B", "C", "D"]:
                idx = ord(raw_ans.upper()) - ord("A")
                if idx < len(clean_options):
                    matched_option = clean_options[idx]
            elif raw_ans.isdigit():
                idx = int(raw_ans)
                if 0 <= idx < len(clean_options):
                    matched_option = clean_options[idx]
            else:
                for opt in clean_options:
                    if opt.lower() == raw_ans.lower():
                        matched_option = opt
                        break

            if matched_option:
                normalized["correct_answer"] = matched_option
            else:
                errors.append(f"Correct answer '{raw_ans}' does not match any of the provided options.")
                normalized["correct_answer"] = raw_ans

        normalized["explanation"] = str(q.get("explanation") or "Explanation provided upon submission.").strip()
        diff = str(q.get("difficulty") or "Medium").strip()
        normalized["difficulty"] = diff.capitalize() if diff.lower() in VALID_DIFFICULTIES else "Medium"
        q_topic = str(q.get("topic") or topic or "General").strip()
        normalized["topic"] = q_topic

        return len(errors) == 0, errors, normalized

    def validate_question_batch(
        self,
        questions: List[Dict[str, Any]],
        expected_count: Optional[int] = None,
        topic: Optional[str] = None
    ) -> Dict[str, Any]:
        valid_items = []
        validation_errors = []

        for idx, q in enumerate(questions):
            is_valid, errors, normalized = self.validate_single_question(q, topic)
            if is_valid:
                valid_items.append(normalized)
            else:
                validation_errors.append({"index": idx, "question": q.get("question", ""), "errors": errors})

        deduped_questions, duplicate_pairs = self.detector.filter_duplicates(valid_items)

        is_batch_valid = len(deduped_questions) > 0 and len(validation_errors) == 0
        if expected_count and len(deduped_questions) < expected_count:
            is_batch_valid = False
            validation_errors.append({
                "index": -1,
                "question": "Batch Check",
                "errors": [f"Expected {expected_count} questions, but only {len(deduped_questions)} valid unique questions were obtained."]
            })

        return {
            "is_valid": is_batch_valid,
            "total_received": len(questions),
            "valid_count": len(deduped_questions),
            "duplicates_removed": len(valid_items) - len(deduped_questions),
            "duplicate_details": duplicate_pairs,
            "validated_questions": deduped_questions,
            "errors": validation_errors
        }


# Global question validator instance
question_validator = QuestionValidator()
