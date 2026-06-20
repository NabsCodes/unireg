# Course Registration Feature Spec

## Purpose

Course registration records which students enrolled in which course offerings during a semester.

## Rules

- A student can register for a course offering only once.
- A student should only register courses available in the current semester.
- Total credit units should be visible before submission.
- Registration should use a transaction so partial failures do not leave broken records.

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

- [ ] Available course query
- [ ] Registration insert transaction
- [ ] Duplicate registration prevention
- [ ] Credit unit summary
- [ ] Registration status rules

