# UniReg Agent Guide

This repo is a serious student capstone project. Treat it like a small real system with a tight academic deadline.

## Start Here

1. Read `README.md`.
2. Read `docs/README.md`.
3. Read `docs/workflow.md`.
4. Read `docs/status-board.md`.
5. Read `docs/stack-decision.md`.
6. Read `docs/ui-wireframe.md`.
7. Read the relevant feature or database spec before editing.

## Product Boundaries

- This is a database systems project first.
- The SQL deliverables should remain visible and easy to defend.
- The frontend should be clean and demo-ready, but it should not become the main academic evidence.
- The backend must use a suggested language from the brief. Current direction: Python.

## File Ownership

- `frontend/` owns the Next.js user interface.
- `backend/` owns the Python API.
- `database/` owns PostgreSQL schema, seed data, views, functions, triggers, transactions, and sample queries.
- `docs/` owns decisions, specs, wireframes, handoffs, and implementation logs.

## Implementation Rules

- Keep `frontend/app` route files thin.
- Put reusable UI in `frontend/components`.
- Put editable navigation and labels in `frontend/content`.
- Put API helpers in `frontend/lib`.
- Keep backend routes under `backend/app/api`.
- Keep backend database access under `backend/app/db`.
- Keep backend business logic under `backend/app/services`.
- Use raw SQL files for database concepts.
- Update `docs/implementation-log.md` after meaningful work.

## Verification

When code exists, prefer these checks before handoff:

```bash
pnpm --dir frontend lint
pnpm --dir frontend typecheck
pnpm --dir frontend build
```

```bash
cd backend
pytest
ruff check .
```

