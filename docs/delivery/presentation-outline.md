# Presentation Outline (PowerPoint)

**Target:** 10–12 slides, ~10 minutes talking + 5 minutes live demo  
**Tip for Batul:** Slides should be **database-centered**. Put the ERD and SQL features on slides; live demo shows the portal working.

Copy each block below as one slide. Speaker notes are in *italics*.

---

## Slide 1 — Title

**UniReg**  
University Course Registration and Result Management System  

CSC 384 — Database Systems  
Batul Hassan · [Matric]  
[Supervisor name if required]  
[Date]

---

## Slide 2 — Introduction

**What is UniReg?**

- Mini ERP for university academic operations  
- Three roles: Admin, Student, Lecturer  
- Built on **PostgreSQL** with a Next.js + FastAPI portal  

*Speaker note: Say this is database-first — the app proves the SQL design works.*

---

## Slide 3 — Problem Statement

**Why this system?**

- Manual registration and result handling causes errors  
- Duplicate registrations and inconsistent GPA calculation  
- No clear audit trail when results change  
- Need one trusted source of academic data  

*Speaker note: Keep it practical — real universities face this.*

---

## Slide 4 — Objectives

**Project objectives**

1. Design a normalized relational database for registration and results  
2. Enforce business rules with constraints, functions, and triggers  
3. Generate transcript, GPA, and CGPA from database views  
4. Provide role-based portals for admin, student, and lecturer  
5. Demonstrate transactions and audit logging  

---

## Slide 5 — Methodology & Tools

**How we built it**

| Layer | Tool |
| --- | --- |
| Database | PostgreSQL, raw SQL files |
| Backend | Python, FastAPI, JWT auth |
| Frontend | Next.js, TypeScript (demo UI) |

**Approach:** Schema → seed → views → functions → triggers → API → portal  

*Speaker note: No ORM hiding the SQL — files in `database/` are deliverables.*

---

## Slide 6 — ER Diagram ⭐ (strong slide)

**Database design**

- Insert ERD image from `docs/database/er-diagram.md`  
- Highlight: department, student, lecturer, course, offering, registration, result  

**Key relationships:**

- Student **registers for** course offering  
- Lecturer **assigned to** offering  
- Result **belongs to** registration  

*Speaker note: Spend 60–90 seconds here. This is core grading content.*

---

## Slide 7 — Normalization & Constraints

**Design quality**

- **3NF:** departments, courses, sessions stored once  
- **PK / FK:** referential integrity  
- **UNIQUE:** matric_no, registration pairs  
- **CHECK:** score ranges, role values, status enums  

*Optional: one small table snippet from `01_schema.sql`*

---

## Slide 8 — SQL Features ⭐ (strong slide)

**Database automation**

| Feature | Example in UniReg |
| --- | --- |
| Views | `student_transcript_view`, admin dashboard |
| Functions | `register_course()`, `upload_result()`, GPA/CGPA |
| Triggers | Auto grade, audit log |
| Transactions | Safe registration demos |

*Speaker note: This slide sets up the live demo.*

---

## Slide 9 — System Modules

**Three portals**

```text
Admin     → setup departments, people, courses, offerings
Student   → register, view results & transcript
Lecturer  → upload CA & exam scores
```

*Optional: simple diagram — three boxes pointing to PostgreSQL*

---

## Slide 10 — Live Demo

**Demonstration flow**

1. Admin — dashboard & offerings  
2. Student — registration  
3. Lecturer — result upload  
4. Student — transcript / GPA  
5. Admin — audit log  

*Switch to laptop. Follow `demo-script.md`.*

---

## Slide 11 — Results & Findings

**What works**

- End-to-end registration with capacity and duplicate checks  
- Automatic grade and GPA/CGPA from views  
- Audit trail on result changes  
- Role-based access for three user types  

*Optional: 1–2 screenshots from rehearsal*

---

## Slide 12 — Limitations & Future Work

**Out of scope (by design)**

- School fees / payments  
- Admissions, hostel, timetable  
- Email notifications  

**Future:** more reporting, mobile app, fees/payments module  

*Speaker note: Grade scale admin screen (`/admin/grade-scale`) is already built read-only — optional to show; not required for the core demo.*

---

## Slide 13 — Conclusion

**Summary**

- UniReg demonstrates a complete relational design for academic workflows  
- Critical rules live in **PostgreSQL functions and triggers**  
- Views generate transcript and dashboard data reliably  
- Portal proves the database design in practice  

**Thank you — questions?**

---

## Slide 14 — References (if required)

- CSC 384 project brief  
- PostgreSQL documentation  
- FastAPI documentation  
- Course materials on normalization, ER modeling, triggers  

---

## Design tips for Batul

- Use **one** theme; white background + university colors is fine  
- Max 5 bullet points per slide  
- ERD and SQL features slides are more important than UI screenshots  
- Do not paste code walls — one short snippet max  
- Rehearse slide 6 + 8 + demo transition (slide 10)  

---

## Backup slides (hide unless asked)

**B1 — Sample query** from `07_sample_queries.sql`  
**B2 — `register_course()`** function signature  
**B3 — Audit trigger** explanation  
**B4 — Individual contribution** breakdown  
