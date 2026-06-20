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

The stack is pending confirmation.

Preferred if flexible:

- Next.js
- TypeScript
- Tailwind CSS
- PostgreSQL
- Raw SQL through a PostgreSQL driver

Fallback if backend language is strict:

- Next.js frontend
- Python backend
- PostgreSQL
- Raw SQL through the backend

## Design Principle

The database owns academic truth. The app should call into the database and display results, but GPA, transcript, constraints, and audit behavior should be demonstrable through SQL.

