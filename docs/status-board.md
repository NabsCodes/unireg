# Status Board

## Decisions

- [x] Project name: UniReg
- [x] Use PostgreSQL as the database target
- [x] Keep raw SQL as the academic source of truth
- [x] Use the same school CGPA logic as the existing CGPA calculator
- [x] Confirm backend should use one of the suggested languages
- [x] Choose Python FastAPI as backend framework
- [x] **Live data mode:** frontend reads PostgreSQL through FastAPI (`NEXT_PUBLIC_DATA_SOURCE=api`)
- [ ] Confirm whether the first deadline is an internal Monday checkpoint or final demo requirement

## Database

- [x] Draft corrected ERD structure
- [ ] Review ERD with Batul
- [x] Write normalized schema plan
- [x] Write `CREATE TABLE` SQL
- [x] Add seed data
- [x] Add transcript and GPA views
- [x] Add GPA/CGPA functions
- [x] Add result/grade trigger
- [x] Add transaction examples
- [x] Add sample queries for presentation

## Application

- [x] Avoid Next.js API routes as the backend
- [x] Choose final Python backend framework
- [x] Scaffold project
- [x] Install frontend dependencies
- [x] Install backend dependencies
- [x] Verify frontend typecheck, lint, and production build
- [x] Verify backend health test and lint
- [x] Add FastAPI read endpoints against PostgreSQL
- [x] Smoke test backend endpoints against seeded PostgreSQL data
- [x] Add demo seed users in SQL seed data
- [x] Implement FastAPI auth and role enforcement
- [x] Document backend API contract and route counts
- [x] Add frontend API client, JWT session, and TanStack Query provider
- [x] Wire portal views to live API (admin lists, admin CRUD dialogs, student register/drop/results/transcript, lecturer courses + result upload, audit logs)
- [x] Add backend mutation endpoints (registration, result upload, admin setup)
- [x] Add mobile card views for dense student/lecturer tables
- [x] Add `QueryState` + layout-matching skeletons on query-driven screens
- [x] Wire **student dashboard** to live API (`GET /api/students/me/dashboard`)
- [x] Admin create student/lecturer now creates login `user_account` (default password `demo1234`)
- [x] Department list returns live active student counts
- [x] Admin **grade scale** read-only screen
- [x] Admin **result oversight** (view + edit scores for any offering)
- [ ] Rehearse full demo script end-to-end on local PostgreSQL (`docs/delivery/demo-script.md`)
- [ ] Batul reads defense guide and completes one supervised rehearsal

### Mock fallback (not migrated away)

- [x] `frontend/content/mock/` kept for offline UI when `NEXT_PUBLIC_DATA_SOURCE≠api`
- [x] No requirement to remove mock data; live PostgreSQL is the presentation path

## Delivery

- [ ] Demo script
- [ ] PowerPoint outline
- [ ] Report outline
- [ ] Screenshots
- [ ] Appendix SQL snippets
