"""
Automated Test Suite for VisionPath NLP, ML, and Gemini Modules.
Tests:
1. Skill Normalization (e.g. JS -> JavaScript, ReactJS -> React, etc.)
2. NLP Skill Extraction on raw resume text
3. Algorithmic Skill Gap Analysis (matched, missing, match %)
4. Content-Based Career Recommendation Ranking
5. Question Generation, NLP Validation & Duplicate Detection
6. PDF / Text Resume Parsing & Deterministic ATS Scoring
7. Algorithmic Assessment Proficiency Analysis
"""

import sys
import os

# Set sys.path to fastapi directory
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

from nlp.skill_normalizer import SkillNormalizer
from nlp.skill_extractor import SkillExtractor
from nlp.resume_parser import ResumeParser
from nlp.duplicate_detector import DuplicateDetector
from nlp.question_validator import QuestionValidator
from ml.skill_matcher import SkillMatcher
from ml.career_recommender import CareerRecommender
from ml.assessment_analyzer import AssessmentAnalyzer


def test_skill_normalization():
    print("\n--- [TEST 1] Skill Normalization ---")
    normalizer = SkillNormalizer()
    tests = [
        ("js", "JavaScript"),
        ("ReactJS", "React"),
        ("react.js", "React"),
        ("postgres", "PostgreSQL"),
        ("postgresql", "PostgreSQL"),
        ("ML", "Machine Learning"),
        ("AI", "Artificial Intelligence"),
        ("aws ec2", "AWS"),
        ("k8s", "Kubernetes"),
        ("spring boot", "Spring Boot"),
    ]
    for raw, expected in tests:
        res = normalizer.normalize(raw)
        assert res == expected, f"Failed normalization: expected '{expected}', got '{res}'"
        print(f"  [PASS] '{raw}' -> '{res}'")
    print("Skill normalization passed all checks.")


def test_nlp_skill_extraction():
    print("\n--- [TEST 2] NLP Skill Extraction ---")
    extractor = SkillExtractor()
    sample_text = (
        "Developed enterprise web applications using Java, Spring Boot, React and PostgreSQL. "
        "Built machine learning data pipelines with Python and Pandas. Good team collaboration and problem solving."
    )
    skills = extractor.extract_skills(sample_text)
    print(f"  Extracted Technical: {skills['technical']}")
    print(f"  Extracted Soft: {skills['soft']}")
    
    assert "Java" in skills["technical"], "Java not extracted"
    assert "Spring Boot" in skills["technical"], "Spring Boot not extracted"
    assert "React" in skills["technical"], "React not extracted"
    assert "PostgreSQL" in skills["technical"], "PostgreSQL not extracted"
    assert "Python" in skills["technical"], "Python not extracted"
    assert any("problem solving" in s.lower() for s in skills["soft"]), "Problem solving not extracted"
    print("NLP skill extraction passed all checks.")


def test_skill_gap_analysis():
    print("\n--- [TEST 3] Algorithmic Skill-Gap Analysis ---")
    matcher = SkillMatcher()
    student_skills = ["Python", "SQL", "React"]
    career_requirements = ["Python", "SQL", "Machine Learning", "Pandas", "NumPy"]
    
    gap = matcher.analyze_gap(student_skills, career_requirements, "Data Scientist")
    print(f"  Target: {gap['target_role']}")
    print(f"  Matched: {gap['matched_skills']}")
    print(f"  Missing: {gap['missing_skills']}")
    print(f"  Match Percentage: {gap['match_percentage']}%")
    
    assert gap["matched_skills"] == ["Python", "SQL"], f"Unexpected matched: {gap['matched_skills']}"
    assert set(gap["missing_skills"]) == {"Machine Learning", "Pandas", "NumPy"}, f"Unexpected missing: {gap['missing_skills']}"
    assert gap["match_percentage"] == 40.0, f"Expected 40.0%, got {gap['match_percentage']}%"
    print("Skill gap analysis passed all checks.")


def test_career_recommendation():
    print("\n--- [TEST 4] Content-Based Career Recommendation Ranking ---")
    recommender = CareerRecommender()
    student_skills = ["Java", "Spring Boot", "React", "PostgreSQL", "SQL"]
    recommendations = recommender.recommend(
        student_skills=student_skills,
        assessment_score=90.0,
        academic_level="College Undergrad",
        interests="Full Stack Web Development",
        top_n=3
    )
    for idx, c in enumerate(recommendations, 1):
        print(f"  Rank #{idx}: {c['title']} | Score: {c['compatibility_score']}% | Matched: {c['matched_skills']}")
    
    assert len(recommendations) == 3, "Expected 3 recommendations"
    assert recommendations[0]["compatibility_score"] >= recommendations[1]["compatibility_score"], "Not sorted descending"
    print("Career recommendation passed all checks.")


def test_question_validation_and_duplicate_detection():
    print("\n--- [TEST 5] Question Validation & Duplicate Detection ---")
    validator = QuestionValidator()
    detector = DuplicateDetector(similarity_threshold=0.70)
    
    sim = detector.compute_similarity(
        "What is inheritance in Java?",
        "Explain inheritance in Java."
    )
    print(f"  Similarity between 'What is inheritance in Java?' and 'Explain inheritance in Java.': {sim}")
    assert sim >= 0.70, f"Expected similarity >= 0.70, got {sim}"

    test_questions = [
        {
            "question": "Which language is primarily used with Spring Boot?",
            "options": ["Java", "Python", "C", "PHP"],
            "correct_answer": "Java",
            "explanation": "Java is the primary language for Spring Boot.",
            "difficulty": "Easy",
            "topic": "Spring Boot"
        },
        {
            "question": "Explain which language is primarily used with Spring Boot?",
            "options": ["Java", "Python", "C", "PHP"],
            "correct_answer": "Java",
            "explanation": "Java is the primary language for Spring Boot.",
            "difficulty": "Easy",
            "topic": "Spring Boot"
        },
        {
            "question": "What is the primary function of an Operating System?",
            "options": ["Hardware management", "Browsing", "Photo editing", "Power supply"],
            "correct_answer": "Hardware management",
            "explanation": "OS manages hardware and software resources.",
            "difficulty": "Easy",
            "topic": "OS"
        }
    ]
    batch_res = validator.validate_question_batch(test_questions, expected_count=2, topic="Tech")
    print(f"  Received: {batch_res['total_received']}, Valid: {batch_res['valid_count']}, Duplicates Removed: {batch_res['duplicates_removed']}")
    assert batch_res["duplicates_removed"] >= 1, "Duplicate was not filtered"
    print("Question validation and duplicate detection passed all checks.")


def test_resume_parser_and_deterministic_ats():
    print("\n--- [TEST 6] Resume Parser & Deterministic ATS Scoring ---")
    parser = ResumeParser()
    sample_resume = """
    John Doe
    Email: john.doe@email.com | Phone: (555) 123-4567 | LinkedIn: linkedin.com/in/johndoe
    
    Education:
    Bachelor of Technology in Computer Science, 2024
    
    Skills:
    Java, Spring Boot, React, PostgreSQL, Docker, Git, REST APIs, Microservices
    
    Experience:
    Software Engineering Intern at Tech Corp (2023 - 2024)
    Developed REST APIs using Spring Boot and connected React frontend.
    
    Projects:
    VisionPath Career Guidance Platform
    Full-stack AI powered platform with PostgreSQL database.
    """
    target_role_skills = ["Java", "Spring Boot", "React", "PostgreSQL", "Docker", "AWS"]
    parsed = parser.parse_resume(sample_resume, target_role_skills)
    
    print(f"  Candidate Name: {parsed['candidate_name']}")
    print(f"  Contact Info: {parsed['contact_info']}")
    print(f"  Extracted Skills: {parsed['extracted_skills']['all']}")
    print(f"  Deterministic ATS Score: {parsed['scoring']['ats_score']}/100")
    print(f"  Matched Skills: {parsed['scoring']['matched_required_skills']}")
    print(f"  Missing Skills: {parsed['scoring']['missing_required_skills']}")
    
    assert parsed["candidate_name"] == "John Doe", "Candidate name mismatch"
    assert parsed["contact_info"]["email"] == "john.doe@email.com", "Email mismatch"
    assert "Java" in parsed["extracted_skills"]["all"], "Java missing from extracted skills"
    assert parsed["scoring"]["ats_score"] >= 75, "ATS score unexpectedly low"
    assert "AWS" in parsed["scoring"]["missing_required_skills"], "AWS should be marked missing"
    print("Resume parser and deterministic ATS scoring passed all checks.")


def test_assessment_analyzer():
    print("\n--- [TEST 7] Assessment Analyzer ---")
    analyzer = AssessmentAnalyzer()
    res = analyzer.evaluate_results(
        total_questions=10,
        correct_count=9,
        incorrect_count=1,
        unanswered_count=0,
        category="General Aptitude & Reasoning"
    )
    print(f"  Score: {res['percentage']}% | Grade: {res['grade']} | Tier: {res['proficiency_level']}")
    assert res["percentage"] == 90.0, f"Expected 90%, got {res['percentage']}%"
    assert res["grade"] == "A", f"Expected Grade A, got {res['grade']}"
    print("Assessment analyzer passed all checks.")


if __name__ == "__main__":
    print("==================================================")
    print("  RUNNING VISIONPATH NLP, ML & LLM TEST SUITE     ")
    print("==================================================")
    test_skill_normalization()
    test_nlp_skill_extraction()
    test_skill_gap_analysis()
    test_career_recommendation()
    test_question_validation_and_duplicate_detection()
    test_resume_parser_and_deterministic_ats()
    test_assessment_analyzer()
    print("\n==================================================")
    print("  ALL VISIONPATH NLP & ML TESTS PASSED (7/7)     ")
    print("==================================================")
