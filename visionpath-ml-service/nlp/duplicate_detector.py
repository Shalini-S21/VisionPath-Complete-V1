"""
Question Duplicate Detection Module for VisionPath.
Uses TF-IDF, Cosine Similarity, and Token-based Jaccard similarity
to detect semantically duplicate or substantially similar questions.
"""

import re
from typing import List, Tuple
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity


class DuplicateDetector:
    """Detects semantic and lexical duplicates in question lists."""

    def __init__(self, similarity_threshold: float = 0.70):
        self.threshold = similarity_threshold

    def _normalize_question_text(self, text: str) -> str:
        """Strip filler words, punctuation, and lowercase."""
        if not text:
            return ""
        # Lowercase
        t = text.lower()
        # Remove common question filler prefixes
        filler_patterns = [
            r"^(what is|what are|explain|describe|define|how does|which of the following is|which of these is|what does)\s+",
            r"^(in simple terms|briefly explain|can you tell|give an example of)\s+"
        ]
        for pat in filler_patterns:
            t = re.sub(pat, "", t)
        # Strip punctuation
        t = re.sub(r"[^\w\s]", " ", t)
        return re.sub(r"\s+", " ", t).strip()

    def compute_similarity(self, q1: str, q2: str) -> float:
        """Compute cosine similarity using character n-grams and TF-IDF."""
        n1 = self._normalize_question_text(q1)
        n2 = self._normalize_question_text(q2)

        if not n1 or not n2:
            return 0.0

        if n1 == n2:
            return 1.0

        # Token Jaccard similarity
        tokens1 = set(n1.split())
        tokens2 = set(n2.split())
        if not tokens1 or not tokens2:
            return 0.0
        jaccard = len(tokens1.intersection(tokens2)) / len(tokens1.union(tokens2))

        # TF-IDF Cosine Similarity with word and char ngrams
        try:
            vectorizer = TfidfVectorizer(ngram_range=(1, 2), analyzer="word")
            tfidf_matrix = vectorizer.fit_transform([n1, n2])
            cos_sim = float(cosine_similarity(tfidf_matrix[0:1], tfidf_matrix[1:2])[0][0])
        except Exception:
            cos_sim = jaccard

        # Weighted combination of Cosine and Jaccard similarity
        combined = 0.65 * cos_sim + 0.35 * jaccard
        return round(combined, 3)

    def filter_duplicates(self, questions: List[dict]) -> Tuple[List[dict], List[Tuple[str, str, float]]]:
        """
        Filter out duplicate questions from a list of generated questions.
        
        Returns:
            Tuple of (unique_questions, list_of_detected_duplicate_pairs)
        """
        if not questions:
            return [], []

        unique_questions = []
        duplicates_found = []

        for current_q in questions:
            q_text = current_q.get("question") or current_q.get("questionText") or current_q.get("text", "")
            is_dup = False
            for existing_q in unique_questions:
                existing_text = existing_q.get("question") or existing_q.get("questionText") or existing_q.get("text", "")
                sim = self.compute_similarity(q_text, existing_text)
                if sim >= self.threshold:
                    is_dup = True
                    duplicates_found.append((q_text, existing_text, sim))
                    break
            
            if not is_dup:
                unique_questions.append(current_q)

        return unique_questions, duplicates_found


# Global duplicate detector instance
duplicate_detector = DuplicateDetector()
