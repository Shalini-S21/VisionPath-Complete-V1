"""
Lightweight Content-Based Career Recommender Module for VisionPath.
Provides explainable multi-factor career compatibility ranking based on skills,
aptitude assessment scores, academic level, and student preferences.
"""

from typing import Any, Dict, List, Optional
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
from nlp.skill_normalizer import normalizer
from ml.skill_matcher import skill_matcher

DEFAULT_CAREER_CATALOG = [
    {
        "id": 1,
        "title": "Java Developer",
        "category": "Technology",
        "required_skills": ["Java", "Spring Boot", "SQL", "REST APIs", "Microservices", "Git"],
        "education": "B.Tech/B.E. in CS or IT",
        "average_salary": "₹6L - ₹20L per year",
        "demand_level": "High",
        "description": "Design and develop Java-based enterprise applications."
    },
    {
        "id": 2,
        "title": "Python Developer",
        "category": "Technology",
        "required_skills": ["Python", "Django", "Flask", "Machine Learning", "SQL", "Git"],
        "education": "B.Tech/B.E. in CS or IT",
        "average_salary": "₹5L - ₹18L per year",
        "demand_level": "High",
        "description": "Build automation scripts, web applications, and data pipelines."
    },
    {
        "id": 3,
        "title": "Data Scientist",
        "category": "Data & AI",
        "required_skills": ["Python", "Machine Learning", "Statistics", "SQL", "TensorFlow", "Pandas", "NumPy"],
        "education": "B.Tech + M.Tech or MBA Analytics",
        "average_salary": "₹8L - ₹25L per year",
        "demand_level": "High",
        "description": "Analyze large datasets, discover statistical insights, and build predictive ML models."
    },
    {
        "id": 4,
        "title": "Full-Stack AI Application Engineer",
        "category": "Technology",
        "required_skills": ["Java", "Spring Boot", "React", "Python", "Machine Learning", "PostgreSQL", "Docker", "REST APIs"],
        "education": "B.Tech in CS/IT or AI",
        "average_salary": "₹7L - ₹24L per year",
        "demand_level": "High",
        "description": "Develop full-stack web applications integrated with GenAI and ML capabilities."
    },
    {
        "id": 5,
        "title": "Cybersecurity Analyst",
        "category": "Security",
        "required_skills": ["Computer Networks", "Ethical Hacking", "Python", "Linux", "Cybersecurity"],
        "education": "B.Tech in CS or Cybersecurity Certification",
        "average_salary": "₹6L - ₹22L per year",
        "demand_level": "High",
        "description": "Protect critical infrastructure and networks from cyber threats."
    },
    {
        "id": 6,
        "title": "Cloud & DevOps Engineer",
        "category": "Cloud",
        "required_skills": ["AWS", "Microsoft Azure", "Docker", "Kubernetes", "Terraform", "CI/CD", "Linux"],
        "education": "B.Tech + Cloud Certifications (AWS/Azure)",
        "average_salary": "₹8L - ₹28L per year",
        "demand_level": "High",
        "description": "Design and manage resilient cloud infrastructure and CI/CD pipelines."
    },
    {
        "id": 7,
        "title": "Frontend Developer",
        "category": "Technology",
        "required_skills": ["React", "JavaScript", "TypeScript", "HTML5", "CSS3", "Redux", "Tailwind CSS"],
        "education": "B.Tech or any degree with frontend web skills",
        "average_salary": "₹4L - ₹16L per year",
        "demand_level": "High",
        "description": "Build high-performance, accessible, and responsive user interfaces."
    },
    {
        "id": 8,
        "title": "Backend Developer",
        "category": "Technology",
        "required_skills": ["Node.js", "Java", "Spring Boot", "PostgreSQL", "MongoDB", "REST APIs", "Docker"],
        "education": "B.Tech/B.E. in CS or IT",
        "average_salary": "₹5L - ₹18L per year",
        "demand_level": "High",
        "description": "Design scalable server-side business logic, APIs, and database schemas."
    },
    {
        "id": 9,
        "title": "UI/UX Designer",
        "category": "Design",
        "required_skills": ["Figma", "UI/UX Design", "User Research", "Prototyping", "HTML5", "CSS3"],
        "education": "Design degree or technical certification",
        "average_salary": "₹4L - ₹15L per year",
        "demand_level": "Medium",
        "description": "Design intuitive, delightful digital experiences and wireframes."
    }
]


class CareerRecommender:
    """Explainable content-based career recommender using TF-IDF and weighted multi-factor compatibility."""

    def __init__(self, catalog: Optional[List[Dict[str, Any]]] = None):
        self.catalog = catalog or DEFAULT_CAREER_CATALOG
        self.matcher = skill_matcher

    def recommend(
        self,
        student_skills: List[str],
        assessment_score: Optional[float] = None,
        academic_level: Optional[str] = None,
        interests: Optional[str] = None,
        top_n: int = 5
    ) -> List[Dict[str, Any]]:
        norm_student_skills = normalizer.normalize_list(student_skills or [])
        student_skill_str = " ".join(norm_student_skills)
        interest_str = (interests or "").lower()

        results = []

        for career in self.catalog:
            career_skills = career.get("required_skills", [])
            gap_analysis = self.matcher.analyze_gap(norm_student_skills, career_skills, career["title"])
            skill_match_pct = gap_analysis["match_percentage"]

            corpus_career = " ".join(career_skills) + " " + career.get("description", "")
            try:
                tfidf = TfidfVectorizer(ngram_range=(1, 2))
                tfidf_matrix = tfidf.fit_transform([student_skill_str, corpus_career])
                tfidf_sim = float(cosine_similarity(tfidf_matrix[0:1], tfidf_matrix[1:2])[0][0]) * 100.0
            except Exception:
                tfidf_sim = skill_match_pct

            skill_factor = 0.6 * skill_match_pct + 0.4 * tfidf_sim

            if assessment_score is not None:
                assessment_factor = min(100.0, max(40.0, float(assessment_score)))
            else:
                assessment_factor = 75.0

            interest_factor = 50.0
            if interest_str:
                career_title_lower = career["title"].lower()
                category_lower = career.get("category", "").lower()
                if any(w in career_title_lower or w in category_lower for w in interest_str.split()):
                    interest_factor = 95.0
                elif any(s.lower() in interest_str for s in career_skills):
                    interest_factor = 85.0

            level_str = (academic_level or "College").lower()
            level_factor = 80.0
            if "school" in level_str and career["category"] == "Technology":
                level_factor = 70.0
            elif "college" in level_str or "b.tech" in level_str:
                level_factor = 90.0

            total_score = (
                0.50 * skill_factor +
                0.25 * assessment_factor +
                0.15 * interest_factor +
                0.10 * level_factor
            )
            compatibility_score = round(min(99.0, max(25.0, total_score)), 1)

            results.append({
                "career_id": career.get("id"),
                "title": career["title"],
                "category": career.get("category", "General"),
                "compatibility_score": compatibility_score,
                "skill_match_percentage": skill_match_pct,
                "matched_skills": gap_analysis["matched_skills"],
                "missing_skills": gap_analysis["missing_skills"],
                "average_salary": career.get("average_salary", "Market competitive"),
                "demand_level": career.get("demand_level", "High"),
                "description": career.get("description", ""),
                "explanation": (
                    f"Compatibility of {compatibility_score}% based on {len(gap_analysis['matched_skills'])} "
                    f"matched skills ({', '.join(gap_analysis['matched_skills']) if gap_analysis['matched_skills'] else 'None yet'}) "
                    f"and your current learning profile."
                )
            })

        results.sort(key=lambda x: x["compatibility_score"], reverse=True)
        return results[:top_n]


# Global recommender instance
career_recommender = CareerRecommender()
