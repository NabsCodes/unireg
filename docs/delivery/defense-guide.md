# Defense Guide for Batul

**Read this like a lesson, not a manual.**

The team built UniReg with Nabeel’s guidance on the stack and integration. Your job in the presentation is to **explain why it exists** and **how the database makes it trustworthy**. Think of yourself as the person who understands the *story*, not every line of code.

---

## Part 0 — What is UniReg? (2 minutes)

### Simple definition

UniReg is a **mini university ERP** for three jobs:

1. **Admin** — set up departments, people, courses, sessions, and offerings  
2. **Student** — register for courses and view results/transcript  
3. **Lecturer** — upload CA and exam scores for assigned courses  

The **brain** of the system is **PostgreSQL**. The website is the friendly face; the database is the proof for CSC 384.

### The three-layer story (use this whenever you get stuck)

Every feature follows the same pattern:

```text
LAYER 1 — SCREEN     What the user clicks and sees
LAYER 2 — API        Who is allowed + which action (FastAPI + JWT)
LAYER 3 — DATABASE   Tables, functions, views, triggers (PostgreSQL)
```

**Teacher note:** Examiners care most about Layer 3. Always connect a screen back to a table, function, or view.

### Your opening (practice out loud)

> “UniReg helps a university manage course registration and results. Admin creates the academic setup. Students register through database-enforced rules. Lecturers upload scores, and PostgreSQL automatically calculates grades, GPA, CGPA, and audit logs. Our main contribution is a normalized relational design with views, functions, triggers, and transactions — shown through a working portal.”

---

## Part 1 — Login (who goes where)

### Screen wireframe

**URL:** `/login`

```text
┌─────────────────────────────────────────┐
│  UniReg                                 │
│  University Course Registration System  │
│                                         │
│  Email / Matric No / Staff No           │
│  [________________________________]     │
│                                         │
│  Password                               │
│  [________________________________]     │
│                                         │
│  [ Sign in ]                            │
└─────────────────────────────────────────┘
```

### What happens behind the scenes

```text
User types login + password
    ↓
Frontend sends to FastAPI /api/auth/login
    ↓
Backend checks user_account table (email, password hash, role)
    ↓
Backend returns JWT token (like a temporary ID badge)
    ↓
Frontend stores token and opens the correct portal:
    admin    → /admin/dashboard
    student  → /student/dashboard
    lecturer → /lecturer/dashboard
```

### Tables involved

- `user_account` — login email, password hash, role (`admin` | `student` | `lecturer`)
- Links to `student` or `lecturer` row when role is not admin

### What to say if asked

> “We use role-based access control. Each role sees a different portal, and protected API routes check the JWT role before running any action.”

### Common mistake to avoid

Do **not** say “the frontend decides security.” Say **“the backend checks role on every protected route.”**

---

## Part 2 — Admin portal (building the world)

Admin work happens **first**. Students and lecturers only work because admin created the master data.

### App map (admin sidebar)

```text
Admin Portal
├── Dashboard          /admin/dashboard
├── Departments        /admin/departments
├── Students           /admin/students
├── Lecturers          /admin/lecturers
├── Courses            /admin/courses
├── Academic Setup     /admin/academic      (sessions + semesters)
├── Offerings          /admin/offerings
├── Result Corrections /admin/results     (registry exceptions — not primary grading)
├── Grade Scale        /admin/grade-scale
└── Audit Logs         /admin/audit-logs
```

---

### 2.1 Admin Dashboard

**URL:** `/admin/dashboard`

```text
┌────────────┬──────────────────────────────────────────────┐
│  Sidebar   │  [Students] [Courses] [Registrations] [...]  │
│            │                                              │
│            │  Recent Activity (audit events)              │
└────────────┴──────────────────────────────────────────────┘
```

**What it shows:** summary counts (active students, courses, registrations, results uploaded)

**Database proof:** view `admin_dashboard_summary_view` in `database/03_views.sql`

**Say:**

> “Dashboard numbers come from a SQL view, so they always match the live database.”

---

### 2.2 Departments

**URL:** `/admin/departments`

```text
[ Add Department ]  [ Edit ]

| Department        | Faculty              | HOD           | Students |
|-------------------|----------------------|---------------|----------|
| Computer Science  | School of IT...      | Dr. Gabriel   | 2        |
```

**Table:** `department`

**Concept — Normalization:**

Department name is stored **once**. Student rows only store `dept_id` (foreign key), not the full department name repeated everywhere.

**Say:**

> “This is 3NF-style design: department is its own entity; students reference it by ID.”

---

### 2.3 Students & Lecturers

**URLs:** `/admin/students`, `/admin/lecturers`

When admin **creates** a student or lecturer, the system also creates a **login account** in `user_account` (default password `demo1234` for demo).

**Tables:**

- `student` or `lecturer` — academic/profile record  
- `user_account` — login credentials linked to that record  

**Say:**

> “We separate the academic record from the login account, but link them with foreign keys so each student can sign in as themselves.”

---

### 2.4 Courses

**URL:** `/admin/courses`

**Table:** `course` (code, title, credit units, level, department)

**Say:**

> “Course definitions are reusable. The same CSC384 course can be offered in different semesters through course offerings.”

---

### 2.5 Academic Setup (sessions & semesters)

**URL:** `/admin/academic`

```text
Sessions
  2025/2026  (current)

Semesters
  First Semester
  Second Semester
```

**Tables:**

- `academic_session` — e.g. 2025/2026  
- `semester` — First / Second semester **inside** a session  

**Say:**

> “One session has many semesters. This avoids duplicating session data on every semester row.”

---

### 2.6 Course Offerings (very important)

**URL:** `/admin/offerings`

```text
Course: CSC384 Database Systems
Session: 2025/2026
Semester: First Semester
Capacity: 80
Status: open
Assigned lecturer: Dr. Gabriel Ayem
```

**Tables:**

- `course_offering` — this course, this semester, this capacity, open/closed  
- `course_assignment` — which lecturer teaches this offering  

**Say:**

> “An offering is an instance of a course in a specific semester. Registration happens against the offering, not the abstract course catalog entry.”

**Teacher note:** Many students confuse `course` vs `course_offering`.  
- **Course** = “Database Systems exists”  
- **Offering** = “Database Systems is running this semester with 80 seats”  

---

## Part 3 — Student portal (using the system)

### App map (student sidebar)

```text
Student Portal
├── Dashboard       /student/dashboard
├── Registration    /student/registration
├── Results         /student/results
└── Transcript      /student/transcript
```

---

### 3.1 Student Dashboard

**URL:** `/student/dashboard`

```text
Registered Courses: 3
Semester GPA: 3.5
CGPA: 3.5

Registration Status:
  CSC384 · Database Systems · Registered
  CSC302 · Operating Systems · Registered
```

**Say:**

> “This is a live summary from the API — registrations and GPA/CGPA from the database, not static demo numbers.”

---

### 3.2 Course Registration ⭐ (strongest defense moment)

**URL:** `/student/registration`

The table shows **two different statuses** — do not mix them up:

| Column | Meaning |
| --- | --- |
| **Your status** | Your relationship to this course (not registered, registered, results published, dropped) |
| **Offering status** | Whether the university still accepts new registrations (open / closed) |

```text
Course        │ Your status        │ Offering status │ Action
──────────────┼────────────────────┼─────────────────┼──────────────
CSC384        │ Results published  │ Open            │ (no Drop — locked)
MTH201        │ Registered         │ Open            │ [Drop]
CSC305        │ Not registered     │ Open            │ [Register]
```

**When student clicks Register:**

```text
Screen: Register button
   ↓
API: POST /api/students/me/registrations  (JWT must be student)
   ↓
SQL:  register_course(student_id, offering_id)   ← in 04_functions.sql
   ↓
Database checks:
  ✓ student status is active
  ✓ offering status is open
  ✓ seats available (capacity)
  ✓ not already registered (unique constraint + function logic)
```

**Table:** `course_registration` (links student ↔ offering)

**Say (memorize):**

> “Course registration is handled by a stored database function. Important rules are enforced at the database level, not only in the frontend. That is exactly what a database systems project should demonstrate.”

**Drop rule:**

> “A student can drop a course only if no result has been uploaded yet. The UI shows ‘Results published’ and hides the Drop button so students are not confused — the same rule still exists in PostgreSQL even if someone bypassed the screen.”

---

### 3.3 Results

**URL:** `/student/results`

Shows per-course: CA, Exam, Total, Grade, Grade Point

**Comes from:** joins between registration, result, course, semester (see views)

---

### 3.4 Transcript ⭐ (second strongest view moment)

**URL:** `/student/transcript`

```text
Session | Semester | Course | Grade | Semester GPA | CGPA
```

**Database proof:** `student_transcript_view` in `database/03_views.sql`

**Say:**

> “The transcript is not typed manually. It is generated from a database view that joins registrations, results, courses, and credit units, and computes semester GPA and CGPA.”

**Teacher note:** GPA/CGPA use **credit-weighted** grade points — mention “weighted by credit units” if asked.

---

## Part 4 — Lecturer portal (entering results)

### App map

```text
Lecturer Portal
├── Dashboard       /lecturer/dashboard
├── Assigned Courses /lecturer/courses
└── Result Upload   /lecturer/results
```

---

### 4.1 Result Upload ⭐ (hero moment #2)

**URL:** `/lecturer/results`

```text
Select offering: [ CSC384 - First Semester ▼ ]

| Matric    | Student name | CA (/40) | Exam (/60) | Status   |
|-----------|--------------|----------|------------|----------|
| A00025332 | Batul Hassan | 28       | 55         | Uploaded |
| A00024575 | Simtong ...  |          |            | Pending  |
```

**When lecturer saves:**

```text
Screen: Save scores
   ↓
API: POST /api/lecturers/me/results
     (backend verifies lecturer is assigned to this offering)
   ↓
SQL: upload_result(reg_id, ca_score, exam_score, user_id)
   ↓
Trigger: compute total, grade, grade_point from grade_scale
   ↓
Trigger: insert row into audit_log
```

**Tables:** `result`, `grade_scale`, `audit_log`

**Say:**

> “Lecturers can only upload for courses assigned to them. Grade and grade point are computed by a trigger using the grade scale table. Every insert or update is audited automatically.”

---

### 2.x Result corrections (registry — optional demo)

**URL:** `/admin/results`

Use this screen **after** explaining lecturer upload — not as the main grading story.

**Say:**

> “In most university systems, lecturers enter marks and the registry maintains the official record. UniReg follows that: lecturers upload on their portal. Admin **Result Corrections** is for exceptions — a wrong score, a missing entry, or a post-release fix. It calls the same `upload_result()` function and still writes to audit logs.”

---

## Part 5 — Admin audit (closing the loop)

**URL:** `/admin/audit-logs`

```text
| Actor        | Action | Table  | When        |
|--------------|--------|--------|-------------|
| Dr. Gabriel  | INSERT | result | 2026-06-20  |
```

**Say:**

> “Audit logging improves accountability and security. When results change, a database trigger records who did what — we do not rely on someone remembering to log manually.”

---

## Part 6 — Database concepts (examiner map)

Use this table if they ask “where is X in your project?”

| Course concept | Where in UniReg | File to open |
| --- | --- | --- |
| ER modeling | Entities + relationships | `docs/database/er-diagram.md` |
| Normalization | Separate tables, no duplication | `docs/database/normalization.md` |
| CREATE TABLE | Full schema | `database/01_schema.sql` |
| Primary / Foreign keys | All tables | `database/01_schema.sql` |
| Unique constraints | matric_no, email, registration pairs | `database/01_schema.sql` |
| CHECK constraints | scores 0–100, roles, status | `database/01_schema.sql` |
| Views | Transcript, dashboard | `database/03_views.sql` |
| Functions | register, upload, GPA/CGPA | `database/04_functions.sql` |
| Triggers | grade + audit + updated_at | `database/05_triggers.sql` |
| Transactions | Safe registration / rollback demo | `database/06_transactions.sql` |
| Sample queries | Report appendix | `database/07_sample_queries.sql` |
| Authentication | user_account + JWT | `database/02_seed.sql`, backend auth |

Full checklist: `docs/database/sql-features-checklist.md`

---

## Part 7 — How to talk about your contribution

Even if you did not write every line of code, you can defend:

1. **Problem understanding** — universities need registration + results + GPA without data chaos  
2. **Design choices** — normalized schema, offerings vs courses, role separation  
3. **Database features** — functions and triggers for rules that must never be bypassed  
4. **Demo narrative** — you can walk through admin → student → lecturer → transcript → audit  
5. **Limitations** — no fees, hostel, timetable (see presentation outline)  

**Say honestly:**

> “This is a capstone focused on database design. The portal demonstrates that our SQL design works end-to-end with real constraints and automation.”

---

## Part 8 — Questions you might get (and short answers)

**Q: Can admin enter every student's scores?**
A: Technically yes, through **Result Corrections**, but that is the registry exception path — like real ERPs where the records office fixes errors. Day-to-day entry is the lecturer's job on **Upload Results**.

**Q: Why PostgreSQL functions instead of only Python?**  
A: So business rules stay in the database layer where they cannot be skipped by a buggy client.

**Q: Why views for transcript?**  
A: Transcript is a read model built from many joined tables. A view keeps that logic in SQL and always stays current.

**Q: What stops a lecturer uploading for another lecturer’s course?**  
A: API checks assignment; database ties results to registrations on specific offerings.

**Q: What stops duplicate registration?**  
A: Unique constraints plus `register_course()` logic.

**Q: Where is normalization?**  
A: Departments, courses, sessions, and semesters are separate; facts are not repeated unnecessarily.

**Q: What if the website is down?**  
A: The schema, functions, and queries still prove the database design — the app is the demonstration layer.

---

## Part 9 — Rehearsal plan for you

### Day 1 (45 min)

1. Read this guide once  
2. Read `cheat-sheet.md`  
3. Run the app and click every sidebar link — no script, just explore  

### Day 2 (45 min)

1. Follow `demo-script.md` exactly  
2. Pause after registration and result upload — open the matching SQL file  
3. Say your opening out loud twice  

### Day 3 (30 min)

1. Demo without reading the script (cheat sheet only)  
2. Nabeel plays examiner and asks 3 questions from Part 8  

---

## Part 10 — What success looks like

You do **not** need to sound like a senior developer.

You **do** need to:

- Walk through the demo without getting lost  
- Name the right **table / function / view** for registration and results  
- Sound confident that **the database is the main academic evidence**  
- Have SQL files ready if the live demo hiccups  

You’ve got this. The system is built — now you’re learning to **tell its story**.
