# UniReg

UniReg is a CSC 384 Database Systems capstone project: a University Course Registration and Result Management System.

The project is intentionally database-first. The frontend and backend exist to demonstrate a strong relational design, not to replace it.

## Project Shape

```text
frontend/   Next.js frontend
backend/    Python API backend
database/   Raw SQL deliverables
docs/       Specs, workflow, handoffs, and delivery notes
scripts/    Utility scripts
```

## Recommended Read Order

1. `docs/README.md`
2. `docs/workflow.md`
3. `docs/status-board.md`
4. `docs/stack-decision.md`
5. `docs/ui-wireframe.md`
6. `docs/database/er-diagram.md`
7. `database/README.md`

## Planned Stack

- Frontend: Next.js, TypeScript, Tailwind CSS
- Backend: Python, FastAPI
- Database: PostgreSQL
- SQL deliverables: raw SQL files under `database/`

## First Commands

These commands are the intended workflow after dependencies are installed.

```bash
pnpm install
pnpm --dir frontend dev
```

```bash
cd backend
python -m venv .venv
source .venv/bin/activate
pip install ".[dev]"
uvicorn app.main:app --reload
```

## Important

Do not hide the database design behind an ORM. SQL files under `database/` are part of the assignment deliverables.
