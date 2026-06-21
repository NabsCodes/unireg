# Course Registration Feature Spec

## Purpose

Course registration records which students enrolled in which course offerings during a semester. This is a core ERP workflow for UniReg.

## Where it lives in the app

| Layer | Location |
| --- | --- |
| UI | `/student/registration` (sidebar: **Course Registration**) |
| Entry | Student dashboard → **Register for courses** button |
| API | `POST /api/students/me/registrations` |
| SQL | `register_course()` in `database/04_functions.sql` |

## Rules

- A student can register for a course offering only once (reactivates if previously dropped).
- Only **open** offerings in the **current session** are listed.
- Capacity is enforced in the database function.
- Drop is allowed only when **no result** exists for that registration.
- UI shows **Your status** separately from **Offering status** (open/closed).

## Data Flow

```text
STUDENT
  -> COURSE_REGISTRATION
  -> COURSE_OFFERING
  -> COURSE
  -> SEMESTER
  -> ACADEMIC_SESSION
```

## Checklist

- [x] Available course query with registration state
- [x] Registration via stored function + transaction
- [x] Duplicate registration prevention
- [x] Drop rules when results exist
- [x] Student registration screen in portal
