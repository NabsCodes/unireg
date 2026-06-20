# Normalization

## Goal

The schema should avoid duplicated academic data and keep each table responsible for one concept.

## First Normal Form

All tables use atomic columns. For example, a student does not store a list of courses in one field. Course registration records are stored in `COURSE_REGISTRATION`, one row per student and course offering.

## Second Normal Form

Tables with relationships use their own primary keys, and non-key attributes describe the whole row. For example, `COURSE_OFFERING` stores the fact that a course is offered in a semester, while `COURSE` stores the course title and credit units.

## Third Normal Form

Non-key attributes do not depend on other non-key attributes.

Examples:

- Department details are not repeated on student rows; `STUDENT.dept_id` references `DEPARTMENT`.
- Grade points are not hardcoded into every result rule; `RESULT.grade` references `GRADE_SCALE`.
- Semester belongs to an academic session, so session dates are not repeated on every registration.

## Many-to-Many Resolution

- Students and course offerings are many-to-many, resolved by `COURSE_REGISTRATION`.
- Lecturers and course offerings are many-to-many, resolved by `COURSE_ASSIGNMENT`.

## Defendable Talking Point

The system separates registration from result because a student may register for a course before any score exists. This keeps the database accurate across the full academic workflow.

