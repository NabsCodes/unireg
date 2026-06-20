# Implementation Log

Keep entries short. This log exists so the next person can continue without reading every chat message.

| Date | Agent | Task | Files touched | Checks run | Status | Next step |
| --- | --- | --- | --- | --- | --- | --- |
| 2026-06-20 | Codex | Created UniReg documentation foundation and captured the corrected ERD direction from the CSC 384 brief and Claude v2 diagram. | `docs/**` | `git status --short` before edits | In progress | Review ERD with Batul, then write SQL schema. |
| 2026-06-20 | Codex | Documented the app UI mental wireframe and updated stack direction after confirmation that the backend should use suggested tools. | `docs/{README.md,status-board.md,implementation-log.md,stack-decision.md,ui-wireframe.md}` | Pending | In progress | Pick Python backend framework, then prepare repo structure. |
| 2026-06-20 | Codex | Scaffolded the two-runtime repo: Next.js frontend, FastAPI backend, PostgreSQL SQL deliverable folder, route placeholders, shared app shell, and dependency installs. | `README.md`, `AGENTS.md`, `package.json`, `pnpm-workspace.yaml`, `frontend/**`, `backend/**`, `database/**`, `scripts/**`, `docs/{status-board.md,implementation-log.md}` | `pnpm install` (pass after approving `sharp` and `unrs-resolver` builds); `backend/.venv/bin/pip install './backend[dev]'` (pass with Python 3.12 venv); `pnpm --dir frontend typecheck` (pass); `pnpm --dir frontend lint` (pass); `pnpm --dir frontend build` (pass outside sandbox after Turbopack worker was blocked inside sandbox); `pytest` (pass, 1 Starlette/httpx deprecation warning); `ruff check .` (pass). | Complete | Start database implementation with `database/01_schema.sql`, then seed data. |
