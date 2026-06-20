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
