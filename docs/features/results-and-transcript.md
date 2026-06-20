# Results And Transcript Feature Spec

## Purpose

Results and transcript generation demonstrate the main database value of UniReg.

## Rules

- A result must belong to an existing registration.
- Total score should be derived from CA and exam score.
- Grade and grade point should come from `GRADE_SCALE`.
- GPA should use `SUM(grade_point * credit_units) / SUM(credit_units)`.
- CGPA should use the same formula across all completed results for the student.

## Data Flow

```text
RESULT
  -> COURSE_REGISTRATION
  -> COURSE_OFFERING
  -> COURSE
  -> GRADE_SCALE
```

## Transcript Contents

- Student biodata
- Department
- Academic session
- Semester
- Course code
- Course title
- Credit units
- Score
- Grade
- Grade point
- Semester GPA
- CGPA

## Checklist

- [ ] Result table constraints
- [ ] Grade trigger
- [ ] GPA function
- [ ] CGPA function
- [ ] Transcript view
- [ ] Printable transcript page

