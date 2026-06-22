# Admin Feature Spec

## Purpose

Admin manages the academic setup data, inspects system summaries, and applies **registry corrections** to results when required. Admin does **not** replace lecturers as the primary score entry path.

## Core Screens

- Dashboard
- Departments
- Students
- Lecturers
- Courses
- Academic sessions
- Semesters
- Course offerings
- Grade scale (read-only)
- **Result corrections** (registry override — exceptions only)
- Audit logs

## Grading roles (matches typical university ERP practice)

| Role | Primary responsibility |
| --- | --- |
| **Lecturer** | Upload and edit CA/exam scores for **assigned** offerings (`/lecturer/results`) |
| **Admin / registry** | Review records; apply **audited corrections** when a score is wrong, missing after lecturer deadline, or disputed (`/admin/results`) |
| **Student** | View published results and transcript only |

Both lecturer upload and registry correction call the same PostgreSQL `upload_result()` function. Audit logs record who changed what.

## Required Data Operations

- Create and update departments.
- Create and update students (matric numbers assigned automatically).
- Create and update lecturers (staff numbers assigned automatically).
- Create courses.
- Create academic sessions and semesters.
- Offer courses in a semester.
- Assign lecturers to course offerings.
- View grade scale.
- Correct student scores on any offering (registry path — not day-to-day grading).

## Checklist

- [x] Dashboard summary defined
- [x] Department management defined
- [x] Student management defined
- [x] Lecturer management defined
- [x] Course management defined
- [x] Course offering management defined
- [x] Result corrections vs lecturer upload documented
- [ ] Admin access rules defined
