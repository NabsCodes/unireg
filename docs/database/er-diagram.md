# ER Diagram

This is the current source-of-truth ERD direction for UniReg.

```mermaid
erDiagram
    DEPARTMENT {
        int dept_id PK
        varchar dept_name
        varchar faculty
        int hod_id FK "nullable"
    }

    STUDENT {
        int student_id PK
        varchar matric_no
        varchar first_name
        varchar last_name
        varchar email
        varchar level
        int dept_id FK
        varchar status
    }

    LECTURER {
        int lecturer_id PK
        varchar staff_no
        varchar first_name
        varchar last_name
        varchar email
        varchar title
        int dept_id FK
    }

    USER_ACCOUNT {
        int user_id PK
        varchar email
        varchar password_hash
        varchar role
        int student_id FK "nullable"
        int lecturer_id FK "nullable"
    }

    ACADEMIC_SESSION {
        int session_id PK
        varchar session_name
        date start_date
        date end_date
        boolean is_current
    }

    SEMESTER {
        int semester_id PK
        int session_id FK
        varchar semester_name
        date start_date
        date end_date
    }

    COURSE {
        int course_id PK
        varchar course_code
        varchar course_title
        int credit_units
        varchar level
        int dept_id FK
    }

    COURSE_OFFERING {
        int offering_id PK
        int course_id FK
        int semester_id FK
        int max_capacity
        varchar status
    }

    COURSE_ASSIGNMENT {
        int assignment_id PK
        int offering_id FK
        int lecturer_id FK
    }

    COURSE_REGISTRATION {
        int reg_id PK
        int student_id FK
        int offering_id FK
        date reg_date
        varchar status
    }

    RESULT {
        int result_id PK
        int reg_id FK
        numeric ca_score
        numeric exam_score
        numeric total_score
        varchar grade FK
        numeric grade_point
    }

    GRADE_SCALE {
        varchar grade PK
        numeric min_score
        numeric max_score
        numeric grade_point
        varchar remark
    }

    AUDIT_LOG {
        int log_id PK
        int user_id FK
        varchar action
        varchar table_name
        int record_id
        timestamp created_at
    }

    DEPARTMENT ||--o{ STUDENT : enrolls
    DEPARTMENT ||--o{ LECTURER : employs
    DEPARTMENT ||--o{ COURSE : owns
    DEPARTMENT |o--o| LECTURER : headed_by
    ACADEMIC_SESSION ||--|{ SEMESTER : has
    SEMESTER ||--o{ COURSE_OFFERING : schedules
    COURSE ||--o{ COURSE_OFFERING : offered_as
    COURSE_OFFERING ||--o{ COURSE_ASSIGNMENT : assigned
    LECTURER ||--o{ COURSE_ASSIGNMENT : teaches
    STUDENT ||--o{ COURSE_REGISTRATION : registers
    COURSE_OFFERING ||--o{ COURSE_REGISTRATION : receives
    COURSE_REGISTRATION ||--o| RESULT : produces
    GRADE_SCALE ||--o{ RESULT : classifies
    USER_ACCOUNT |o--o| STUDENT : authenticates
    USER_ACCOUNT |o--o| LECTURER : authenticates
    USER_ACCOUNT ||--o{ AUDIT_LOG : generates
```

## Important Design Notes

- `RESULT` links to `COURSE_REGISTRATION`, not directly to `STUDENT` and `COURSE`. This enforces that a result can only exist for a course the student registered.
- `ACADEMIC_SESSION` stores academic years such as `2025/2026`; `SEMESTER` stores periods inside a session.
- `COURSE_OFFERING` is the actual registerable unit: one course in one semester.
- `USER_ACCOUNT` avoids a polymorphic `reference_id`. Student and lecturer links are nullable foreign keys so SQL can enforce valid references.
- `GRADE_SCALE` stores grade thresholds and grade points, allowing GPA logic to be data-driven.
- `DEPARTMENT.hod_id` points to `LECTURER`. It should be nullable during setup, then updated after lecturers exist.
- `AUDIT_LOG` can be populated by triggers when sensitive records such as results are inserted or updated.

