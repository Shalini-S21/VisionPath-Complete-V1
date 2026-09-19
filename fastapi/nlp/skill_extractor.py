"""
NLP Skill Extraction Module for VisionPath.
Performs real token-based and n-gram vocabulary matching to extract technical and soft skills.
"""

import re
from typing import Dict, List, Set, Tuple
from nlp.skill_normalizer import SkillNormalizer, CANONICAL_SKILL_MAP

TECHNICAL_SKILL_VOCABULARY: Set[str] = {
    "java", "python", "javascript", "typescript", "c++", "c#", "go", "ruby", "php", "rust",
    "kotlin", "swift", "dart", "scala", "r", "html5", "css3", "sass", "sql", "nosql",
    "spring boot", "spring framework", "spring security", "react", "react native", "vue.js",
    "angular", "next.js", "svelte", "redux", "redux toolkit", "tailwind css", "bootstrap",
    "express.js", "node.js", "nestjs", "django", "flask", "fastapi", ".net", ".net core",
    "postgresql", "mysql", "mongodb", "redis", "cassandra", "oracle db", "sqlite", "dynamodb",
    "elasticsearch", "artificial intelligence", "machine learning", "deep learning",
    "natural language processing", "computer vision", "generative ai", "large language models",
    "pandas", "numpy", "scikit-learn", "tensorflow", "pytorch", "keras", "matplotlib", "seaborn",
    "opencv", "spacy", "nltk", "langchain", "hugging face", "rag", "data science", "data analytics",
    "power bi", "tableau", "statistics", "aws", "microsoft azure", "google cloud platform",
    "docker", "kubernetes", "ci/cd", "jenkins", "github actions", "git", "terraform", "linux",
    "unix", "bash/shell", "apache kafka", "rabbitmq", "data structures & algorithms",
    "object-oriented programming", "system design", "microservices", "rest apis", "graphql",
    "grpc", "agile methodology", "scrum", "unit testing", "junit", "pytest", "cybersecurity",
    "ethical hacking", "computer networks", "figma", "ui/ux design"
}

SOFT_SKILL_VOCABULARY: Set[str] = {
    "communication", "verbal communication", "written communication", "presentation skills",
    "leadership", "team leadership", "mentorship", "problem solving", "analytical thinking",
    "critical thinking", "creative thinking", "time management", "project management",
    "team collaboration", "teamwork", "adaptability", "flexibility", "conflict resolution",
    "decision making", "emotional intelligence", "work ethic", "attention to detail",
    "cross-functional coordination", "active listening", "strategic planning", "empathy"
}


class SkillExtractor:
    """NLP-based skill extraction engine."""

    def __init__(self):
        self.normalizer = SkillNormalizer()
        self.alias_map = CANONICAL_SKILL_MAP

    def _clean_text(self, text: str) -> str:
        """Standardize whitespace and remove sentence punctuation delimiters."""
        if not text:
            return ""
        # Standardize whitespace
        text = re.sub(r"[\r\n\t]+", " ", text)
        # Protect specific symbols like C++, C#, .NET
        text = re.sub(r"[\.,;:|()\[\]{}!?/]", " ", text)
        # Restore dotted frameworks
        text = re.sub(r"\bnode\s+js\b", "node.js", text, flags=re.IGNORECASE)
        text = re.sub(r"\bvue\s+js\b", "vue.js", text, flags=re.IGNORECASE)
        text = re.sub(r"\bnext\s+js\b", "next.js", text, flags=re.IGNORECASE)
        text = re.sub(r"\breact\s+js\b", "react.js", text, flags=re.IGNORECASE)
        text = re.sub(r"\bdotnet\b", ".net", text, flags=re.IGNORECASE)
        return " " + re.sub(r"\s+", " ", text).strip() + " "

    def extract_skills(self, text: str) -> Dict[str, List[str]]:
        """
        Extract technical and soft skills from input text using NLP token and phrase matching.
        """
        if not text or not text.strip():
            return {"technical": [], "soft": [], "all": []}

        cleaned = self._clean_text(text)
        lower_cleaned = cleaned.lower()

        extracted_tech: Set[str] = set()
        extracted_soft: Set[str] = set()

        for alias, canonical in self.alias_map.items():
            escaped = re.escape(alias)
            # Match on word boundary or whitespace boundary
            pattern = rf"(?<![\w\+\#\-]){escaped}(?![\w\+\#\-])"
            if re.search(pattern, lower_cleaned):
                norm = self.normalizer.normalize(canonical)
                if norm.lower() in SOFT_SKILL_VOCABULARY:
                    extracted_soft.add(norm)
                else:
                    extracted_tech.add(norm)

        for soft_phrase in SOFT_SKILL_VOCABULARY:
            escaped = re.escape(soft_phrase)
            pattern = rf"(?<![\w]){escaped}(?![\w])"
            if re.search(pattern, lower_cleaned):
                norm = self.normalizer.normalize(soft_phrase)
                extracted_soft.add(norm)

        tech_list = sorted(list(extracted_tech))
        soft_list = sorted(list(extracted_soft))
        all_skills = sorted(list(extracted_tech.union(extracted_soft)))

        return {
            "technical": tech_list,
            "soft": soft_list,
            "all": all_skills
        }


# Global instance
skill_extractor = SkillExtractor()
