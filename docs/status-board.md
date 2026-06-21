# Status Board

## Decisions

- [x] Project name: UniReg
- [x] Use PostgreSQL as the database target
- [x] Keep raw SQL as the academic source of truth
- [x] Use the same school CGPA logic as the existing CGPA calculator
- [x] Confirm backend should use one of the suggested languages
- [x] Choose Python FastAPI as backend framework
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
- [x] Add initial read-only FastAPI endpoints
- [x] Smoke test backend endpoints against seeded PostgreSQL data
- [x] Build static admin setup/list screens with demo data
- [x] Build static student course registration screen with demo data
- [x] Build static lecturer result upload screen with demo data
- [x] Build static student results and transcript screens with demo data
- [x] Add demo seed users in SQL seed data
- [x] Implement FastAPI auth and role enforcement
- [x] Document backend API contract and route counts
- [x] Add frontend API client and TanStack Query provider
- [ ] Finish token-aware frontend API wiring to FastAPI `me` endpoints
- [x] Add backend mutation endpoints for course registration and result upload
- [x] Add admin setup create/edit endpoints
- [ ] Wire frontend registration/result upload mutations
- [x] Add mobile card views for dense student/lecturer tables
- [ ] Run full frontend + backend demo against local PostgreSQL

## Delivery

- [ ] Demo script
- [ ] PowerPoint outline
- [ ] Report outline
- [ ] Screenshots
- [ ] Appendix SQL snippets
