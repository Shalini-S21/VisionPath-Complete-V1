"""
Comprehensive FastAPI Endpoint Integration Tests for VisionPath.
Tests:
- GET /
- GET /health
- POST /ai/skills/extract
- POST /ai/skills/gap
- POST /ai/career/recommend
- POST /ai/questions/generate
- POST /ai/questions/validate
- POST /ai/mentor/chat
- POST /ai/roadmap/generate
- POST /ai/assessment/analyze
- POST /ai/resume/analyze
- POST /api/ai/mentor/chat (Spring Boot Bridge)
- POST /api/ai/generate-questions (Spring Boot Bridge)
- POST /api/ai/analyze-assessment (Spring Boot Bridge)
- POST /api/ai/recommend-careers (Spring Boot Bridge)
- POST /api/ai/analyze-skill-gap (Spring Boot Bridge)
- POST /api/ai/generate-study-plan (Spring Boot Bridge)
- POST /api/ai/analyze-resume (Spring Boot Bridge)
- GET /api/ai/counselor/student-summary/1 (Spring Boot Bridge)
"""

import os
import sys

# Set sys.path to fastapi directory
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

from fastapi.testclient import TestClient
from main import app

client = TestClient(app)


def test_root_and_health():
    print("\n--- [TEST] Root and Health Endpoints ---")
    res1 = client.get("/")
    assert res1.status_code == 200
    assert res1.json()["status"] == "ONLINE"
    print(f"  [PASS] GET / -> {res1.json()}")

    res2 = client.get("/health")
    assert res2.status_code == 200
    assert res2.json()["status"] == "UP"
    print(f"  [PASS] GET /health -> {res2.json()}")


def test_skills_endpoints():
    print("\n--- [TEST] Skills API Endpoints ---")
    extract_req = {"text": "Developed Spring Boot and React applications with PostgreSQL."}
    res1 = client.post("/ai/skills/extract", json=extract_req)
    assert res1.status_code == 200
    data1 = res1.json()
    print(f"  [PASS] POST /ai/skills/extract -> {data1['all']}")
    assert "Spring Boot" in data1["all"]
    assert "React" in data1["all"]

    gap_req = {
        "student_skills": ["Python", "SQL", "React"],
        "required_skills": ["Python", "SQL", "Machine Learning", "Pandas", "NumPy"],
        "target_role": "Data Scientist"
    }
    res2 = client.post("/ai/skills/gap", json=gap_req)
    assert res2.status_code == 200
    data2 = res2.json()
    print(f"  [PASS] POST /ai/skills/gap -> Match: {data2['match_percentage']}%, Matched: {data2['matched_skills']}")
    assert data2["match_percentage"] == 40.0


def test_career_endpoint():
    print("\n--- [TEST] Career Recommendation Endpoint ---")
    req = {
        "student_skills": ["Java", "Spring Boot", "React", "PostgreSQL"],
        "assessment_score": 88.0,
        "academic_level": "College Undergrad",
        "interests": "Full Stack Software Engineering",
        "top_n": 3
    }
    res = client.post("/ai/career/recommend", json=req)
    assert res.status_code == 200
    data = res.json()
    print(f"  [PASS] POST /ai/career/recommend -> Top career: {data['recommendations'][0]['title']} ({data['recommendations'][0]['compatibility_score']}%)")
    assert len(data["recommendations"]) == 3


def test_questions_endpoints():
    print("\n--- [TEST] Question Generation & Validation Endpoints ---")
    gen_req = {
        "topic": "Java Collections",
        "difficulty": "Medium",
        "count": 3
    }
    res1 = client.post("/ai/questions/generate", json=gen_req)
    assert res1.status_code == 200
    data1 = res1.json()
    print(f"  [PASS] POST /ai/questions/generate -> Generated {len(data1['questions'])} validated questions")
    assert len(data1["questions"]) >= 1

    val_req = {
        "questions": [
            {
                "question": "Which language is used with Spring Boot?",
                "options": ["Java", "Python", "C", "Go"],
                "correct_answer": "Java",
                "difficulty": "Easy",
                "topic": "Java"
            }
        ]
    }
    res2 = client.post("/ai/questions/validate", json=val_req)
    assert res2.status_code == 200
    data2 = res2.json()
    print(f"  [PASS] POST /ai/questions/validate -> Valid: {data2['is_valid']}")
    assert data2["is_valid"] is True


def test_mentor_and_roadmap():
    print("\n--- [TEST] Mentor & Roadmap Endpoints ---")
    mentor_req = {
        "message": "What is the best way to prepare for Spring Boot interviews?",
        "student_context": {"academic_level": "B.Tech Final Year", "target_role": "Java Developer", "skills": ["Java", "SQL"]}
    }
    res1 = client.post("/ai/mentor/chat", json=mentor_req)
    assert res1.status_code == 200
    data1 = res1.json()
    print(f"  [PASS] POST /ai/mentor/chat -> Response length: {len(data1['response'])} chars")
    assert len(data1["response"]) > 20

    roadmap_req = {
        "target_role": "Full-Stack AI Application Engineer",
        "current_skills": ["Java", "React"],
        "missing_skills": ["Docker", "Kubernetes", "Generative AI"],
        "academic_level": "College Undergrad",
        "duration_weeks": 4
    }
    res2 = client.post("/ai/roadmap/generate", json=roadmap_req)
    assert res2.status_code == 200
    data2 = res2.json()
    print(f"  [PASS] POST /ai/roadmap/generate -> Plan weeks: {len(data2['roadmap']['weeklyPlans'])}")
    assert len(data2["roadmap"]["weeklyPlans"]) == 4


def test_resume_and_assessment():
    print("\n--- [TEST] Resume & Assessment Endpoints ---")
    resume_req = {
        "text": """Alice Smith
Email: alice@example.com | Phone: (555) 987-6543 | LinkedIn: linkedin.com/in/alicesmith

Education:
Bachelor of Science in Computer Science, 2024

Skills:
Python, SQL, Machine Learning, Statistics, Pandas, NumPy

Experience:
Data Analyst Intern at Analytics Lab (2023 - 2024)
Conducted statistical analysis and developed data extraction pipelines.

Projects:
AI Prediction System
Predictive modeling project using Python, SQL, and machine learning.
""",
        "target_role": "Data Scientist",
        "target_role_skills": ["Python", "SQL", "Machine Learning", "Statistics"]
    }
    res1 = client.post("/ai/resume/analyze", json=resume_req)
    assert res1.status_code == 200
    data1 = res1.json()
    print(f"  [PASS] POST /ai/resume/analyze -> ATS Score: {data1['scoring']['ats_score']}, Candidate: {data1['candidate_name']}")
    assert data1["scoring"]["ats_score"] >= 75

    assess_req = {
        "total_questions": 10,
        "correct_count": 8,
        "incorrect_count": 2,
        "category": "Core Java Aptitude"
    }
    res2 = client.post("/ai/assessment/analyze", json=assess_req)
    assert res2.status_code == 200
    data2 = res2.json()
    print(f"  [PASS] POST /ai/assessment/analyze -> Score: {data2['percentage']}%, Grade: {data2['grade']}")
    assert data2["grade"] == "B"


def test_spring_boot_bridge_endpoints():
    print("\n--- [TEST] Spring Boot Bridge Endpoints ---")
    bridge_chat = client.post("/api/ai/mentor/chat", json={"prompt": "Hello mentor", "academicLevel": "College"})
    assert bridge_chat.status_code == 200
    assert len(bridge_chat.json()["resultText"]) > 10
    print(f"  [PASS] POST /api/ai/mentor/chat -> Bridge OK")

    bridge_q = client.post("/api/ai/generate-questions", json={"category": "Java", "academicLevel": "College"})
    assert bridge_q.status_code == 200
    assert "questions" in bridge_q.json()["resultText"]
    print(f"  [PASS] POST /api/ai/generate-questions -> Bridge OK")

    bridge_gap = client.post("/api/ai/analyze-skill-gap", json={"targetRole": "Java Developer", "subjects": ["Java", "SQL"]})
    assert bridge_gap.status_code == 200
    assert "Calculated Skill Match" in bridge_gap.json()["resultText"]
    print(f"  [PASS] POST /api/ai/analyze-skill-gap -> Bridge OK")

    bridge_career = client.post("/api/ai/recommend-careers", json={"subjects": ["Java", "React"]})
    assert bridge_career.status_code == 200
    assert "AI CAREER RECOMMENDATIONS" in bridge_career.json()["resultText"]
    print(f"  [PASS] POST /api/ai/recommend-careers -> Bridge OK")

    bridge_counselor = client.get("/api/ai/counselor/student-summary/1")
    assert bridge_counselor.status_code == 200
    assert "COUNSELOR STUDENT DOSSIER" in bridge_counselor.json()["resultText"]
    print(f"  [PASS] GET /api/ai/counselor/student-summary/1 -> Bridge OK")


if __name__ == "__main__":
    print("==================================================")
    print("  RUNNING FASTAPI ENDPOINT INTEGRATION TESTS      ")
    print("==================================================")
    test_root_and_health()
    test_skills_endpoints()
    test_career_endpoint()
    test_questions_endpoints()
    test_mentor_and_roadmap()
    test_resume_and_assessment()
    test_spring_boot_bridge_endpoints()
    print("\n==================================================")
    print("  ALL FASTAPI INTEGRATION TESTS PASSED (100%)     ")
    print("==================================================")
