# UniReg Backend

Python API for UniReg. The Next.js frontend reads **live data from PostgreSQL** through these routes when `NEXT_PUBLIC_DATA_SOURCE=api`.

Stack: FastAPI + PostgreSQL (raw SQL in services, no ORM).

## Setup

First-time install (PostgreSQL, Python, env): see **`docs/local-setup.md`**.

```bash
python -m venv .venv
source .venv/bin/activate
pip install ".[dev]"
cp .env.example .env
uvicorn app.main:app --reload
```

## Folder Structure

```text
app/
  api/       HTTP routes
  core/      settings and app configuration
  db/        PostgreSQL connection helpers
  models/    typed read models when needed
  schemas/   request/response validation
  services/  business logic
  sql/       SQL loading helpers or query files
tests/       backend tests
```

## Current Endpoint Groups

```text
GET /health
POST /api/auth/login
GET /api/auth/me

Admin setup:
  /api/admin/dashboard
  /api/admin/departments
  /api/admin/students
  /api/admin/lecturers
  /api/admin/courses
  /api/admin/sessions
  /api/admin/semesters
  /api/admin/offerings
  /api/admin/grade-scale
  /api/admin/audit-logs

Student:
  /api/students/me/course-offerings
  /api/students/me/registrations
  /api/students/me/results
  /api/students/me/transcript

Lecturer:
  /api/lecturers/me/courses
  /api/lecturers/me/result-roster
  /api/lecturers/me/results
```

See `docs/backend-api-contract.md` for the complete route count and frontend
wiring contract.
