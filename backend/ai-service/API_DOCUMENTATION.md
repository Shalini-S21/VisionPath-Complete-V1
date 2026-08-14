# VisionPath AI Integration Service — API Documentation

The `ai-service` runs on port `8087` and is exposed via API Gateway (`http://localhost:8080/api/ai/...`).
It provides centralized Google Gemini AI (`gemini-2.5-flash`) capabilities for the VisionPath platform.

---

## Environment Configuration

```properties
gemini.api-key=${GEMINI_API_KEY}
gemini.model=gemini-2.5-flash
```

Set the system environment variable:
`export GEMINI_API_KEY=your_google_gemini_api_key`

---

## API Endpoints Summary

| # | Endpoint | Method | Role | Description |
|---|----------|--------|------|-------------|
| 1 | `/api/ai/mentor/chat` | POST | STUDENT | VisionPath AI Mentor Chat |
| 2 | `/api/ai/generate-questions` | POST | STUDENT / ADMIN | Adaptive Question Generation |
| 3 | `/api/ai/analyze-assessment` | POST | STUDENT | AI Assessment Performance Analysis |
| 4 | `/api/ai/recommend-careers` | POST | STUDENT | Personalized Career Recommendations |
| 5 | `/api/ai/analyze-skill-gap` | POST | STUDENT | Skill Gap Analysis against Target Roles |
| 6 | `/api/ai/generate-study-plan` | POST | STUDENT | Automated Week-by-Week Study Plan |
| 7 | `/api/ai/analyze-resume` | POST | STUDENT | ATS Resume Evaluation & Skill Extraction |
| 8 | `/api/ai/counselor/student-summary` | POST / GET | COUNSELOR | Executive Counselor Student Dossier Summary |

---

## Detailed Endpoint Schemas

### 1. AI Mentor Chat
`POST /api/ai/mentor/chat`

**Request:**
```json
{
  "userId": 1,
  "message": "Explain Java inheritance with an example",
  "role": "STUDENT"
}
```
**Response:**
```json
{
  "success": true,
  "message": "AI Mentor response generated",
  "data": {
    "resultText": "Inheritance in Java allows a subclass to inherit fields and methods from a superclass...",
    "suggestions": ["Ask about study strategies", "Explore career recommendations"],
    "confidenceScore": 0.98
  },
  "timestamp": "2026-08-13T20:30:00"
}
```

### 2. Generate Assessment Questions
`POST /api/ai/generate-questions`

**Request:**
```json
{
  "category": "Spring Boot & Microservices",
  "academicLevel": "College Senior",
  "prompt": "Focus on REST API design and JPA"
}
```

### 3. Analyze Assessment
`POST /api/ai/analyze-assessment`

**Request:**
```json
{
  "studentId": 1,
  "category": "Backend Engineering",
  "prompt": "Score: 88%. Correctly answered Spring Boot & Docker questions."
}
```

### 4. Recommend Careers
`POST /api/ai/recommend-careers`

**Request:**
```json
{
  "studentId": 1,
  "academicLevel": "B.Tech Computer Science",
  "category": "Cloud & AI",
  "prompt": "Skills: Java, Python, React, SQL"
}
```

### 5. Analyze Skill Gap
`POST /api/ai/analyze-skill-gap`

**Request:**
```json
{
  "studentId": 1,
  "targetRole": "Full Stack AI Engineer",
  "prompt": "Current: React, Node. Missing: PyTorch, Docker"
}
```

### 6. Generate Study Plan
`POST /api/ai/generate-study-plan`

**Request:**
```json
{
  "studentId": 1,
  "academicLevel": "College 4th Year",
  "prompt": "Prepare for AWS Certified Developer Exam in 4 weeks"
}
```

### 7. Analyze Resume
`POST /api/ai/analyze-resume`

**Request:**
```json
{
  "studentId": 1,
  "targetRole": "Cloud Solutions Architect",
  "prompt": "Extracted Resume Plain Text Content..."
}
```

### 8. Counselor Student Summary
`POST /api/ai/counselor/student-summary` or `GET /api/ai/counselor/student-summary/{studentId}`

**Request:**
```json
{
  "studentId": 1
}
```
