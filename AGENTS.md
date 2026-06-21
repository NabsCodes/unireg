# UniReg Agent Guide

This repo is a serious student capstone project. Treat it like a small real system with a tight academic deadline.

## Start Here

1. Read `README.md`.
2. Read `CLAUDE.md`.
3. Read `docs/README.md`.
4. Read `docs/workflow.md`.
5. Read `docs/status-board.md`.
6. Read `docs/stack-decision.md`.
7. Read `docs/ui-wireframe.md`.
8. Read the relevant feature or database spec before editing.
9. Inspect `git diff` first. Build on the current scaffold work. Do not revert existing uncommitted changes unless the user explicitly asks.

## Product Boundaries

- This is a database systems project first.
- The SQL deliverables should remain visible and easy to defend.
- The frontend should be clean and demo-ready, but it should not become the main academic evidence.
- The backend must use a suggested language from the brief. Current direction: Python FastAPI.
- Do not use Next.js API routes as the main backend.
- Do not use Prisma or another ORM as the schema source of truth.

## File Ownership

- `frontend/` owns the Next.js user interface.
- `backend/` owns the Python API.
- `database/` owns PostgreSQL schema, seed data, views, functions, triggers, transactions, and sample queries.
- `docs/` owns decisions, specs, wireframes, handoffs, and implementation logs.

## Implementation Rules

- Keep `frontend/app` route files thin.
- Put reusable UI in `frontend/components`.
- Put editable navigation and labels in `frontend/content`.
- Put Zod schemas and form value types in `frontend/schemas/`.
- Put API helpers and shared frontend utilities in `frontend/lib/`.
- Put HTTP fetch functions in `frontend/lib/api/` and TanStack Query hooks in `frontend/features/{role}/api/`.
- Mock rows live in `frontend/content/mock/` and are read through `lib/api/` when `NEXT_PUBLIC_DATA_SOURCE=mock` only. **Live demo uses PostgreSQL via FastAPI** (`NEXT_PUBLIC_DATA_SOURCE=api`).
- Keep backend routes under `backend/app/api`.
- Keep backend database access under `backend/app/db`.
- Keep backend business logic under `backend/app/services`.
- Use raw SQL files for database concepts.
- Update `docs/implementation-log.md` after meaningful work.
- If work is incomplete, use `docs/handoff-template.md` for the next handoff.

## Frontend Tooling

- ESLint: `frontend/eslint.config.mjs`
- Prettier: `frontend/.prettierrc` with `prettier-plugin-tailwindcss`
- Tailwind CSS v4 via `frontend/postcss.config.mjs`
- Typecheck uses `frontend/tsconfig.typecheck.json`

Format before final verification. Use `pnpm --dir frontend format` for a full pass, or `pnpm --dir frontend exec prettier --write <changed-files>` while iterating.

## Working Style

- Keep docs short, practical, and fast for the next agent to read.
- Database shape before app surface.
- Reuse existing layout and placeholder components before creating new abstractions.
- Promote a new primitive only when the pattern is stable and repeated enough to earn reuse.
- **shadcn-first:** if shadcn already ships a primitive (`form`, `table`, `pagination`, `dialog`, `sheet`, etc.), add or reuse it instead of building a custom replacement.
- **Tables:** list screens must use `components/shared/data-table.tsx` (S/N column, headers, paginated footer). Do not hand-roll static HTML tables for operational screens.
- **Cards:** use shadcn card slot defaults only — do not add extra `p-*` padding on `CardHeader` / `CardContent`.
- **Forms:** client validation uses `react-hook-form` + `@hookform/resolvers/zod` with schemas in `frontend/schemas/`.

## Verification

When code exists, prefer these checks before handoff:

```bash
pnpm --dir frontend format
pnpm --dir frontend lint
pnpm --dir frontend typecheck
pnpm --dir frontend build
```

```bash
cd backend
pytest
ruff check .
```
