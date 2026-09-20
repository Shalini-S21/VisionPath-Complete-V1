# VisionPath Docker Setup & Run Guide

This project is containerized using **Docker** and **Docker Compose**.

---

## 1. Project Services Overview

| Service | Technology | Port(s) | Description |
|---|---|---|---|
| **`postgres`** | PostgreSQL 16 Alpine | `5432` | Stores data for all microservices |
| **`visionpath-ml-service`** | FastAPI / Python 3.11 | `8000` | NLP Skill Extraction, ML Career Recommendation, Gemini LLM |
| **`visionpath-frontend`** | React + Vite + Nginx | `5173`, `80` | UI Dashboard with client-side SPA routing |
| **`visionpath-backend`** | Spring Boot 3.5 (Java 21) | `8080` - `8093` | Microservices + API Gateway |

---

## 2. Quick Start with Docker

### Step 1: Set Your Environment Variables
Copy `.env.docker` or create a `.env` in the root directory:
```bash
cp .env.docker .env
```
Add your Google Gemini API key:
```env
GEMINI_API_KEY=your_actual_gemini_api_key
```

### Step 2: Build and Run Containers
In the root directory:
```bash
docker compose up --build
```
Or to run in detached background mode:
```bash
docker compose up -d --build
```

---

## 3. Verify Container Status

Check that all containers are healthy:
```bash
docker compose ps
```

- **Frontend**: Open [http://localhost:5173](http://localhost:5173) or [http://localhost](http://localhost)
- **FastAPI / ML Service Docs**: Open [http://localhost:8000/docs](http://localhost:8000/docs)
- **FastAPI Health**: Open [http://localhost:8000/health](http://localhost:8000/health)

---

## 4. Useful Docker Commands

- **Stop all services**:
  ```bash
  docker compose down
  ```
- **Stop and delete data volumes**:
  ```bash
  docker compose down -v
  ```
- **View logs for a service**:
  ```bash
  docker compose logs -f visionpath-ml-service
  docker compose logs -f visionpath-frontend
  ```
