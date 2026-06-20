# UniReg Backend

Python API for UniReg.

Current recommendation: FastAPI with PostgreSQL.

## Setup

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

## Current Read Endpoints

```text
GET /health
GET /api/admin/dashboard
GET /api/academic/course-offerings
GET /api/students/{matric_no}/results
GET /api/students/{matric_no}/transcript
GET /api/lecturers/{staff_no}/courses
```

These endpoints read from SQL views and joins. Mutations should call database
functions such as `register_course()` and `upload_result()` once auth is added.
