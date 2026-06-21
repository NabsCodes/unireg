# UniReg Cheat Sheet (print this)

## 30-second opening

> UniReg is a university course registration and result system. Admin sets up academic records. Students register for courses using rules enforced by a PostgreSQL function. Lecturers upload CA and exam scores; triggers compute grades and audit logs. Students see GPA, CGPA, and transcript from database views. This demonstrates normalization, constraints, functions, triggers, views, and transactions in one working system.

---

## Logins

| Role | Login | Password |
| --- | --- | --- |
| Admin | `admin@unireg.test` | `demo1234` |
| Student | `A00025332` | `demo1234` |
| Lecturer | `gabriel.ayem@unireg.test` | `demo1234` |

---

## Demo order (16 steps)

1. Login **Admin**
2. `/admin/dashboard` — counts
3. `/admin/departments` — mention student count
4. Quick glance: students, lecturers, courses
5. `/admin/academic` — session + semester
6. `/admin/offerings` — course + lecturer assignment
7. Logout → Login **Student**
8. `/student/dashboard` — GPA summary
9. `/student/registration` — register or drop (if safe)
10. Logout → Login **Lecturer**
11. `/lecturer/results` — pick offering, enter CA + exam
12. Logout → Login **Student**
13. `/student/results` — see new grade
14. `/student/transcript` — GPA / CGPA
15. Logout → Login **Admin**
16. `/admin/audit-logs` → then show SQL files

---

## Two hero moments (memorize these)

### Registration

```text
Student clicks Register
→ POST /api/students/me/registrations
→ PostgreSQL register_course()
→ checks: active student, open offering, capacity, no duplicate
```

**Say:** Rules are in the database function, not only the UI.

### Result upload

```text
Lecturer saves CA + exam
→ POST /api/lecturers/me/results
→ PostgreSQL upload_result()
→ trigger: grade + grade point
→ trigger: audit_log row
```

**Say:** Grades and audit trail are automatic in the database.

---

## Screen → table map

| Screen | Main tables |
| --- | --- |
| Departments | `department` |
| Students | `student`, `user_account` |
| Lecturers | `lecturer`, `user_account` |
| Courses | `course` |
| Academic setup | `academic_session`, `semester` |
| Offerings | `course_offering`, `course_assignment` |
| Registration | `course_registration` |
| Results | `result` |
| Transcript | view: `student_transcript_view` |
| Admin dashboard | view: `admin_dashboard_summary_view` |
| Audit logs | `audit_log` |

---

## Database concepts → file

| Concept | File |
| --- | --- |
| ER / schema | `database/01_schema.sql`, `docs/database/er-diagram.md` |
| Normalization | `docs/database/normalization.md` |
| Views | `database/03_views.sql` |
| Functions | `database/04_functions.sql` |
| Triggers | `database/05_triggers.sql` |
| Transactions | `database/06_transactions.sql` |
| Sample queries | `database/07_sample_queries.sql` |
| Auth | `user_account` + JWT in backend |

---

## Skip unless asked

- Grade scale admin screen (`/admin/grade-scale`) — built as read-only; optional to demo (data also lives in `grade_scale` table)
- Every line of frontend code
- Mock/demo-data mode (presentation uses live PostgreSQL)
