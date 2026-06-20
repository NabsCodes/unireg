# Architecture

## Product Shape

UniReg has three role-based portals:

- Admin: manages setup data, student records, lecturers, courses, offerings, and system reports.
- Lecturer: views assigned course offerings and uploads results.
- Student: registers courses, views registered courses, sees results, and generates transcripts.

## Module Boundaries

```text
Authentication
  - user accounts
  - roles
  - access control

Academic Setup
  - departments
  - lecturers
  - students
  - courses
  - sessions
  - semesters

Course Registration
  - course offerings
  - student registrations
  - registration transactions

Results
  - score upload
  - grade lookup
  - GPA/CGPA computation
  - transcript views

Audit
  - result insert/update logs
  - user actions
```

## Stack Direction

The stack is confirmed around the lecturer's suggested tools while preserving
Nabeel's frontend speed.

- Frontend: Next.js, TypeScript, Tailwind CSS, shadcn/ui
- Client data: TanStack Query for API reads/mutations
- Backend: Python FastAPI
- Database: PostgreSQL
- Academic SQL: raw SQL files for schema, views, functions, triggers, and transactions

## Auth Direction

Use FastAPI-owned authentication rather than NextAuth so the backend remains
the real access-control layer for the database course deliverable.

- `POST /api/auth/login` validates `user_account.email` or student matric
  number plus password.
- Passwords are stored as hashes in `user_account.password_hash`.
- Login returns a signed JWT with `sub`, `role`, and the linked `student_id` or
  `lecturer_id` where applicable.
- Protected FastAPI dependencies enforce role access before service calls.
- The frontend stores the token for the demo and sends it with
  `Authorization: Bearer <token>`.

## Design Principle

The database owns academic truth. The app should call into the database and display results, but GPA, transcript, constraints, and audit behavior should be demonstrable through SQL.
