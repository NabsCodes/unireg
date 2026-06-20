# UniReg Claude Guide

This file gives Claude-style working guidance for this repository. It complements
`AGENTS.md` and should keep any agent aligned on structure, scope, and handoff.

## What This Project Is

UniReg is a CSC 384 Database Systems capstone: a University Course Registration and
Result Management System. The academic evidence lives in PostgreSQL and raw SQL
files. The frontend and Python backend exist to demonstrate that design.

This is not a marketing site and not an ORM-driven app. Do not let polished UI
hide weak schema work, and do not hide SQL behind abstractions.

## Docs First

Before changing schema, API behavior, or portal screens, read:

1. `README.md`
2. `AGENTS.md`
3. `docs/README.md`
4. `docs/workflow.md`
5. `docs/status-board.md`
6. `docs/stack-decision.md`
7. `docs/ui-wireframe.md`
8. `docs/design-system.md`
9. the matching spec under `docs/features/` or `docs/database/`

After each meaningful session, update `docs/implementation-log.md`.

## File Ownership

- `frontend/app/` — thin routes with metadata exports
- `frontend/features/` — page views and feature UI
- `frontend/components/ui/` — shadcn primitives
- `frontend/components/shared/` — reusable composed UI (`DataTable`, `StatCard`, etc.)
- `frontend/components/layout/` — portal shell
- `frontend/content/` — navigation, SEO copy, demo data (mock mode only)
- `frontend/features/{role}/api/` — TanStack Query hooks
- `frontend/lib/api/` — fetch functions, query keys, HTTP client
- `frontend/lib/query/` — QueryClient provider
- `frontend/schemas/` — Zod schemas, inferred form types, default values
- `frontend/lib/` — metadata helpers, auth routing, table helpers, `cn()`
- `database/` — raw SQL deliverables
- `backend/app/` — Python API

## shadcn-First UI Rule

Before building UI from scratch, check `frontend/components/ui/`.

If shadcn provides the primitive, use it:

- forms → `form`, `field`, `input`, `label`, `select`, `textarea`
- tables → `table` wrapped by shared `DataTable`
- pagination → `pagination` via `DataTablePagination`
- overlays → `dialog`, `sheet`
- feedback → `badge`, `skeleton`

Do not clone shadcn behavior with raw HTML buttons, tables, or labels.

Variant components own their styling. Prefer adding a variant over overriding with ad hoc `className` patches from consumers.

## Tables Rule

Operational list screens must use the shared paginated data table:

- `components/shared/data-table.tsx` (includes S/N column by default)
- `components/shared/data-table-pagination.tsx`

Use TanStack Table for sorting, filtering, and pagination. Demo/static rows are served through `lib/api/` in mock mode. Empty states use `DataTableEmpty`. Student registration, results, and transcript should provide `renderMobileCard` on `DataTable`.

Do not ship hand-rolled `<table>` blocks for admin/student/lecturer list pages.

## Cards Rule

Use shadcn `Card`, `CardHeader`, and `CardContent` with default spacing only. Do not add extra `p-*`, `pb-*`, or `pt-*` on card slots.

## Forms Rule

Client forms use:

- `react-hook-form`
- `@hookform/resolvers/zod`
- schemas in `frontend/schemas/`
- shadcn `Form` primitives

Pattern:

```text
schemas/<feature>.ts      Zod schema + type + defaults
features/<feature>/...    client form component
app/.../page.tsx          metadata + feature view import
```

## Sidebar and Visual Tone

- Portal sidebar is **light and simple** — white card surface, burgundy accent bar, no heavy shadows.
- Burgundy gradient is reserved for auth/marketing surfaces (login brand panel), not the operational sidebar.
- Prefer borders over elevation. Keep cards at `rounded-lg` or below.

## Product Boundaries

- Database-first. SQL under `database/` is part of the assignment.
- FastAPI backend only. No Next.js route handlers as the main API.
- No ORM as schema source of truth.
- GPA/CGPA calculations belong in SQL views/functions, not React business logic.
- Mock values in UI must say they are demo placeholders where relevant.

## Verification

```bash
pnpm --dir frontend format
pnpm --dir frontend lint
pnpm --dir frontend typecheck
pnpm --dir frontend build
```
