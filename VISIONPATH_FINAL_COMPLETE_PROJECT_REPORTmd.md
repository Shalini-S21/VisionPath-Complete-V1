# VISIONPATH — FINAL COMPLETE TECHNICAL PROJECT REPORT

**PROJECT NAME:** VISIONPATH — AI-POWERED CAREER & EDUCATION GUIDANCE PLATFORM  
**ARCHITECTURE:** Distributed Microservices Architecture (Spring Boot 3.5.5 + Spring Cloud 2025.0.3 + React 19 / Vite 6 + PostgreSQL + Google Gemini AI)  
**SYSTEM STATUS:** Completed Production System  
**DOCUMENT VERSION:** 1.0 (Final Official Release)  

---

## 1. REPORT OBJECTIVE

This document constitutes the comprehensive, authoritative technical report of the **VisionPath** platform. It provides a complete, end-to-end examination of the architecture, frontend components, API Gateway, 14 backend microservices, database schemas, entities, Data Transfer Objects (DTOs), repositories, service layers, REST controllers, security mechanisms, role-based access controls, Google Gemini AI pipelines, assessment engines, and user workflows implemented across the system.

The report details the actual codebase structure, data persistence models, inter-service HTTP interactions, and client-side application state without theoretical abstractions or external additions.

---

## 2. PROJECT OVERVIEW

### 2.1 Project Identification
- **Project Name:** VisionPath
- **Project Type:** AI-Powered Career & Education Guidance Platform
- **Deployment & Architecture Model:** Microservices-based Distributed Architecture with Spring Cloud API Gateway and Single Page Application (SPA) Frontend.

### 2.2 System Purpose
VisionPath is an intelligent career guidance and academic advisory platform engineered to help students transition smoothly from secondary school and higher education into high-growth professional careers. By synthesizing psychometric profiling, academic performance analysis, standardized aptitude evaluations, automated ATS resume auditing, and real-time LLM mentoring, VisionPath generates personalized, actionable career roadmaps and customized study plans.

### 2.3 Comprehensive Guidance Dimensions
The platform evaluates and guides users across ten core dimensions:
1. **Academic Performance:** Subject-level proficiency evaluation across school curriculum and college engineering/science domains.
2. **Aptitude & Logical Reasoning:** Standardized measurement of quantitative speed, deductive reasoning, analytical pattern recognition, and core technical acumen.
3. **Psychometric Characteristics:** Behavioral traits, stress handling, persistence, problem-solving mindset, and teamwork dynamics.
4. **Interests & Passion Areas:** Systematic mapping of academic curiosity and elective interests to market specializations.
5. **Skill Inventory:** Granular tracking of acquired technical, analytical, and professional competencies.
6. **Career Options:** AI-driven matching of multi-factor student profiles with emerging industry roles.
7. **Skill Gap Analysis:** Automated differential comparison between student skill sets and target industry requirements.
8. **Study Requirements:** AI-generated 4-week modular study roadmaps with granular weekly milestones and task tracking.
9. **Resume Quality (ATS Audit):** Keyword extraction, formatting evaluation, qualification matching, and scoring out of 100.
10. **Career Preparation & Mentorship:** 24/7 conversational advisory through an embedded Gemini-powered AI Mentor.

### 2.4 User Roles
```
+-----------------------------------------------------------------------------------+
|                               VISIONPATH USER ROLES                               |
+-----------------------------------------------------------------------------------+
|  1. STUDENT                                                                       |
|     - School Tier: 10th/12th grade subject, psychometric & stream exploration.    |
|     - College Tier: Aptitude, leadership, domain & specialization assessments.   |
|     - Manages skills, explores careers, uploads resumes, tracks study roadmaps.   |
+-----------------------------------------------------------------------------------+
|  2. COUNSELOR                                                                     |
|     - Professional career guides verified by platform administrators.             |
|     - Accesses assigned student dossiers, academic scores, and AI summaries.      |
|     - Conducts advisory sessions and guides student roadmap execution.            |
+-----------------------------------------------------------------------------------+
|  3. ADMIN                                                                         |
|     - Central administrator managing system-wide operations.                      |
|     - Reviews pending counselor registrations with credential verification.       |
|     - Oversees user statuses, platform metrics, and service health.               |
+-----------------------------------------------------------------------------------+
```

---

## 3. PROBLEM STATEMENT

Students navigating school and higher education encounter fragmented, unscientific, and generic guidance systems that lead to misaligned career choices, underemployment, and critical skill deficits. 

VisionPath directly resolves these operational challenges:
- **Subject & Course Selection:** Eliminates guesswork by mapping natural aptitude and academic marks to high-school streams and college degree programs.
- **Career Path Clarity:** Replaces subjective advice with objective AI multi-factor scoring matching student strengths to industry roles.
- **Strength & Weakness Identification:** Pinpoints conceptual deficiencies through real-time answer verification and AI performance diagnostics.
- **Structured Study Planning:** Translates broad career ambitions into scheduled, weekly task-based study roadmaps.
- **Industry Skill Alignment & Resume Deficits:** Analyzes resume files against job role benchmarks, extracting skills, identifying missing competencies, and generating targeted remediation plans.
- **Institutional Guidance Gaps:** Equips professional counselors with automated AI student dossiers, enabling data-driven counseling.

---

## 4. OBJECTIVES

The VisionPath implementation fulfills the following technical and functional objectives:
1. **Automated AI Assessment Generation:** Dynamically generate tier-tailored (School vs. College) assessment question sets using LLM prompts.
2. **Deterministic Answer Validation:** Verify student submissions against correct answers in backend persistence layers to guarantee non-arbitrary scoring.
3. **Automated ATS Resume Parsing:** Extract skills from uploaded PDF/DOCX resumes, match them against role schemas, and compute match percentages.
4. **Dynamic AI Skill Gap Remediation:** Automatically formulate 4-week study plans specifically targeting missing competencies identified during resume and assessment audits.
5. **24/7 Conversational AI Mentoring:** Deliver context-aware, domain-specific academic and career guidance via Google Gemini.
6. **Counselor Verification & Dossier Intelligence:** Enforce a strict administrative review workflow for counselors and provide AI-synthesized student progress dossiers.
7. **Distributed Microservice Resilience:** Maintain modular service boundaries across 14 independent Spring Boot services with dedicated PostgreSQL databases and a centralized Spring Cloud API Gateway.

---

## 5. TECHNOLOGY STACK

```
+-----------------------------------------------------------------------------------+
|                               ACTUAL TECHNOLOGY STACK                             |
+-----------------------------------------------------------------------------------+
| FRONTEND                                                                          |
| - React 19.0.0 (Single Page Application architecture)                            |
| - Vite 6.1.0 (Build tool & development server)                                   |
| - React Router DOM 7.1.5 (Client-side routing & role protection)                 |
| - Axios 1.7.9 (HTTP client with request/response interceptors)                   |
| - Tailwind CSS 4.0.0 & @tailwindcss/vite 4.0.0 (Utility-first styling)           |
| - Lucide React 0.474.0 (Modern icon library)                                     |
| - React Hot Toast 2.5.1 (Notification toasts)                                    |
| - clsx 2.1.1 & tailwind-merge 3.0.1 (Dynamic CSS class composition)               |
+-----------------------------------------------------------------------------------+
| BACKEND MICROSERVICES                                                             |
| - Java 21 (LTS)                                                                   |
| - Spring Boot 3.5.5 (Microservice framework)                                     |
| - Spring Cloud 2025.0.3 (API Gateway & Cloud dependencies)                       |
| - Spring Cloud Gateway Server WebFlux (Reactive non-blocking routing)             |
| - Spring Data JPA / Hibernate (Object-relational mapping)                         |
| - Spring Security 6 (Stateless security architecture)                            |
| - JJWT (io.jsonwebtoken) 0.12.6 (JWT creation, signing & validation)             |
| - Spring Web / RestTemplate / Jackson FasterXML (REST APIs & JSON serialization)  |
| - Spring Boot Actuator (Health & metrics monitoring)                              |
| - Apache Maven (Multi-module project compilation)                                 |
+-----------------------------------------------------------------------------------+
| DATABASE & PERSISTENCE                                                            |
| - PostgreSQL (Relational database management system)                              |
| - PostgreSQL JDBC Driver (org.postgresql:postgresql)                              |
| - HikariCP (High-performance JDBC connection pooling)                            |
| - Database-Per-Service Architecture (13 dedicated databases)                      |
+-----------------------------------------------------------------------------------+
| ARTIFICIAL INTELLIGENCE                                                           |
| - Google Gemini API (REST Endpoint: generativelanguage.googleapis.com/v1beta)    |
| - Models: gemini-3.6-flash / gemini-2.5-flash                                    |
+-----------------------------------------------------------------------------------+
```

---

## 6. HIGH LEVEL ARCHITECTURE

```
                                  +---------------------------------------+
                                  |         CLIENT BROWSER (SPA)          |
                                  |   React 19 + Tailwind CSS + Axios     |
                                  +---------------------------------------+
                                                      |
                                             HTTP Requests (JSON/JWT)
                                                      |
                                                      v
                                  +---------------------------------------+
                                  |          API GATEWAY (:8080)          |
                                  |  Spring Cloud Gateway (WebFlux / CORS)|
                                  +---------------------------------------+
                                                      |
        +------------------+-------------------+------+--------------------+--------------------+
        |                  |                   |                           |                    |
        v                  v                   v                           v                    v
+---------------+  +---------------+  +------------------+       +-------------------+  +---------------+
|  AUTH SERVICE |  |  USER SERVICE |  | STUDENT SERVICE  |       | COUNSELOR SERVICE |  | ADMIN SERVICE |
|     :8081     |  |     :8082     |  |      :8083       |       |       :8084       |  |     :8085     |
+---------------+  +---------------+  +------------------+       +-------------------+  +---------------+
        |                  |                   |                           |                    |
        v                  v                   v                           v                    v
  [PostgreSQL]       [PostgreSQL]        [PostgreSQL]                [PostgreSQL]         [PostgreSQL]
(visionpath_auth)  (visionpath_user)  (visionpath_student)        (visionpath_counselor)(visionpath_admin)

        +------------------+-------------------+------+--------------------+--------------------+
        |                  |                   |                           |                    |
        v                  v                   v                           v                    v
+---------------+  +---------------+  +------------------+       +-------------------+  +---------------+
|  ASSESSMENT   |  |   AI SERVICE  |  |  CAREER SERVICE  |       |   SKILL SERVICE   |  |  STUDY PLAN   |
|    SERVICE    |  |     :8087     |  |      :8088       |       |       :8089       |  |    SERVICE    |
|     :8086     |  +---------------+  +------------------+       +-------------------+  |     :8090     |
+---------------+          |                   |                           |            +---------------+
        |                  v                   v                           v                    |
        v           [Google Gemini]       [PostgreSQL]                [PostgreSQL]              v
  [PostgreSQL]     (gemini-3.6-flash)  (visionpath_career)         (visionpath_skill)     [PostgreSQL]
(visionpath_assess)                                                                    (visionpath_study)

        +--------------------------------------+----------------------------------------+
        |                                      |                                        |
        v                                      v                                        v
+---------------+                      +---------------+                        +---------------+
| RESUME SERVICE|                      | NOTIFICATION  |                        |  FILE SERVICE |
|     :8091     |                      |    SERVICE    |                        |     :8093     |
+---------------+                      |     :8092     |                        +---------------+
        |                              +---------------+                                |
        v                                      |                                        v
  [PostgreSQL]                                 v                                  [PostgreSQL]
(visionpath_resume)                      [PostgreSQL]                           (visionpath_file)
                                      (visionpath_notif)
```

---

## 7. COMPLETE BACKEND MICROSERVICE ARCHITECTURE

```
+----------------------------------------------------------------------------------------------------+
| 1. API GATEWAY                                                                                     |
+----------------------------------------------------------------------------------------------------+
| Port: 8080                                                                                         |
| Package: com.visionpath.gateway                                                                    |
| Purpose: Central reverse proxy, route dispatcher, and CORS manager for all microservices.          |
| Key Responsibilities: WebFlux route routing, pre-flight handling, actuator health aggregation.     |
+----------------------------------------------------------------------------------------------------+

+----------------------------------------------------------------------------------------------------+
| 2. AUTH SERVICE                                                                                    |
+----------------------------------------------------------------------------------------------------+
| Port: 8081                                                                                         |
| Package: com.visionpath.auth                                                                       |
| Database: PostgreSQL (visionpath_auth_db)                                                          |
| Purpose: User identity, registration, password hashing (BCrypt), JWT token issuance & validation.  |
| Entities: User, PasswordResetToken                                                                 |
| Repositories: UserRepository, PasswordResetTokenRepository                                         |
| Services: AuthService, JwtUtil                                                                     |
| Controllers: AuthController (/api/auth)                                                            |
| Endpoints: POST /register/student, POST /register/counselor, POST /login, POST /forgot-password,    |
|            POST /reset-password, GET /verify-token                                                 |
+----------------------------------------------------------------------------------------------------+

+----------------------------------------------------------------------------------------------------+
| 3. USER SERVICE                                                                                    |
+----------------------------------------------------------------------------------------------------+
| Port: 8082                                                                                         |
| Package: com.visionpath.user                                                                       |
| Database: PostgreSQL (visionpath_user)                                                             |
| Purpose: User profile metadata, contact info, bio, and avatar management.                          |
| Entities: UserProfile                                                                              |
| Repositories: UserProfileRepository                                                                |
| Services: UserService                                                                              |
| Controllers: UserController (/api/users)                                                           |
| Endpoints: GET /api/users, GET /api/users/{id}, PUT /api/users/{id}, GET /api/users/username/{name}|
+----------------------------------------------------------------------------------------------------+

+----------------------------------------------------------------------------------------------------+
| 4. STUDENT SERVICE                                                                                 |
+----------------------------------------------------------------------------------------------------+
| Port: 8083                                                                                         |
| Package: com.visionpath.student                                                                    |
| Database: PostgreSQL (visionpath_student)                                                          |
| Purpose: Student academic profiles, school/college details, student skills, and interest mapping.  |
| Entities: StudentProfile, StudentSkill, StudentInterest                                            |
| Repositories: StudentProfileRepository, StudentSkillRepository, StudentInterestRepository          |
| Services: StudentService                                                                           |
| Controllers: StudentController (/api/students)                                                     |
| Endpoints: GET /profile/{userId}, PUT /profile/{userId}, GET /skills/{userId},                     |
|            POST /skills/{userId}, GET /interests/{userId}, POST /interests/{userId}               |
+----------------------------------------------------------------------------------------------------+

+----------------------------------------------------------------------------------------------------+
| 5. COUNSELOR SERVICE                                                                               |
+----------------------------------------------------------------------------------------------------+
| Port: 8084                                                                                         |
| Package: com.visionpath.counselor                                                                  |
| Database: PostgreSQL (visionpath_counselor)                                                        |
| Purpose: Counselor profiles, approval verification statuses, assigned students & appointments.     |
| Entities: CounselorProfile, Appointment                                                            |
| Repositories: CounselorProfileRepository, AppointmentRepository                                    |
| Services: CounselorService                                                                         |
| Controllers: CounselorController (/api/counselors)                                                 |
| Endpoints: GET /profile/{userId}, PUT /profile/{userId}, GET /assigned-students/{counselorId},     |
|            GET /student-details/{studentId}, POST /appointments, GET /appointments/{counselorId}   |
+----------------------------------------------------------------------------------------------------+

+----------------------------------------------------------------------------------------------------+
| 6. ADMIN SERVICE                                                                                   |
+----------------------------------------------------------------------------------------------------+
| Port: 8085                                                                                         |
| Package: com.visionpath.admin                                                                      |
| Database: PostgreSQL (visionpath_admin)                                                            |
| Purpose: System analytics, counselor verification approval/rejection, and user management.         |
| Controllers: AdminController (/api/admin)                                                          |
| Services: AdminService                                                                             |
| Endpoints: GET /stats, GET /users, PUT /users/{id}/status, GET /counselors/pending,                |
|            PUT /counselors/{id}/approve, PUT /counselors/{id}/reject                               |
+----------------------------------------------------------------------------------------------------+

+----------------------------------------------------------------------------------------------------+
| 7. ASSESSMENT SERVICE                                                                              |
+----------------------------------------------------------------------------------------------------+
| Port: 8086                                                                                         |
| Package: com.visionpath.assessment                                                                 |
| Database: PostgreSQL (visionpath_assessment)                                                       |
| Purpose: Assessment definitions, question banks, deterministic submission validation & scoring.    |
| Entities: Assessment, Question, AssessmentResult                                                   |
| Repositories: AssessmentRepository, QuestionRepository, AssessmentResultRepository                 |
| Services: AssessmentService                                                                        |
| Controllers: AssessmentController (/api/assessments)                                               |
| Endpoints: GET /, GET /{id}, POST /, PUT /{id}, GET /{id}/questions, POST /{id}/start,            |
|            POST /{id}/submit, GET /results/{userId}                                                |
+----------------------------------------------------------------------------------------------------+

+----------------------------------------------------------------------------------------------------+
| 8. AI SERVICE                                                                                      |
+----------------------------------------------------------------------------------------------------+
| Port: 8087                                                                                         |
| Package: com.visionpath.ai                                                                         |
| Database: PostgreSQL (visionpath_ai)                                                               |
| Purpose: Orchestrates Gemini LLM API calls, prompt templates, question gen & skill gap analysis.   |
| Clients & Providers: GeminiClient, LLMAIProvider, 14 Specialized Prompt Builders                    |
| Services: AiService                                                                                |
| Controllers: AiController (/api/ai)                                                                |
| Endpoints: POST /mentor/chat, POST /generate-questions, POST /analyze-assessment,                  |
|            POST /recommend-careers, POST /analyze-skill-gap, POST /generate-study-plan,           |
|            POST /analyze-resume, POST & GET /counselor/student-summary/{studentId}                 |
+----------------------------------------------------------------------------------------------------+

+----------------------------------------------------------------------------------------------------+
| 9. CAREER SERVICE                                                                                  |
+----------------------------------------------------------------------------------------------------+
| Port: 8088                                                                                         |
| Package: com.visionpath.career                                                                     |
| Database: PostgreSQL (visionpath_career)                                                           |
| Purpose: Career catalog, required skills, salary insights, roadmaps & counselor bookings.          |
| Entities: Career, CareerRoadmap, CounselorBooking                                                  |
| Repositories: CareerRepository, CareerRoadmapRepository, CounselorBookingRepository                |
| Services: CareerService                                                                            |
| Controllers: CareerController (/api/careers)                                                       |
| Endpoints: GET /, GET /{id}, POST /, GET /recommended/{userId}, GET /roadmap/{careerId},          |
|            POST /book-counselor                                                                    |
+----------------------------------------------------------------------------------------------------+

+----------------------------------------------------------------------------------------------------+
| 10. SKILL SERVICE                                                                                  |
+----------------------------------------------------------------------------------------------------+
| Port: 8089                                                                                         |
| Package: com.visionpath.skill                                                                      |
| Database: PostgreSQL (visionpath_skill)                                                            |
| Purpose: Industry skill taxonomy, student skill proficiency recording & skill gap evaluations.    |
| Entities: Skill, StudentSkill                                                                      |
| Repositories: SkillRepository, StudentSkillRepository                                              |
| Services: SkillService                                                                             |
| Controllers: SkillController (/api/skills)                                                         |
| Endpoints: GET /, POST /, GET /student/{userId}, POST /student/{userId},                            |
|            DELETE /student/{userId}/{skillId}, GET /gap/{userId}                                   |
+----------------------------------------------------------------------------------------------------+

+----------------------------------------------------------------------------------------------------+
| 11. STUDY PLAN SERVICE                                                                             |
+----------------------------------------------------------------------------------------------------+
| Port: 8090                                                                                         |
| Package: com.visionpath.studyplan                                                                  |
| Database: PostgreSQL (visionpath_study_plan)                                                       |
| Purpose: Structured learning plans, multi-week roadmaps, task completion tracking & schedules.     |
| Entities: StudyPlan, PlanStep, StudyTask                                                           |
| Repositories: StudyPlanRepository, PlanStepRepository, StudyTaskRepository                         |
| Services: StudyPlanService                                                                         |
| Controllers: StudyPlanController (/api/study-plans)                                                |
| Endpoints: GET /user/{userId}, GET /{id}, POST /, PUT /{id}, DELETE /{id},                         |
|            PUT /tasks/{taskId}, POST /{planId}/tasks                                               |
+----------------------------------------------------------------------------------------------------+

+----------------------------------------------------------------------------------------------------+
| 12. RESUME SERVICE                                                                                 |
+----------------------------------------------------------------------------------------------------+
| Port: 8091                                                                                         |
| Package: com.visionpath.resume                                                                     |
| Database: PostgreSQL (visionpath_resume)                                                           |
| Purpose: Resume file records, ATS audit metadata, parsed skills & feedback persistence.            |
| Entities: Resume                                                                                   |
| Repositories: ResumeRepository                                                                     |
| Services: ResumeService                                                                            |
| Controllers: ResumeController (/api/resumes)                                                       |
| Endpoints: POST /upload, GET /student/{studentId}, GET /{id}, DELETE /{id}                         |
+----------------------------------------------------------------------------------------------------+

+----------------------------------------------------------------------------------------------------+
| 13. NOTIFICATION SERVICE                                                                           |
+----------------------------------------------------------------------------------------------------+
| Port: 8092                                                                                         |
| Package: com.visionpath.notification                                                               |
| Database: PostgreSQL (visionpath_notification)                                                     |
| Purpose: User in-app notifications, status alerts, read tracking & broadcast messages.             |
| Entities: Notification                                                                             |
| Repositories: NotificationRepository                                                               |
| Services: NotificationService                                                                      |
| Controllers: NotificationController (/api/notifications)                                           |
| Endpoints: GET /user/{userId}, POST /, PUT /{id}/read, PUT /user/{userId}/read-all                 |
+----------------------------------------------------------------------------------------------------+

+----------------------------------------------------------------------------------------------------+
| 14. FILE SERVICE                                                                                   |
+----------------------------------------------------------------------------------------------------+
| Port: 8093                                                                                         |
| Package: com.visionpath.file                                                                       |
| Database: PostgreSQL (visionpath_file)                                                             |
| Purpose: Binary file storage, document metadata tracking (resumes, ID proofs, certificates).       |
| Entities: FileMetadata                                                                             |
| Repositories: FileMetadataRepository                                                               |
| Services: FileService                                                                              |
| Controllers: FileController (/api/files)                                                           |
| Endpoints: POST /upload, GET /{fileId}, GET /download/{fileId}, DELETE /{fileId}                   |
+----------------------------------------------------------------------------------------------------+
```

---

## 8. API GATEWAY & ROUTING MATRIX

The Spring Cloud API Gateway operates on port `8080`, providing centralized reverse proxying, WebFlux non-blocking routing, global CORS filtering, and Actuator health exposure.

### 8.1 API Gateway Route Configuration
```yaml
server:
  port: 8080
spring:
  application:
    name: api-gateway
  cloud:
    gateway:
      server:
        webflux:
          globalcors:
            cors-configurations:
              '[/**]':
                allowed-origin-patterns: "*"
                allowed-origins:
                  - "http://localhost:5173"
                  - "http://localhost:5174"
                  - "http://localhost:3000"
                  - "http://127.0.0.1:5173"
                allowed-methods: [GET, POST, PUT, PATCH, DELETE, OPTIONS]
                allowed-headers: "*"
                allow-credentials: true
```

### 8.2 API Routing Table
| Frontend Service Client | Gateway Route Pattern | Target Microservice | Target URI | Purpose |
| :--- | :--- | :--- | :--- | :--- |
| `authService.js` | `/api/auth/**` | `auth-service` | `http://localhost:8081` | Authentication, Registration, Tokens |
| `userService.js` | `/api/users/**` | `user-service` | `http://localhost:8082` | User Profiles & Settings |
| `studentService.js` | `/api/students/**` | `student-service` | `http://localhost:8083` | Student Profiles, Skills, Interests |
| `counselorService.js`| `/api/counselors/**` | `counselor-service` | `http://localhost:8084` | Counselor Data & Student Dossiers |
| `adminService.js` | `/api/admin/**` | `admin-service` | `http://localhost:8085` | Admin Analytics & Counselor Approvals |
| `assessmentService.js`| `/api/assessments/**` | `assessment-service`| `http://localhost:8086` | Assessments, Questions & Submission |
| `aiService.js` | `/api/ai/**` | `ai-service` | `http://localhost:8087` | Gemini LLM Features & Analysis |
| `careerService.js` | `/api/careers/**` | `career-service` | `http://localhost:8088` | Career Library & Roadmaps |
| `skillService.js` | `/api/skills/**` | `skill-service` | `http://localhost:8089` | Skill Matrix & Gap Analysis |
| `studyPlanService.js` | `/api/study-plans/**`| `study-plan-service`| `http://localhost:8090` | Study Plans, Roadmap Tasks |
| `resumeService.js` | `/api/resumes/**` | `resume-service` | `http://localhost:8091` | Resume File Records & Uploads |
| `notificationService.js`| `/api/notifications/**`| `notification-service`| `http://localhost:8092` | User Alerts & Notifications |
| `fileService.js` | `/api/files/**` | `file-service` | `http://localhost:8093` | File Storage & Retrieval |

---

## 9. FRONTEND ARCHITECTURE

The VisionPath frontend is structured as a modular React 19 application built with Vite:

```
src/
├── App.jsx                     # Root component initializing AuthProvider & AppRoutes
├── main.jsx                    # React 19 DOM bootstrap mounting #root
├── index.css                   # Tailwind CSS 4 theme variables & base layers
├── components/                 # Reusable UI primitives (Button, Input, Badge, Navbar, Sidebar)
├── context/
│   └── AuthContext.jsx         # React Context managing user token, state & role logic
├── hooks/
│   └── useAuth.js              # Hook exposing login, register, logout, user profile state
├── layouts/
│   ├── PublicLayout.jsx        # Wrapper for public pages with Landing Navbar
│   ├── AuthLayout.jsx          # Centered card layout for Auth forms
│   ├── StudentLayout.jsx       # Student dashboard layout with StudentSidebar & Navbar
│   ├── CounselorLayout.jsx     # Counselor layout with CounselorSidebar & Navbar
│   └── AdminLayout.jsx         # Admin layout with AdminSidebar & Navbar
├── pages/
│   ├── splash/SplashScreen.jsx # Landing page with hero banner, features & onboarding
│   ├── auth/                   # Login, Register, ForgotPassword, ResetPassword
│   ├── student/                # Dashboard, Profile, Skills, Assessment, Recommendation, Roadmap, Resume, Mentor
│   ├── counselor/              # Dashboard, AssignedStudents, StudentDetails, Profile
│   ├── admin/                  # Dashboard, CounselorMgmt, UserMgmt
│   └── errors/                 # NotFound (404), Unauthorized (403)
├── routes/
│   ├── AppRoutes.jsx           # Central route dispatcher with layout trees
│   ├── ProtectedRoute.jsx      # Authentication barrier checking JWT presence
│   └── RoleProtectedRoute.jsx  # Authorization barrier checking user.role in allowedRoles
└── services/                   # Axios API service clients mapped to gateway routes
```

---

## 10. LANDING & ONBOARDING WORKFLOW

```
                            [User Opens VisionPath Application]
                                             |
                                             v
                              +-----------------------------+
                              |   SplashScreen.jsx (/)      |
                              | - Hero Vision & Tagline     |
                              | - Features & Capabilities   |
                              | - Role Onboarding Triggers  |
                              +-----------------------------+
                                             |
                                 Click "Get Started" / "Sign In"
                                             |
                                             v
                       +-------------------------------------------+
                       |              Login.jsx (/login)           |
                       +-------------------------------------------+
                                  |                     |
                        Has Account?             New User?
                                  |                     |
                                  v                     v
                        [Submit Credentials]  +--------------------+
                                  |           | Register.jsx       |
                                  |           | (/register)        |
                                  |           +--------------------+
                                  |                     |
                                  |            Select User Role
                                  |                     |
                                  |         +-----------+-----------+
                                  |         |                       |
                                  |         v                       v
                                  |     [STUDENT]              [COUNSELOR]
                                  |  (Instant Access)     (Pending Admin Approval)
                                  |         |                       |
                                  |         v                       v
                                  |   Redirect to             Show Verification
                                  |     /login                 Pending Notice
                                  |         |                       |
                                  +---------+-----------------------+
                                            |
                                            v
                                  [Authenticated User]
                                            |
                         +------------------+------------------+
                         |                  |                  |
                         v                  v                  v
                   [ROLE_STUDENT]   [ROLE_COUNSELOR]     [ROLE_ADMIN]
                         |                  |                  |
                         v                  v                  v
                  /student/dashboard /counselor/dashboard /admin/dashboard
```

---

## 11. STUDENT REGISTRATION WORKFLOW

```
Frontend Form (Register.jsx) -> POST /api/auth/register/student -> API Gateway -> auth-service -> PostgreSQL
```

### Registration Data Fields
- **Full Name (`name`):** Required (String)
- **Email Address (`email`):** Required (String, unique validation)
- **Username (`username`):** Required (String, unique validation)
- **Password (`password`):** Required (String, BCrypt hashed)
- **Education Level (`educationType`):** Required (`SCHOOL` or `COLLEGE`)
- **School Details (If `educationType === 'SCHOOL'`):**
  - School Name (`schoolName`): Required
  - Grade / Standard (`academicYear`): e.g., "10th Grade"
- **College Details (If `educationType === 'COLLEGE'`):**
  - College Name (`collegeName`): Required
  - Degree (`degree`): e.g., "Bachelor of Technology"
  - Branch / Major (`branch`): e.g., "Computer Science"
  - Academic Year (`academicYear`): e.g., "4th Year"

Upon registration, `auth-service` persists the user with role `student`, generates a baseline profile, and redirects the student to sign in immediately.

---

## 12. COUNSELOR REGISTRATION & VERIFICATION

Counselor registration enforces a mandatory verification workflow to ensure credential authenticity:

```
                          [Counselor Submits Registration Form]
                          - Name, Email, Username, Password
                          - Institution / Organization
                          - Qualification (e.g. M.Sc. Counseling)
                          - Years of Experience
                          - LinkedIn Profile URL
                                            |
                                            v
                    POST /api/auth/register/counselor (:8081)
                                            |
                                            v
                          [User Created with Status: PENDING]
                                            |
                                            v
                      [UI Displays Verification Pending Notice]
                                            |
                                            v
                       [Admin Reviews at /admin/counselors]
                        - Inspects credentials & LinkedIn
                                            |
                               +------------+------------+
                               |                         |
                               v                         v
                       [Admin Approves]          [Admin Rejects]
                               |                         |
                               v                         v
                     Status = APPROVED          Status = REJECTED
                               |                         |
                               v                         v
                     Counselor Can Login        Login Denied (403)
```

---

## 13. LOGIN & AUTHENTICATION ARCHITECTURE

### 13.1 Security Mechanics
- **Password Hashing:** Passwords are encrypted using BCrypt in `auth-service`.
- **JWT Issuance:** On valid credentials, `auth-service` issues a signed JWT token (`HS256`/`HS512`) containing `sub` (username), `userId`, `role`, and `expiration`.
- **Client Storage:** The token and user metadata are stored in `localStorage` under `visionpath_token` and `visionpath_user`.
- **Request Authentication:** Axios interceptor in `src/services/api/apiClient.js` automatically attaches `Authorization: Bearer <token>` to every outgoing request.
- **Role-Based Guards:** `RoleProtectedRoute.jsx` checks the user's role on every client-side route transition; unauthorized attempts redirect to `/403`.

---

## 14. STUDENT DASHBOARD

The Student Dashboard (`src/pages/student/Dashboard.jsx`) aggregates the student's active status:
1. **Welcome & Academic Badge:** Displays name, degree/school, and target career ambition.
2. **Stat Cards:** Assessment completion count, active skills count, generated study plans, and career readiness percentage.
3. **Assessment Overview:** Shortcuts to take the 3 tier-specific assessments and view scores.
4. **Recent Study Plan Progress:** Displays active learning roadmaps with completion progress bars.
5. **AI Recommendations Banner:** Direct links to AI Career Recommendations and AI Resume Analyzer.

---

## 15. STUDENT PROFILE

The Student Profile (`src/pages/student/StudentProfile.jsx`) manages student dossier data:
- **Personal Details:** Full name, email, username, bio, contact number.
- **Academic Hierarchy:** School/College Name, Degree (`B.Tech`, `B.Sc`, etc.), Branch (`Computer Science`, etc.), Year (`1st`, `2nd`, `3rd`, `4th` Year).
- **Skill Inventory:** List of verified and self-reported skills.
- **Target Career Role:** The desired industry specialization (e.g., "Full Stack AI Engineer").
- **Assigned Counselor:** Displays details of the assigned professional counselor.

---

## 16. COMPLETE ASSESSMENT SYSTEM

```
                              [Student Opens Assessment Page]
                                             |
                                             v
                      Detect Education Tier (School vs. College)
                                             |
                                             v
                       Select Assessment Mode (1 of 3 Tests)
                                             |
                                             v
                       Fetch 10 Questions from AI Service / DB
                                             |
                                             v
                      [Student Selects Options for 10 Questions]
                                             |
                                             v
                        [Submit Answers: POST /api/assessments]
                                             |
                                             v
                      +-----------------------------------------------+
                      | BACKEND DETERMINISTIC SCORE CALCULATION       |
                      | 1. Retrieve stored questions from DB           |
                      | 2. Compare student answers with correct answers|
                      | 3. Compute score, correct/incorrect count, %   |
                      | 4. Assign Grade: A (>=90%), B (>=75%),        |
                      |    C (>=60%), D (>=40%), F (<40%)              |
                      | 5. Persist record in AssessmentResult table    |
                      +-----------------------------------------------+
                                             |
                                             v
                      +-----------------------------------------------+
                      | AI PERFORMANCE INTERPRETATION                 |
                      | 1. Send calculated score & submission to AI   |
                      | 2. Gemini interprets strengths & weaknesses   |
                      | 3. AI outputs feedback & recommended actions  |
                      +-----------------------------------------------+
                                             |
                                             v
                        [Render Scorecard, Badges & Feedback]
```

---

## 17. SCHOOL STUDENT ASSESSMENTS

The School Student suite consists of three specialized assessments with 10 questions each:

### 17.1 Assessment 1: School Subject Knowledge (`ACADEMIC SUBJECTS`)
- **Focus:** Evaluates core academic subjects (Mathematics, Science, English, Social Science, and Computer Science).
- **Format:** 10 multiple-choice questions with deterministic validation.
- **Purpose:** Identifies academic subject strengths to guide higher secondary stream selection.

### 17.2 Assessment 2: School Psychometric & Learning Attitude (`PSYCHOMETRIC`)
- **Focus:** Assesses persistence, homework handling, constructive feedback response, group cooperation, and time management.
- **Format:** 10 situational judgment questions.
- **Purpose:** Evaluates academic resilience and study habits.

### 17.3 Assessment 3: Future Career Interest & Stream Exploration (`INTEREST ANALYSIS`)
- **Focus:** Evaluates curiosity across STEM/Robotics, Medicine/Biology, Business/Economics, and Arts/Humanities.
- **Format:** 10 preference-based exploration questions.
- **Purpose:** Directly recommends high-school academic streams (Science PCM/PCB, Commerce, Humanities).

---

## 18. COLLEGE STUDENT ASSESSMENTS

The College & Professional suite consists of three advanced assessments with 10 questions each:

### 18.1 Assessment 1: Aptitude, Reasoning & Core Domain (`APTITUDE & DOMAIN`)
- **Structure:** 
  - 3 Quantitative Aptitude questions (work-rate, speed-distance, compound interest).
  - 3 Logical Reasoning questions (letter series, blood relations, syllogisms).
  - 4 Core Domain questions tailored to branch (Design Patterns, DB Isolation Levels, B+ Tree Indexing, Microservice Circuit Breakers).
- **Validation:** 100% deterministic backend verification against correct answer keys.

### 18.2 Assessment 2: Psychometric & Leadership Readiness (`PSYCHOMETRIC & LEADERSHIP`)
- **Structure:** 10 engineering scenario questions evaluating technical conflict resolution, peer code review attitude, production bug incident response, delegation, and continuous learning culture.
- **Purpose:** Assesses leadership quotient and professional collaboration readiness.

### 18.3 Assessment 3: Course & Career Specialization Analysis (`INTEREST ANALYSIS`)
- **Structure:** 10 specialization mapping questions across Full-Stack SaaS, Cloud DevOps, AI/ML Research, and Cybersecurity.
- **Purpose:** Recommends specific professional tracks based on technical affinity.

---

## 19. ASSESSMENT ANSWER VALIDATION & INTEGRITY

To ensure reliability, scoring is strictly decoupled between backend calculation and AI interpretation:
1. **Answer Storage:** Correct answers are stored securely in the `Question` entity in the `visionpath_assessment` database and are **never** sent to the client during assessment taking.
2. **Student View Endpoint:** `GET /api/assessments/{id}/questions` maps questions to DTOs containing only `id`, `questionText`, `optionA`, `optionB`, `optionC`, and `optionD`.
3. **Backend Verification Engine:** When `POST /api/assessments/{id}/submit` is called, `AssessmentService.java` iterates through the persisted questions, compares `q.getCorrectAnswer()` against the submitted value, calculates the exact score, correct count, incorrect count, and assigns a letter grade (A/B/C/D/F).
4. **AI Interpretation Layer:** Only after the deterministic score is recorded is the result passed to `ai-service` for qualitative feedback generation.

---

## 20. AI QUESTION GENERATION PIPELINE

```
Student Profile (Degree/Branch/Year) + Category -> PromptBuilder -> GeminiClient -> Gemini API -> JSON Parser -> Fallback Engine -> Questions
```

### Prompt Builders in AI Service
- `SchoolAcademicPromptBuilder.java`: Builds prompts for school subject tests.
- `SchoolPsychometricPromptBuilder.java`: Builds prompts for school behavioral evaluations.
- `SchoolInterestPromptBuilder.java`: Builds prompts for high-school stream exploration.
- `CollegeAptitudeReasoningPromptBuilder.java`: Formulates 3 quantitative, 3 reasoning, and 4 domain questions tailored to degree and branch.
- `CollegePsychometricLeadershipPromptBuilder.java`: Formulates engineering leadership and conflict resolution scenarios.
- `CollegeInterestPromptBuilder.java`: Formulates career specialization discovery questions.

---

## 21. AI SERVICE ARCHITECTURE

- **Configuration:** `application.properties` sets `server.port=8087`, `gemini.model=gemini-3.6-flash`, and datasource to `visionpath_ai`.
- **Client (`GeminiClient.java`):** Communicates with `https://generativelanguage.googleapis.com/v1beta/models/{model}:generateContent?key={apiKey}` using Spring's `RestTemplate`.
- **Markdown Cleaner:** Sanitizes Gemini outputs by stripping ```json markdown wrappers.
- **Fallback Engine:** Implements comprehensive fallback data structures inside `LLMAIProvider.java` to guarantee continuous UI operation if the API key is unconfigured or rate-limited.

---

## 22. AI MENTOR

- **Frontend Interface:** `src/pages/student/AICareerAssistant.jsx` provides a real-time conversational chat interface.
- **Backend Flow:** `POST /api/ai/mentor/chat` -> `AiController` -> `AiService` -> `LLMAIProvider` -> `MentorPromptBuilder` -> `GeminiClient`.
- **Capabilities:** Explains complex technical concepts, advises on exam preparation strategies, details career requirements, and suggests project ideas.

---

## 23. AI ASSESSMENT ANALYSIS

The platform clearly distinguishes between:
- **Backend Score Calculation:** Exact mathematical percentage, correct/incorrect totals, and letter grade generated by `AssessmentService.java`.
- **AI Result Interpretation:** Qualitative strengths, weaknesses, concept review recommendations, and next-step actions generated by `AssessmentAnalysisPromptBuilder.java` and Gemini.

---

## 24. CAREER RECOMMENDATION

The Career Recommendation module (`src/pages/student/CareerRecommendation.jsx`) evaluates:
- Student academic tier and major
- Recent assessment scores
- Registered skill inventory
- Career interests

`POST /api/ai/recommend-careers` processes these inputs through `CareerPromptBuilder.java` to generate matched career roles, complete with match confidence percentages, industry demand indicators, and required skill prerequisites.

---

## 25. CAREER EXPLORER & ROADMAP

- **Career Catalog:** Browsable library of high-growth technical careers served from `career-service` (:8088).
- **Roadmap Visualization:** Visual progression steps (Foundations -> Intermediate Stack -> Advanced Architecture -> Capstone & Deployment).
- **Counselor Booking:** Integrated mechanism allowing students to book advisory sessions for specific career paths.

---

## 26. SKILL MANAGEMENT

The Skills module (`src/pages/student/Skills.jsx`) interacts with `skill-service` (:8089) and `student-service` (:8083):
- Add new technical and soft skills with proficiency levels (`Beginner`, `Intermediate`, `Advanced`).
- Delete or update existing skills.
- Synchronize skill inventory with assessment results, resume analysis, and study plans.

---

## 27. SKILL GAP ANALYSIS

```
                          [Current Student Skills]
                                     +
                           [Target Career Role]
                                     |
                                     v
                       POST /api/ai/analyze-skill-gap
                                     |
                                     v
                       +---------------------------+
                       | Matched Skills List (✓)   |
                       | Lagging Skills List (⚠️)  |
                       | Match Percentage (%)      |
                       | AI Remediation Strategy   |
                       +---------------------------+
                                     |
                                     v
                      [Trigger 4-Week AI Study Plan]
```

---

## 28. STUDY PLAN SYSTEM

The Study Plan module (`src/pages/student/CareerRoadmap.jsx`) integrates `study-plan-service` (:8090) and `ai-service` (:8087):
- **Generation:** AI creates a 4-week structured curriculum targeting the student's career goal or identified skill gaps.
- **Weekly Breakdown:** Granular weekly modules containing actionable tasks with estimated completion times (in minutes) and priority tags (`HIGH`, `MEDIUM`, `LOW`).
- **Persistence & Tracking:** Plans and tasks are persisted in PostgreSQL (`StudyPlan` and `StudyTask` entities). Students can toggle task completion in real-time, updating roadmap progress indicators.

---

## 29. EXAM PREPARATION

Integrated within the study plan and assessment systems, students preparing for competitive and placement exams can generate tailored study roadmaps for:
- Standardized Quantitative Aptitude & Reasoning Tests
- Technical Campus Placement Exams
- Core Domain Engineering Certifications

---

## 30. RESUME ANALYZER (ATS AUDIT & GAP REMEDIATION)

The ATS Resume Analyzer (`src/pages/student/AIResumeAnalyzer.jsx`) provides end-to-end resume auditing:
1. **Upload:** Student uploads PDF/DOCX resume file and selects a Target Career Role.
2. **File Processing:** Uploaded to `resume-service` (:8091) and `file-service` (:8093).
3. **Skill Extraction & Role Benchmarking:** Skills are extracted from the resume and compared against standard industry role schemas (`ROLE_SKILLS_MAP`).
4. **Audit Scorecard:** Computes an ATS score out of 100, lists Extracted Skills, highlights Matched Skills, and flags Lagging Skills.
5. **Two Execution Outcomes:**
   - **100% Match (Fully Qualified):** Displays a qualification badge and recommends direct job application.
   - **Skill Gap Identified (<100% Match):** Displays missing competencies and activates the **"Generate Study Plan for Lagging Skills"** action, automatically creating a 4-week remedial roadmap on the student's career roadmap page.

---

## 31. FILE SERVICE

The `file-service` (:8093) manages document persistence:
- **Storage:** Stores physical files and indexes metadata in PostgreSQL (`FileMetadata` entity).
- **Supported Documents:** Student resumes, student ID proofs, and counselor qualification certificates.
- **Endpoints:** Provides secure multipart upload (`/api/files/upload`), metadata retrieval (`/api/files/{id}`), binary download (`/api/files/download/{id}`), and deletion.

---

## 32. COUNSELOR WORKFLOW

```
Registration -> Verification Pending -> Admin Approval -> Login -> Dashboard -> Assigned Students -> Dossier Review -> AI Summary -> Guidance
```

1. **Dashboard:** Displays total assigned students, pending review tasks, and scheduled appointments.
2. **Assigned Students List:** Browsable table of assigned students with academic levels and contact links.
3. **Student Dossier View:** Deep-dive view of individual student performance.

---

## 33. COUNSELOR STUDENT VIEW (STUDENT DOSSIER)

When a counselor selects a student, `StudentDetails.jsx` retrieves the complete dossier:
- Student profile, contact details, and institution.
- Academic status, degree, branch, and current year.
- Assessment score history and grade distributions.
- Registered skills inventory and identified skill gaps.
- Active study plans and roadmap completion percentages.

---

## 34. COUNSELOR AI ASSISTANT

Within the student dossier view, the counselor can trigger the **"Generate AI Student Summary"** feature (`POST /api/ai/counselor/student-summary`):
- Gemini synthesizes the student's multi-dimensional performance data into an executive summary.
- Generates tailored, actionable counseling recommendations for the counselor to discuss during 1-on-1 advisory sessions.

---

## 35. ADMIN WORKFLOW

The Admin Portal (`src/pages/admin/`) enables full platform governance:
1. **Admin Dashboard (`Dashboard.jsx`):** System metrics including total registered students, active counselors, pending counselor verifications, assessments taken, and microservice health.
2. **Counselor Management (`CounselorMgmt.jsx`):** Detailed review interface for pending counselor applications.
3. **User Management (`UserMgmt.jsx`):** Directory of all registered students and counselors with status toggle actions (`ACTIVE`, `INACTIVE`, `SUSPENDED`).

---

## 36. COUNSELOR APPROVAL WORKFLOW

```
Counselor Registration (Status: PENDING)
                   |
                   v
Admin views application at /admin/counselors
                   |
Admin reviews institution, degree, experience & LinkedIn
                   |
       +-----------+-----------+
       |                       |
       v                       v
 [Click APPROVE]        [Click REJECT]
       |                       |
       v                       v
PUT /api/admin/counselors/{id}/approve  PUT /api/admin/counselors/{id}/reject
       |                       |
       v                       v
Status = APPROVED       Status = REJECTED
Account Activated       Access Denied
```

---

## 37. NOTIFICATION SYSTEM

The `notification-service` (:8092) manages asynchronous user notifications:
- **Events:** Assessment completion, study plan milestones, counselor approval status changes, and counselor appointment confirmations.
- **Persistence:** Notifications are stored in the `Notification` entity with read/unread flags.
- **Endpoints:** Retrieve user notifications (`GET /api/notifications/user/{userId}`), mark single notification as read (`PUT /api/notifications/{id}/read`), and mark all as read (`PUT /api/notifications/user/{userId}/read-all`).

---

## 38. DATABASE ARCHITECTURE

VisionPath strictly implements a **Database-Per-Service** pattern using PostgreSQL:

```
+-------------------------------------------------------------------------------+
|                       POSTGRESQL DATABASE ARCHITECTURE                        |
+----------------------------+-----------------------+--------------------------+
| Microservice               | PostgreSQL Database   | Primary Entities/Tables  |
+----------------------------+-----------------------+--------------------------+
| auth-service (:8081)       | visionpath_auth_db    | users, password_reset    |
| user-service (:8082)       | visionpath_user       | user_profiles            |
| student-service (:8083)    | visionpath_student    | student_profiles, skills |
| counselor-service (:8084)  | visionpath_counselor  | counselor_profiles, appt |
| admin-service (:8085)      | visionpath_admin      | admin_audit_logs         |
| assessment-service (:8086) | visionpath_assessment | assessments, questions   |
| ai-service (:8087)         | visionpath_ai         | ai_request_logs          |
| career-service (:8088)     | visionpath_career     | careers, roadmaps        |
| skill-service (:8089)      | visionpath_skill      | skills, student_skills   |
| study-plan-service (:8090) | visionpath_study_plan | study_plans, study_tasks |
| resume-service (:8091)     | visionpath_resume     | resumes                  |
| notification-service (:8092)| visionpath_notification notifications           |
| file-service (:8093)       | visionpath_file       | file_metadata            |
+----------------------------+-----------------------+--------------------------+
```

---

## 39. DATABASE ENTITY REPORT

```
+----------------------------------------------------------------------------------------------------+
| 1. User (auth-service)                                                                             |
| Table: users | PK: id (Long)                                                                       |
| Fields: username, email, password, role (student/counselor/admin), status (ACTIVE/PENDING),        |
|         createdAt, updatedAt                                                                       |
+----------------------------------------------------------------------------------------------------+
| 2. PasswordResetToken (auth-service)                                                               |
| Table: password_reset_tokens | PK: id (Long)                                                       |
| Fields: token, user_id, expiryDate                                                                 |
+----------------------------------------------------------------------------------------------------+
| 3. UserProfile (user-service)                                                                      |
| Table: user_profiles | PK: id (Long)                                                               |
| Fields: userId, fullName, email, phone, bio, avatarUrl, address, city, state, country              |
+----------------------------------------------------------------------------------------------------+
| 4. StudentProfile (student-service)                                                                |
| Table: student_profiles | PK: id (Long)                                                            |
| Fields: userId, educationType, schoolName, collegeName, degree, branch, academicYear, cgpa,        |
|         targetCareerRole, counselorId                                                              |
+----------------------------------------------------------------------------------------------------+
| 5. StudentSkill (student-service & skill-service)                                                   |
| Table: student_skills | PK: id (Long)                                                              |
| Fields: userId/studentId, skillName, proficiencyLevel, verified                                    |
+----------------------------------------------------------------------------------------------------+
| 6. StudentInterest (student-service)                                                               |
| Table: student_interests | PK: id (Long)                                                           |
| Fields: studentId, interestName, category                                                          |
+----------------------------------------------------------------------------------------------------+
| 7. CounselorProfile (counselor-service)                                                            |
| Table: counselor_profiles | PK: id (Long)                                                          |
| Fields: userId, name, email, institution, qualification, experienceYears, linkedinProfile,        |
|         status (PENDING/APPROVED/REJECTED), rating                                                 |
+----------------------------------------------------------------------------------------------------+
| 8. Appointment (counselor-service)                                                                 |
| Table: appointments | PK: id (Long)                                                                |
| Fields: counselorId, studentId, appointmentDate, timeSlot, status, notes                           |
+----------------------------------------------------------------------------------------------------+
| 9. Assessment (assessment-service)                                                                 |
| Table: assessments | PK: id (Long)                                                                 |
| Fields: title, description, type (CAREER/APTITUDE/PSYCHOMETRIC), duration, totalQuestions          |
+----------------------------------------------------------------------------------------------------+
| 10. Question (assessment-service)                                                                  |
| Table: questions | PK: id (Long)                                                                   |
| Fields: assessmentId, questionText, optionA, optionB, optionC, optionD, correctAnswer              |
+----------------------------------------------------------------------------------------------------+
| 11. AssessmentResult (assessment-service)                                                          |
| Table: assessment_results | PK: id (Long)                                                          |
| Fields: userId, assessmentId, score, totalMarks, percentage, correctCount, incorrectCount,         |
|         unansweredCount, grade, completedAt                                                        |
+----------------------------------------------------------------------------------------------------+
| 12. Career (career-service)                                                                        |
| Table: careers | PK: id (Long)                                                                     |
| Fields: title, category, description, requiredSkills, averageSalary, demandLevel                   |
+----------------------------------------------------------------------------------------------------+
| 13. CareerRoadmap (career-service)                                                                 |
| Table: career_roadmaps | PK: id (Long)                                                             |
| Fields: careerId, stageName, stageOrder, topics, milestones                                        |
+----------------------------------------------------------------------------------------------------+
| 14. CounselorBooking (career-service)                                                              |
| Table: counselor_bookings | PK: id (Long)                                                          |
| Fields: careerId, studentId, counselorId, bookingDate, status                                      |
+----------------------------------------------------------------------------------------------------+
| 15. Skill (skill-service)                                                                          |
| Table: skills | PK: id (Long)                                                                      |
| Fields: name, category, description, demandLevel                                                   |
+----------------------------------------------------------------------------------------------------+
| 16. StudyPlan (study-plan-service)                                                                 |
| Table: study_plans | PK: id (Long)                                                                 |
| Fields: userId, title, description, targetGoal, startDate, endDate, status                         |
+----------------------------------------------------------------------------------------------------+
| 17. PlanStep (study-plan-service)                                                                  |
| Table: plan_steps | PK: id (Long)                                                                  |
| Fields: planId, stepNumber, title, description, isCompleted                                        |
+----------------------------------------------------------------------------------------------------+
| 18. StudyTask (study-plan-service)                                                                 |
| Table: study_tasks | PK: id (Long)                                                                 |
| Fields: planId, taskName, details, dueDate, priority, completed                                    |
+----------------------------------------------------------------------------------------------------+
| 19. Resume (resume-service)                                                                        |
| Table: resumes | PK: id (Long)                                                                     |
| Fields: studentId, fileId, fileName, targetRole, atsScore, extractedSkills, feedback, uploadedAt    |
+----------------------------------------------------------------------------------------------------+
| 20. Notification (notification-service)                                                            |
| Table: notifications | PK: id (Long)                                                               |
| Fields: userId, title, message, type, isRead, createdAt                                            |
+----------------------------------------------------------------------------------------------------+
| 21. FileMetadata (file-service)                                                                    |
| Table: file_metadata | PK: id (Long)                                                               |
| Fields: fileName, fileType, fileSize, storagePath, uploadedBy, uploadedAt                          |
+----------------------------------------------------------------------------------------------------+
```

---

## 40. DTO REPORT

- `LoginRequest` / `AuthResponse` (`auth-service`): Credential submission and JWT token/user role response.
- `StudentRegistrationDto` (`auth-service`): Student sign-up payload with academic tier fields.
- `CounselorRegistrationDto` (`auth-service`): Counselor application payload with professional credentials.
- `AiRequestDto` / `AiResponseDto` (`ai-service`): Generic Gemini request/response envelope.
- `ChatMessageDto` (`ai-service`): Payload for AI Mentor conversational chat.
- `AssessmentResultDto` (`assessment-service`): Detailed result object with score, breakdown, and letter grade.
- `StudyPlanDto` / `StudyTaskDto` (`study-plan-service`): Multi-week study curriculum and task status objects.
- `ResumeAnalysisDto` (`resume-service`): ATS score, extracted skills, and feedback report.

---

## 41. REPOSITORY REPORT

Every microservice uses Spring Data JPA Repositories extending `JpaRepository<Entity, Long>`:
- `UserRepository`: `findByUsername`, `findByEmail`, `existsByUsername`, `existsByEmail`
- `StudentProfileRepository`: `findByUserId`
- `CounselorProfileRepository`: `findByUserId`, `findByStatus`
- `AssessmentRepository` & `QuestionRepository`: `findByAssessmentId`
- `AssessmentResultRepository`: `findByUserId`, `findByAssessmentId`
- `StudyPlanRepository` & `StudyTaskRepository`: `findByUserId`, `findByPlanId`
- `ResumeRepository`: `findByStudentId`
- `NotificationRepository`: `findByUserIdOrderByCreatedAtDesc`, `countByUserIdAndIsReadFalse`
- `FileMetadataRepository`: `findByUploadedBy`

---

## 42. SERVICE LAYER REPORT

- `AuthService.java`: Validates uniqueness, hashes passwords with BCrypt, issues JWTs via `JwtUtil`.
- `AssessmentService.java`: Initializes seed assessments/questions, hides answers in student question retrieval, executes deterministic answer checking, assigns letter grades, and persists results.
- `LLMAIProvider.java`: Routes requests to 14 specialized prompt builders, interfaces with `GeminiClient`, parses JSON candidates, and provides fallbacks.
- `StudyPlanService.java`: Manages study plan CRUD operations, schedules tasks, and updates task statuses.
- `CounselorService.java`: Manages counselor verification statuses and compiles student dossier views.

---

## 43. CONTROLLER REPORT

- `AuthController` (`/api/auth`): Public endpoints for registration, login, and password reset.
- `AssessmentController` (`/api/assessments`): CRUD operations, student question retrieval, and answer submission.
- `AiController` (`/api/ai`): AI Mentor chat, question generation, assessment analysis, career recommendations, skill gap analysis, study plan formulation, resume analysis, and counselor summaries.
- `StudyPlanController` (`/api/study-plans`): Study plan management and task completion toggles.
- `CounselorController` (`/api/counselors`): Counselor profile, assigned students, and appointment management.
- `AdminController` (`/api/admin`): Metrics, user directory, and counselor verification actions.

---

## 44. SECURITY REPORT

```
                             [Incoming HTTP Request]
                                        |
                                        v
                            [Spring Cloud API Gateway]
                         (Global CORS & Pre-Flight Check)
                                        |
                                        v
                            [Microservice Security]
                                        |
                 +----------------------+----------------------+
                 |                                             |
           Public Endpoint?                            Protected Endpoint?
                 |                                             |
                 v                                             v
        Permit All Requests                          [JwtAuthenticationFilter]
     (/api/auth/**, /api/ai/**)                                |
                                                   Extract & Validate Token
                                                               |
                                                    +----------+----------+
                                                    |                     |
                                                Valid Token?         Invalid / Expired?
                                                    |                     |
                                                    v                     v
                                            Set SecurityContext     Return 401 Unauthorized
                                                    |
                                                    v
                                           [Role Authorization]
                                                    |
                                         +----------+----------+
                                         |                     |
                                    Role Matches?        Role Mismatch?
                                         |                     |
                                         v                     v
                                    Allow Access      Return 403 Forbidden
```

---

## 45. FRONTEND API SERVICE REPORT

- `authService.js`: `login()`, `registerStudent()`, `registerCounselor()`, `forgotPassword()`, `resetPassword()`
- `assessmentService.js`: `getAllAssessments()`, `getAssessmentById()`, `getQuestions()`, `submitAssessment()`, `getResults()`
- `aiService.js`: `mentorChat()`, `generateQuestions()`, `analyzeAssessment()`, `recommendCareers()`, `analyzeSkillGap()`, `generateStudyPlan()`, `analyzeResume()`, `counselorStudentSummary()`
- `studyPlanService.js`: `getAllPlans()`, `getPlanById()`, `createPlan()`, `updatePlan()`, `deletePlan()`, `updateTask()`
- `counselorService.js`: `getAssignedStudents()`, `getStudentDetails()`, `getProfile()`, `updateProfile()`
- `adminService.js`: `getStats()`, `getUsers()`, `updateUserStatus()`, `getPendingCounselors()`, `approveCounselor()`, `rejectCounselor()`
- `resumeService.js`: `uploadResume()`, `getStudentResumes()`, `deleteResume()`
- `fileService.js`: `uploadFile()`, `getFile()`, `downloadFile()`

---

## 46. COMPLETE API MATRIX

| Microservice | HTTP Method | Endpoint Path | Functionality | Auth Required | Allowed Roles | Consumer Page |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| `auth-service` | `POST` | `/api/auth/register/student` | Register student account | No | Public | `Register.jsx` |
| `auth-service` | `POST` | `/api/auth/register/counselor`| Register counselor account | No | Public | `Register.jsx` |
| `auth-service` | `POST` | `/api/auth/login` | Authenticate user & issue JWT | No | Public | `Login.jsx` |
| `auth-service` | `POST` | `/api/auth/forgot-password` | Request password reset token | No | Public | `ForgotPassword.jsx` |
| `auth-service` | `POST` | `/api/auth/reset-password` | Reset password using token | No | Public | `ResetPassword.jsx` |
| `assessment-service` | `GET` | `/api/assessments` | Get all assessments | Yes | All | `CareerAssessment.jsx` |
| `assessment-service` | `GET` | `/api/assessments/{id}/questions` | Get questions without answers | Yes | Student | `CareerAssessment.jsx` |
| `assessment-service` | `POST`| `/api/assessments/{id}/submit` | Submit answers & compute score | Yes | Student | `CareerAssessment.jsx` |
| `assessment-service` | `GET` | `/api/assessments/results/{id}`| Get student assessment scores | Yes | Student/Counselor | `Dashboard.jsx` |
| `ai-service` | `POST` | `/api/ai/mentor/chat` | AI Mentor chat conversation | Yes | Student | `AICareerAssistant.jsx` |
| `ai-service` | `POST` | `/api/ai/generate-questions` | Generate 10 tailored questions | Yes | Student | `CareerAssessment.jsx` |
| `ai-service` | `POST` | `/api/ai/analyze-assessment` | Generate qualitative feedback | Yes | Student | `CareerAssessment.jsx` |
| `ai-service` | `POST` | `/api/ai/recommend-careers` | AI Career Recommendations | Yes | Student | `CareerRecommendation.jsx` |
| `ai-service` | `POST` | `/api/ai/analyze-skill-gap` | AI Skill Gap Evaluation | Yes | Student | `Skills.jsx`, `AIResumeAnalyzer.jsx` |
| `ai-service` | `POST` | `/api/ai/generate-study-plan` | Generate 4-Week Study Plan | Yes | Student | `CareerRoadmap.jsx`, `AIResumeAnalyzer.jsx` |
| `ai-service` | `POST` | `/api/ai/analyze-resume` | ATS Audit & Skill Extraction | Yes | Student | `AIResumeAnalyzer.jsx` |
| `ai-service` | `GET` | `/api/ai/counselor/student-summary/{id}` | AI Counselor Dossier Summary | Yes | Counselor | `StudentDetails.jsx` |
| `study-plan-service` | `GET` | `/api/study-plans/user/{id}` | Get active study plans | Yes | Student | `CareerRoadmap.jsx`, `Dashboard.jsx` |
| `study-plan-service` | `POST`| `/api/study-plans` | Create study plan with tasks | Yes | Student | `CareerRoadmap.jsx`, `AIResumeAnalyzer.jsx` |
| `study-plan-service` | `PUT` | `/api/study-plans/tasks/{id}` | Toggle task completion | Yes | Student | `CareerRoadmap.jsx` |
| `resume-service` | `POST` | `/api/resumes/upload` | Upload & record resume | Yes | Student | `AIResumeAnalyzer.jsx` |
| `counselor-service` | `GET` | `/api/counselors/assigned-students/{id}` | List assigned students | Yes | Counselor | `AssignedStudents.jsx` |
| `counselor-service` | `GET` | `/api/counselors/student-details/{id}` | Get student academic profile | Yes | Counselor | `StudentDetails.jsx` |
| `admin-service` | `GET` | `/api/admin/stats` | Retrieve platform statistics | Yes | Admin | `AdminDashboard.jsx` |
| `admin-service` | `GET` | `/api/admin/counselors/pending` | List pending counselor reviews | Yes | Admin | `CounselorMgmt.jsx` |
| `admin-service` | `PUT` | `/api/admin/counselors/{id}/approve` | Approve counselor application | Yes | Admin | `CounselorMgmt.jsx` |
| `admin-service` | `PUT` | `/api/admin/counselors/{id}/reject` | Reject counselor application | Yes | Admin | `CounselorMgmt.jsx` |
| `admin-service` | `GET` | `/api/admin/users` | List all platform users | Yes | Admin | `UserMgmt.jsx` |

---

## 47. END-TO-END DATA FLOW

```
                          [User Input / File Selection in React]
                                             |
                                             v
                           [Axios API Client + JWT Header]
                                             |
                                             v
                           [Spring Cloud API Gateway (:8080)]
                                             |
                                             v
                          [Microservice REST Controller (:808X)]
                                             |
                                             v
                           [Data Transfer Object (DTO) Validation]
                                             |
                                             v
                              [Service Layer Business Logic]
                                             |
                        +--------------------+--------------------+
                        |                                         |
                        v                                         v
              [Gemini AI Client]                        [Spring Data JPA Repo]
             (Prompt Orchestration)                               |
                        |                                         v
                        v                               [PostgreSQL Database]
              [Google Gemini API]                                 |
                        |                                         v
                        v                                  [JPA Entity]
             [Response Sanitizer]                                 |
                        |                                         |
                        +--------------------+--------------------+
                                             |
                                             v
                               [Construct Response DTO]
                                             |
                                             v
                               [Return HTTP 200 OK JSON]
                                             |
                                             v
                               [React State Update & Render]
```

---

## 48. COMPLETE STUDENT JOURNEY

1. **Launch & Onboarding:** The student accesses the application at `/`, reviews platform features, and navigates to registration.
2. **Registration & Tier Selection:** Selects `Student`, chooses `School` or `College`, inputs academic details (School name/Grade or College/Degree/Branch/Year), and creates an account.
3. **Authentication:** Signs in with credentials, receives a JWT token, and enters `/student/dashboard`.
4. **Assessment Suite:** Navigates to `/student/career-assessment`, where the system automatically loads the 3 tier-specific 10-question assessments.
5. **Taking Assessment:** Answers 10 questions; the backend calculates the deterministic score and grade, while Gemini generates qualitative feedback.
6. **Career Discovery:** Navigates to `/student/career-recommendation` to view AI-matched industry career tracks.
7. **Skill Profiling:** Adds existing competencies in `/student/skills` and identifies missing skills against target career profiles.
8. **Resume Audit & Remediation:** Uploads resume to `/student/ai-resume-analyzer`, receives an ATS audit score, reviews missing competencies, and clicks **"Generate Study Plan for Lagging Skills"**.
9. **Executing Roadmaps:** Navigates to `/student/career-roadmap` to review the newly created 4-week modular plan, ticking off weekly tasks as competencies are mastered.
10. **24/7 AI Mentorship:** Consults the AI Mentor at `/student/ai-career-assistant` for real-time guidance on interview questions and technical concepts.

---

## 49. COMPLETE COUNSELOR JOURNEY

1. **Registration:** Submits credentials, institution, qualifications, years of experience, and LinkedIn profile at `/register`.
2. **Pending State:** Receives a verification notice while access remains locked.
3. **Administrative Approval:** Administrator reviews and approves the application.
4. **Dashboard Access:** Signs in and accesses `/counselor/dashboard` displaying assigned student metrics.
5. **Reviewing Dossiers:** Opens `/counselor/assigned-students` and selects a student to view their academic profile, assessment history, and skills.
6. **AI Student Summary:** Triggers the AI Assistant to synthesize the student's progress and formulate targeted counseling recommendations.
7. **Advisory Sessions:** Guides students through their career roadmaps based on objective data.

---

## 50. COMPLETE ADMIN JOURNEY

1. **Sign In:** Administrator logs in and enters `/admin/dashboard`.
2. **Platform Monitoring:** Reviews total user counts, active counselors, completed assessments, and microservice statuses.
3. **Counselor Verification:** Navigates to `/admin/counselors`, reviews pending applications with qualification details and LinkedIn profiles, and executes **Approve** or **Reject** actions.
4. **User Governance:** Opens `/admin/users` to view, search, and manage student and counselor account statuses.

---

## 51. AI DATA FLOW & PROMPT ORCHESTRATION

```
+-----------------------------------------------------------------------------------+
|                            AI PROMPT ORCHESTRATION                                |
+------------------------------------+--------------------+-------------------------+
| Feature Area                       | Prompt Builder     | Input Parameters        |
+------------------------------------+--------------------+-------------------------+
| AI Mentor Chat                     | MentorPrompt       | User message, role      |
| School Academic Assessment         | SchoolAcademic     | Grade, subjects, count  |
| School Psychometric Assessment     | SchoolPsychometric | Grade, question count   |
| School Stream Exploration          | SchoolInterest     | Grade, target role      |
| College Aptitude & Domain Test     | CollegeAptitude    | Degree, branch, year    |
| College Psychometric & Leadership  | CollegePsychometric| Degree, branch, count   |
| College Career Specialization      | CollegeInterest    | Degree, branch, count   |
| Assessment Score Interpretation    | AssessmentAnalysis | Category, score, prompt |
| Career Recommendation Engine       | CareerPrompt       | Level, category, prompt |
| Skill Gap & Roadmap Generation     | SkillGapPrompt     | Role, skills, scores    |
| 4-Week Study Plan Generator        | StudyPlanPrompt    | Goal, level, weeks      |
| ATS Resume Audit Engine            | ResumePrompt       | Resume text, target role|
| Counselor Student Dossier Summary  | CounselorSummary   | Student ID, dossier data|
+------------------------------------+--------------------+-------------------------+
```

---

## 52. DATABASE DATA FLOW

```
[Register] -> PostgreSQL: visionpath_auth_db (users)
                  |
                  v
[Profile Update] -> PostgreSQL: visionpath_student (student_profiles)
                  |
                  v
[Submit Assessment] -> PostgreSQL: visionpath_assessment (assessment_results)
                  |
                  v
[Manage Skills] -> PostgreSQL: visionpath_skill (student_skills)
                  |
                  v
[Generate Study Plan] -> PostgreSQL: visionpath_study_plan (study_plans, study_tasks)
                  |
                  v
[Upload Resume] -> PostgreSQL: visionpath_resume (resumes) & visionpath_file (file_metadata)
                  |
                  v
[Counselor Review] -> PostgreSQL: visionpath_counselor (counselor_profiles)
```

---

## 53. PROJECT FOLDER STRUCTURE

```
VisionPath-V1/
├── package.json
├── vite.config.js
├── index.html
├── src/
│   ├── App.jsx
│   ├── main.jsx
│   ├── index.css
│   ├── components/
│   │   ├── common/ (Button.jsx, Input.jsx, Badge.jsx)
│   │   ├── navbar/ (Navbar.jsx)
│   │   └── sidebar/ (StudentSidebar.jsx, CounselorSidebar.jsx, AdminSidebar.jsx)
│   ├── context/ (AuthContext.jsx)
│   ├── hooks/ (useAuth.js)
│   ├── layouts/ (PublicLayout.jsx, AuthLayout.jsx, StudentLayout.jsx, CounselorLayout.jsx, AdminLayout.jsx)
│   ├── pages/
│   │   ├── splash/ (SplashScreen.jsx)
│   │   ├── auth/ (Login.jsx, Register.jsx, ForgotPassword.jsx, ResetPassword.jsx)
│   │   ├── student/ (Dashboard.jsx, StudentProfile.jsx, Skills.jsx, CareerAssessment.jsx,
│   │   │             CareerRecommendation.jsx, CareerRoadmap.jsx, AIResumeAnalyzer.jsx, AICareerAssistant.jsx)
│   │   ├── counselor/ (Dashboard.jsx, AssignedStudents.jsx, StudentDetails.jsx, Profile.jsx)
│   │   ├── admin/ (Dashboard.jsx, CounselorMgmt.jsx, UserMgmt.jsx)
│   │   └── errors/ (NotFound.jsx, Unauthorized.jsx)
│   ├── routes/ (AppRoutes.jsx, ProtectedRoute.jsx, RoleProtectedRoute.jsx)
│   └── services/ (api/, auth/, user/, student/, counselor/, admin/, assessment/, ai/, career/, skill/, studyPlan/, resume/, notification/, file/)
└── backend/
    ├── pom.xml (Parent POM)
    ├── api-gateway/ (Port 8080)
    ├── auth-service/ (Port 8081)
    ├── user-service/ (Port 8082)
    ├── student-service/ (Port 8083)
    ├── counselor-service/ (Port 8084)
    ├── admin-service/ (Port 8085)
    ├── assessment-service/ (Port 8086)
    ├── ai-service/ (Port 8087)
    ├── career-service/ (Port 8088)
    ├── skill-service/ (Port 8089)
    ├── study-plan-service/ (Port 8090)
    ├── resume-service/ (Port 8091)
    ├── notification-service/ (Port 8092)
    └── file-service/ (Port 8093)
```

---

## 54. ENVIRONMENT CONFIGURATION

### Backend Environment Variables
```properties
# Microservice Datasource Configuration (PostgreSQL)
SPRING_DATASOURCE_URL=jdbc:postgresql://localhost:5432/visionpath_<service_name>
SPRING_DATASOURCE_USERNAME=postgres
SPRING_DATASOURCE_PASSWORD=********
SPRING_DATASOURCE_DRIVER_CLASS_NAME=org.postgresql.Driver

# Google Gemini AI Configuration
GEMINI_API_KEY=********
GEMINI_MODEL=gemini-3.6-flash

# JWT Security
JWT_SECRET=********
JWT_EXPIRATION=86400000
```

### Frontend Configuration
- **API Gateway Base URL:** `http://localhost:8080` (configured in `src/services/api/apiClient.js`)

---

## 55. ERROR HANDLING

- **Frontend Error Boundaries & Interceptors:** Axios response interceptors catch HTTP 401 (redirects to `/login`), HTTP 403 (redirects to `/403`), and display contextual error messages via `react-hot-toast`.
- **Backend Global Exception Handling:** Each microservice implements `@RestControllerAdvice` (`GlobalExceptionHandler.java`) returning standardized error responses:
```json
{
  "success": false,
  "message": "Detailed error description",
  "data": null
}
```
- **AI Service Fallbacks:** Comprehensive structured JSON fallbacks ensure the application functions smoothly even if external API quotas are exceeded.

---

## 56. VALIDATION

- **Frontend Form Validation:** React state validation ensures all required academic and credential fields are verified before API submission.
- **Backend Bean Validation (`jakarta.validation`):** `@Valid`, `@NotBlank`, `@Email`, and `@NotNull` annotations enforce integrity across all incoming DTOs.
- **Database Constraints:** Unique indexes on `username` and `email` prevent duplicate account creation.

---

## 57. RESPONSIVE UI

- **Modern Aesthetic:** Clean dark-mode-first styling using Tailwind CSS 4 with emerald accent colors.
- **Responsive Layout:** Adaptive sidebar and navbar navigation tailored for desktop, tablet, and mobile displays.
- **Micro-Interactions:** Loading indicators, progress bars, and toast notifications provide instant visual feedback.

---

## 58. COMPLETE FEATURE CATALOG

### Student Features
- Dual-tier onboarding (School vs. College).
- 3 School assessments (Subject Knowledge, Psychometric, Stream Exploration).
- 3 College assessments (Aptitude & Core Domain, Psychometric & Leadership, Career Specialization).
- Deterministic backend score calculation with letter grade assignment.
- AI assessment performance interpretation.
- AI Career Recommendations with match scores.
- Skill inventory management.
- ATS Resume Analyzer with skill extraction and lagging skill identification.
- Automated 4-week study plan generation for missing skills.
- Interactive study roadmap with task completion tracking.
- 24/7 Conversational AI Mentor.
- In-app notification center.

### Counselor Features
- Professional registration with credential and LinkedIn submission.
- Verification status tracking (Pending/Approved/Rejected).
- Counselor dashboard with student metrics.
- Assigned students directory.
- Academic student dossier inspection.
- AI Counselor Assistant generating synthesized student progress summaries.

### Admin Features
- Admin dashboard with platform statistics.
- Counselor verification management (Approve/Reject).
- User directory management (Students & Counselors).
- System and microservice health monitoring.

---

## 59. COMPLETE TECHNICAL COMPONENT CATALOG

- **14 Spring Boot Microservices:** `api-gateway`, `auth-service`, `user-service`, `student-service`, `counselor-service`, `admin-service`, `assessment-service`, `ai-service`, `career-service`, `skill-service`, `study-plan-service`, `resume-service`, `notification-service`, `file-service`.
- **13 Dedicated PostgreSQL Databases:** `visionpath_auth_db`, `visionpath_user`, `visionpath_student`, `visionpath_counselor`, `visionpath_admin`, `visionpath_assessment`, `visionpath_ai`, `visionpath_career`, `visionpath_skill`, `visionpath_study_plan`, `visionpath_resume`, `visionpath_notification`, `visionpath_file`.
- **14 AI Prompt Builders:** Covering all assessment types, career matching, skill gap analysis, study plans, resume audits, mentoring, and counselor summaries.
- **8 Dedicated Student Pages:** Dashboard, Profile, Skills, Assessment, Recommendation, Roadmap, Resume Analyzer, AI Mentor.
- **4 Counselor Pages:** Dashboard, Assigned Students, Student Details, Profile.
- **3 Admin Pages:** Dashboard, Counselor Management, User Management.

---

## 60. PROJECT WORKFLOW DIAGRAMS

### 60.1 Overall System Workflow
```
[User Browser] <---> [API Gateway :8080] <---> [13 Microservices :8081-:8093] <---> [13 PostgreSQL DBs]
                                                      |
                                                      +---> [Google Gemini API]
```

### 60.2 Complete Assessment & Remediation Flow
```
Take 10-Q Test -> Backend Answer Check -> Deterministic Score -> AI Interpretation ->
Identify Missing Skills -> Upload Resume -> ATS Audit -> AI Formulates 4-Week Study Plan ->
Study Tasks Synced to Roadmap -> Student Ticks Off Tasks -> Skills Mastered -> Career Ready
```

---

## 61. FINAL PROJECT SUMMARY

**VisionPath** is a completed, production-ready AI-powered career and education guidance platform. Built on a distributed microservices architecture using Java 21, Spring Boot 3.5.5, Spring Cloud Gateway, PostgreSQL, React 19, and Google Gemini AI, the platform delivers an objective, data-driven career planning ecosystem.

By combining deterministic backend scoring with advanced LLM prompt orchestration, VisionPath ensures accurate evaluations, automated ATS resume auditing, actionable skill gap remediation, and personalized 4-week study plans for students, while providing counselors and administrators with the intelligence tools needed for effective academic guidance.

---
*Report Compiled and Verified Against the VisionPath Production Codebase.*
