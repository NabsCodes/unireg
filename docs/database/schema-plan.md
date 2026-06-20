# Schema Plan

This file describes the planned tables before the final `CREATE TABLE` SQL is written.

## DEPARTMENT

Stores academic departments.

Key fields:

- `dept_id`
- `dept_name`
- `faculty`
- `hod_id`

Important constraints:

- Unique department name.
- `hod_id` nullable foreign key to `LECTURER`.

## STUDENT

Stores student biodata and department membership.

Important constraints:

- Unique `matric_no`.
- Unique `email`.
- Foreign key to `DEPARTMENT`.

## LECTURER

Stores lecturer biodata and department membership.

Important constraints:

- Unique `staff_no`.
- Unique `email`.
- Foreign key to `DEPARTMENT`.

## USER_ACCOUNT

Stores login credentials and role ownership.

Important constraints:

- Unique `email`.
- `role` limited to `admin`, `lecturer`, or `student`.
- Student users should have `student_id`.
- Lecturer users should have `lecturer_id`.
- Admin users may have neither.

## ACADEMIC_SESSION

Stores academic years such as `2025/2026`.

Important constraints:

- Unique `session_name`.
- Only one session should be current.

## SEMESTER

Stores semesters inside an academic session.

Important constraints:

- Foreign key to `ACADEMIC_SESSION`.
- Unique semester name per session.

## COURSE

Stores the course catalog.

Important constraints:

- Unique `course_code`.
- Credit units must be positive.
- Foreign key to `DEPARTMENT`.

## COURSE_OFFERING

Stores the actual course availability for a semester.

Important constraints:

- Foreign key to `COURSE`.
- Foreign key to `SEMESTER`.
- Unique course per semester.
- Capacity must be positive.

## COURSE_ASSIGNMENT

Assigns lecturers to course offerings.

Important constraints:

- Foreign key to `COURSE_OFFERING`.
- Foreign key to `LECTURER`.
- Unique lecturer per offering.

## COURSE_REGISTRATION

Stores student registration for course offerings.

Important constraints:

- Foreign key to `STUDENT`.
- Foreign key to `COURSE_OFFERING`.
- Unique student per offering.
- Registration status limited to approved values.

## RESULT

Stores scores and grade outcome for a registration.

Important constraints:

- Foreign key to `COURSE_REGISTRATION`.
- One result per registration.
- CA, exam, and total scores must stay within valid ranges.
- Grade references `GRADE_SCALE`.

## GRADE_SCALE

Stores grade thresholds and grade points.

Important constraints:

- Grade is the primary key.
- Score ranges should not overlap.
- Grade point must be valid for the school scale.

## AUDIT_LOG

Stores sensitive actions such as result insert and update.

Important constraints:

- Foreign key to `USER_ACCOUNT` where available.
- Action, table name, record id, and timestamp are required.

