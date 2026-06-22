# Backend API Contract

This document is the route contract between the Next.js frontend and the FastAPI
backend. It covers the school ERP slices needed for the CSC 384 database project
without expanding into fees, admissions, hostels, attendance, timetable
generation, or notifications.

## Route Count

Current backend surface: **37 operations**.

| Method | Count | Purpose |
| --- | ---: | --- |
| `GET` | 21 | Dashboards, lists, transcripts, rosters, audit logs |
| `POST` | 10 | Login, create setup data, register course, upload result |
| `PATCH` | 5 | Edit setup data and course offerings |
| `DELETE` | 1 | Drop a student course registration |

## Auth

| Method | Route | User | Purpose |
| --- | --- | --- | --- |
| `POST` | `/api/auth/login` | Public | Login with email, matric number, or staff number |
| `GET` | `/api/auth/me` | Any authenticated user | Return the current user and role context |

Auth response returns a JWT. Frontend sends it as:

```text
Authorization: Bearer <token>
```

## Admin Routes

| Method | Route | Purpose |
| --- | --- | --- |
| `GET` | `/api/admin/dashboard` | Summary counts for admin dashboard |
| `GET` | `/api/admin/departments` | List departments with HOD names |
| `POST` | `/api/admin/departments` | Create department |
| `PATCH` | `/api/admin/departments/{dept_id}` | Edit department or HOD |
| `GET` | `/api/admin/students` | List student records |
| `POST` | `/api/admin/students` | Create student record |
| `PATCH` | `/api/admin/students/{student_id}` | Edit student record/status |
| `GET` | `/api/admin/lecturers` | List lecturer records |
| `POST` | `/api/admin/lecturers` | Create lecturer record |
| `PATCH` | `/api/admin/lecturers/{lecturer_id}` | Edit lecturer record |
| `GET` | `/api/admin/courses` | List courses |
| `POST` | `/api/admin/courses` | Create course |
| `PATCH` | `/api/admin/courses/{course_id}` | Edit course |
| `GET` | `/api/admin/sessions` | List academic sessions |
| `POST` | `/api/admin/sessions` | Create academic session |
| `GET` | `/api/admin/semesters` | List semesters |
| `POST` | `/api/admin/semesters` | Create semester |
| `GET` | `/api/admin/offerings` | List course offerings and assigned lecturers |
| `POST` | `/api/admin/offerings` | Offer a course for a semester and assign lecturers |
| `PATCH` | `/api/admin/offerings/{offering_id}` | Edit capacity/status/lecturer assignments |
| `GET` | `/api/admin/results?offering_id=1` | Result roster for an offering (registry review) |
| `POST` | `/api/admin/results` | Apply registry correction to CA/exam scores (same `upload_result()` as lecturer) |
| `GET` | `/api/admin/grade-scale` | Show 4.0 grading table |
| `GET` | `/api/admin/audit-logs` | Review result insert/update audit logs |

## Student Routes

| Method | Route | Purpose |
| --- | --- | --- |
| `GET` | `/api/students/me/dashboard` | Current student's session summary, registrations, GPA/CGPA |
| `GET` | `/api/students/me/course-offerings` | List current open offerings with registration state |
| `POST` | `/api/students/me/registrations` | Register current student for an offering |
| `DELETE` | `/api/students/me/registrations/{offering_id}` | Drop a registration before result upload |
| `GET` | `/api/students/me/results` | Current student's published results |
| `GET` | `/api/students/me/transcript` | Current student's generated transcript |
| `GET` | `/api/students/{matric_no}/results` | Legacy/demo result lookup |
| `GET` | `/api/students/{matric_no}/transcript` | Legacy/demo transcript lookup |

## Lecturer Routes

| Method | Route | Purpose |
| --- | --- | --- |
| `GET` | `/api/lecturers/me/courses` | Current lecturer's assigned courses |
| `GET` | `/api/lecturers/me/result-roster?offering_id=1` | Registered students for a lecturer's offering |
| `POST` | `/api/lecturers/me/results` | Upload/update CA and exam scores |
| `GET` | `/api/lecturers/{staff_no}/courses` | Legacy/demo assigned-course lookup |

## Academic/Public Routes

| Method | Route | Purpose |
| --- | --- | --- |
| `GET` | `/api/academic/course-offerings` | Public/current open course offerings |
| `GET` | `/health` | Backend health check |

## Mental Wireframe Needed From The API

### Login

- Identifier accepts email, matric number, or staff number.
- Password field.
- On success, store JWT and route by `user.role`.

### Admin

- Dashboard: counts and recent audit activity.
- Departments: table plus create/edit dialog.
- Students: table plus create/edit dialog plus status control.
- Lecturers: table plus create/edit dialog.
- Courses: table plus create/edit dialog.
- Offerings: table plus create/edit dialog for course, semester, capacity,
  status, assigned lecturers.
- Grade Scale: read-only table showing the 4.0 system.
- Result Corrections: choose offering, review lecturer-uploaded scores, apply registry corrections when required (not primary grade entry).
- Audit Logs: read-only table showing result insert/update changes.

### Student

- Dashboard: current semester summary and GPA/CGPA.
- Registration: available offerings, registered state, register/drop actions.
- Results: published results table.
- Transcript: generated transcript from database view, with print/export UI.

### Lecturer

- Dashboard: assigned courses and pending uploads.
- Assigned Courses: course offering table.
- Result Upload: choose offering, see roster, edit CA/exam scores, upload.

## Excluded On Purpose

These are normal ERP modules but outside this capstone's useful scope:

- school fees/payment
- admissions
- hostel allocation
- timetable generation
- attendance
- messaging/email
- library
- staff payroll

They can be mentioned as future work, but they should not distract from the
database concepts being graded.

## Frontend Wiring Status

With `NEXT_PUBLIC_DATA_SOURCE=api`, these screens read **live PostgreSQL data** through FastAPI:

| Area | Live API | Notes |
| --- | --- | --- |
| Login + JWT session | Yes | Routes by role after `POST /api/auth/login` |
| Admin dashboard, lists, CRUD dialogs | Yes | Includes sessions/semesters create, offerings edit |
| Admin audit logs | Yes | Actor names joined in backend |
| Student registration (register/drop) | Yes | Confirm dialogs + SQL-owned rules |
| Student results + transcript | Yes | Includes export/print UI |
| Lecturer courses + result upload | Yes | Offering selector + CA/exam upload |
| Student dashboard | Yes | Live summary via `GET /api/students/me/dashboard` |

Mock mode (`NEXT_PUBLIC_DATA_SOURCE` not `api`) still serves `content/mock/` through the same `lib/api/` functions for offline UI work.
