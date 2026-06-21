# Workflow

UniReg should be built database-first. The frontend exists to demonstrate the database design, not to hide weak data modeling behind a polished interface.

## Standard Loop

1. Confirm the requirement or open question.
2. Update the relevant doc or checklist.
3. Design or adjust the database shape first.
4. Write or update SQL.
5. Implement only the app surface needed to demonstrate the database behavior.
6. Run targeted verification.
7. Add a short `implementation-log.md` entry.
8. Leave a handoff note if work is incomplete.

## Current Stack Rule

The stack is confirmed:

- Frontend: Next.js, TypeScript, Tailwind CSS, shadcn/ui, TanStack Query
- Backend: Python FastAPI (JWT auth, role guards, raw SQL via `psycopg`)
- Database: PostgreSQL with raw SQL deliverables under `database/`

Do not use Next.js API routes as the main backend. Do not use an ORM as the schema source of truth.

## Live Data Rule

The application demo runs against **seeded PostgreSQL data** through FastAPI.

- Load SQL files in order (`database/README.md`).
- Run backend + frontend with `NEXT_PUBLIC_DATA_SOURCE=api` (see root `README.md`).
- Academic behavior (registration rules, grades, GPA, audit) must remain demonstrable in SQL even when the UI calls the API.

`frontend/content/mock/` is a **mock fallback only** when the API is unavailable or `NEXT_PUBLIC_DATA_SOURCE` is not `api`. Do not treat mock data as the primary source of truth and do not wire new screens to import it directly — read through `frontend/lib/api/` instead.

## Database Rule

The SQL files should be visible and defendable:

- `database/01_schema.sql`
- `database/02_seed.sql`
- `database/03_views.sql`
- `database/04_functions.sql`
- `database/05_triggers.sql`
- `database/06_transactions.sql`
- `database/07_sample_queries.sql`

The application may use helper libraries, but the academic evidence should be in raw SQL.

## Completion Rule

Do not mark a checklist item complete just because a file exists. Mark it complete only when the relevant behavior is implemented, verified, and documented.

