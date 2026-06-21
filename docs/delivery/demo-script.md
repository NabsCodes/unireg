# Demo Script (step-by-step)

**Time:** about 12–15 minutes  
**Before you start:** PostgreSQL + backend + frontend running. See [`README.md`](./README.md) checklist.

Keep [`cheat-sheet.md`](./cheat-sheet.md) open. Password for every account: **`demo1234`**

---

## Phase A — Set the stage (1 min, optional)

**Say:**

> “UniReg is a database-first university registration system. I’ll show three portals — admin, student, lecturer — and then how PostgreSQL functions, views, and triggers power the rules.”

Optional: show ERD slide or `docs/database/er-diagram.md` for 30 seconds.

---

## Phase B — Admin setup (4 min)

### Step 1 — Login as Admin

- Go to `/login`
- Email: `admin@unireg.test`
- Password: `demo1234`
- You should land on **`/admin/dashboard`**

**Say:**

> “Admin manages master academic data. Everything else depends on these records.”

---

### Step 2 — Dashboard

- Stay on **`/admin/dashboard`**
- Point at stat cards: students, courses, registrations, results

**Say:**

> “These counts come from a SQL view, not hardcoded numbers.”

---

### Step 3 — Departments

- Sidebar → **Departments** (`/admin/departments`)
- Point at **Students** column

**Say:**

> “Departments are normalized — stored once. Student count is calculated live from active students in each department.”

---

### Step 4 — Students, Lecturers, Courses (quick pass)

- **Students** (`/admin/students`) — mention matric number, department, level  
- **Lecturers** (`/admin/lecturers`) — staff number, department  
- **Courses** (`/admin/courses`) — code, credit units  

**Say:**

> “When we create a student or lecturer here, a login account is also created so they can sign in to their portal.”

*(Do not create a new record unless rehearsed — seeded data is enough.)*

---

### Step 5 — Academic Setup

- Sidebar → **Academic Setup** (`/admin/academic`)
- Point at current **session** and **semester** rows

**Say:**

> “Sessions and semesters are separate tables. Offerings and registrations belong to a specific semester in a session.”

---

### Step 6 — Course Offerings

- Sidebar → **Offerings** (`/admin/offerings`)
- Pick one row (e.g. CSC384, First Semester)
- Point at: course, semester, capacity, status, assigned lecturer

**Say:**

> “A course offering is this course running this semester with a capacity and assigned lecturer. Students register against the offering.”

---

## Phase C — Student (3 min)

### Step 7 — Logout and login as Student

- Logout (sidebar / user menu)
- `/login` → Matric: **`A00025332`** (or `batul.hassan@unireg.test`)
- Password: `demo1234`
- Land on **`/student/dashboard`**

**Say:**

> “The dashboard summarizes my registrations. To add courses I use **Course Registration** in the sidebar — or the **Register for courses** button on the dashboard.”

---

### Step 8 — Course Registration

- Sidebar → **Course Registration** (`/student/registration`)  
  *(or click **Register for courses** on the dashboard)*
- Point at two different columns:
  - **Your status** — Not registered / Registered / Results published / Dropped
  - **Offering status** — Open or Closed (whether the course accepts new registrations)

**Option A — Register:**

- Find a row with **Your status: Not registered** and **Offering status: Open**
- Click **Register** → confirm

**Option B — Drop (only when status allows it):**

- Find **Your status: Registered** with a **Drop** button visible
- Courses with **Results published** have **no Drop button** — explain this is intentional

**Say:**

> “The screen separates offering status from my registration status. Once a lecturer uploads results, the registration is locked — the UI shows ‘Results published’ instead of letting me click Drop and fail.”

> “When I register, the API calls PostgreSQL function `register_course()`. The database checks capacity, open status, and duplicate registration — not just the button on screen.”

---

### Step 9 — Results & Transcript (before lecturer upload)

- **Results** (`/student/results`) — quick glance  
- **Transcript** (`/student/transcript`) — note current GPA if visible  

**Say:**

> “Transcript rows come from a database view that joins registrations, results, and credit units.”

*(You’ll return here after lecturer upload to show change.)*

---

## Phase D — Lecturer (3 min)

### Step 10 — Logout and login as Lecturer

**For first-time upload demo (no reseed):**

- `/login` → `musa.danjuma@unireg.test` / `demo1234`

**For edit demo on existing scores:**

- `/login` → `gabriel.ayem@unireg.test` / `demo1234`

---

### Step 11 — Assigned Courses (optional)

- **`/lecturer/courses`** — read-only list of assigned offerings (no upload here)

**Say:**

> “Assigned Courses is overview only. All score entry happens on **Upload Results**.”

---

### Step 12 — Upload Results ⭐

- Sidebar → **Upload Results** (`/lecturer/results`)
- **Musa:** select **MTH201 · First Semester · pending uploads**
- **Gabriel (after reseed/patch):** select **CSC384** → **Awaiting upload** tab
- Click **Upload scores** on a **Pending** row
- Enter **CA** (0–40) and **Exam** (0–60) → save

**Say:**

> “Pending means no scores yet — that is upload. Uploaded rows show **Edit scores**. Both use `upload_result()` in PostgreSQL, which inserts or updates on conflict.”

---

## Phase E — Prove it worked (3 min)

### Step 13 — Student again

- Logout → Login as **`A00025332`**
- **Results** — show updated CA, exam, total, grade  
- **Transcript** — show semester GPA / CGPA  

**Say:**

> “The transcript updated automatically because it reads from views — we did not manually edit a transcript document.”

---

### Step 14 — Admin audit

- Logout → Login as **admin**
- **Audit Logs** (`/admin/audit-logs`)
- Find the result upload event

**Say:**

> “This proves accountability — the database recorded who changed results and when.”

---

## Phase F — SQL evidence (2 min)

Open in editor or slides (pick 2–3):

| Show | File |
| --- | --- |
| Schema + constraints | `database/01_schema.sql` |
| Transcript view | `database/03_views.sql` → `student_transcript_view` |
| Registration function | `database/04_functions.sql` → `register_course` |
| Upload + grade trigger | `database/04_functions.sql` + `database/05_triggers.sql` |
| Sample query | `database/07_sample_queries.sql` |

**Closing line:**

> “The portal demonstrates our database design. The SQL files are the primary academic deliverable — normalization, constraints, views, functions, triggers, and transactions working together.”

---

## Troubleshooting during demo

| Problem | What to do |
| --- | --- |
| Login fails | Check backend running; PostgreSQL seeded |
| Register fails “capacity full” | Pick another course or mention rule is working |
| Drop fails | Should not happen if UI shows “Results published” (no Drop button). If it does, say “locked after results — enforced in SQL too” |
| Upload fails | Confirm lecturer owns that offering |
| Blank screen | Check `NEXT_PUBLIC_DATA_SOURCE=api` in `.env.local` |
| Anything else | Open SQL function/view and explain the rule calmly |

---

## After rehearsal

- [ ] Screenshot each main screen for report appendix  
- [ ] Note one registration + one upload that always work  
- [ ] Time yourself — aim under 15 minutes  
