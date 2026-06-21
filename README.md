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

## Live Data (Default)

The portal reads **live data from PostgreSQL** through the FastAPI backend. This is the mode used for development, demo, and presentation.

1. Load the SQL files in order — see `database/README.md`.
2. Start PostgreSQL and run the backend (`uvicorn app.main:app --reload`).
3. Copy `frontend/.env.example` to `frontend/.env.local`:

```bash
NEXT_PUBLIC_DATA_SOURCE=api
NEXT_PUBLIC_API_BASE_URL=http://127.0.0.1:8000
```

4. Start the frontend: `pnpm --dir frontend dev`

Demo logins use seeded users from `database/02_seed.sql` (password `demo1234` for all demo accounts).

**Presenting or defending the project?** Start at [`docs/delivery/README.md`](docs/delivery/README.md) — defense guide, demo script, and cheat sheet for Batul.

### Mock mode (optional fallback only)

If `NEXT_PUBLIC_DATA_SOURCE` is not `api`, the frontend falls back to static rows in `frontend/content/demo-data/`. That path is for offline UI work only and is **not** the presentation source of truth.
