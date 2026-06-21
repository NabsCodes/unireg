# Report Outline (3,000+ words)

**For Batul’s individual report**  
Use this as a **chapter checklist**. Each section includes what to write and where to pull evidence from the repo.

---

## Suggested word budget

| Section | ~Words |
| --- | --- |
| Introduction & background | 400 |
| Problem & objectives | 350 |
| Literature / related work | 300 |
| Methodology & tools | 400 |
| Database design | 800 |
| Implementation & demo | 500 |
| Results & discussion | 400 |
| Limitations & conclusion | 350 |
| **Total** | **~3,500** |

Adjust to your department’s format.

---

## 1. Title Page

- Project title: UniReg  
- Course: CSC 384 Database Systems  
- Your name, matric, department  
- Date, supervisor (if required)

---

## 2. Introduction and Background

**Write about:**

- What university registration/result systems do  
- Why manual or spreadsheet systems fail at scale  
- How relational databases help with integrity and reporting  

**Pull from:** `docs/requirements.md`, project brief

---

## 3. Statement of the Problem

**Write about:**

- Duplicate registrations  
- Wrong GPA when data is duplicated or inconsistent  
- No audit when results are changed  
- Difficulty generating official transcript from scattered data  

**End with:** “This project addresses these problems through a normalized PostgreSQL design.”

---

## 4. Objectives of the Study

Mirror presentation objectives (see `presentation-outline.md` slide 4).

Use numbered list — examiners look for measurable objectives.

---

## 5. Scope of the Study

**In scope:**

- Admin academic setup  
- Student course registration  
- Lecturer result upload  
- GPA/CGPA and transcript generation  
- Audit logging  

**Out of scope:**

- Fees, admissions, hostel, timetable (mention briefly)

**Pull from:** `docs/backend-api-contract.md` → “Excluded On Purpose”

---

## 6. Literature Review (short)

**Topics to mention (no need for 20 papers):**

- Relational database theory (Codd, normalization)  
- Academic information systems in universities  
- Role-based access in enterprise systems  
- Benefits of stored procedures/triggers for business rules  

*2–3 credible sources + course textbook is enough for a capstone.*

---

## 7. Methodology

**Describe your process:**

1. Requirements from CSC 384 brief  
2. ER modeling → schema plan → SQL files  
3. Seed data for demo  
4. Views, functions, triggers  
5. FastAPI API layer  
6. Next.js portal for demonstration  

**Diagram suggestion:**

```text
Requirements → ERD → SQL → API → Portal → Demo
```

**Pull from:** `docs/workflow.md`, `docs/architecture.md`

---

## 8. Hardware and Software Tools

| Category | Choice |
| --- | --- |
| OS | macOS / Windows / Linux |
| DBMS | PostgreSQL |
| Backend | Python 3.12, FastAPI |
| Frontend | Next.js, TypeScript |
| Auth | JWT, password hashing |

**Pull from:** `docs/stack-decision.md`, root `README.md`

---

## 9. Data Sources

- **Primary:** seeded demo data in `database/02_seed.sql`  
- **Synthetic:** fictional students, lecturers, courses for demonstration  
- **No real student PII**  

Explain why seed data is appropriate for a capstone.

---

## 10. Database Design ⭐ (longest section)

Subsections Batul should include:

### 10.1 ER Diagram

- Insert ERD figure  
- Explain each entity and relationship  
- **Source:** `docs/database/er-diagram.md`

### 10.2 Normalization

- 1NF, 2NF, 3NF explanation applied to UniReg  
- Example: why `department` is separate from `student`  
- **Source:** `docs/database/normalization.md`

### 10.3 Table Descriptions

- Brief paragraph per major table:  
  `department`, `student`, `lecturer`, `course`, `academic_session`, `semester`, `course_offering`, `course_registration`, `result`, `user_account`, `audit_log`

### 10.4 Constraints

- PK, FK, UNIQUE, CHECK with **one example each** from `01_schema.sql`

### 10.5 Views

- `student_transcript_view` — purpose and benefit  
- `admin_dashboard_summary_view`  

### 10.6 Functions

- `register_course()` — rules enforced  
- `upload_result()` — scoring pipeline  
- GPA/CGPA calculation functions  

### 10.7 Triggers

- Grade assignment from `grade_scale`  
- Audit log on result changes  
- `updated_at` maintenance (optional mention)

### 10.8 Transactions

- Describe registration transaction demo  
- Why rollback matters  
- **Source:** `database/06_transactions.sql`

**Checklist:** `docs/database/sql-features-checklist.md`

---

## 11. System Implementation

**Keep this section shorter than database design.**

Describe at high level:

- FastAPI exposes REST routes  
- JWT role guards (admin / student / lecturer)  
- Frontend calls API; does not replace database rules  

**One paragraph per portal** — what each role can do.

**Do not** paste long code listings — refer to appendix.

**Pull from:** `docs/backend-api-contract.md`, `defense-guide.md`

---

## 12. Results and Demonstration

**Write about what you showed:**

- Admin created offerings  
- Student registered  
- Lecturer uploaded results  
- Transcript showed GPA/CGPA  
- Audit log captured change  

**Include screenshots** (take during `demo-script.md` rehearsal):

1. Login  
2. Admin dashboard  
3. Offerings  
4. Student registration  
5. Lecturer result upload  
6. Transcript  
7. Audit log  

**Caption each screenshot** with one sentence linking to a database concept.

---

## 13. Discussion

**Answer:**

- Did the design meet the objectives?  
- What advantage do functions/triggers give over UI-only validation?  
- How do views simplify transcript generation?  

---

## 14. Study Limitations

- Demo scale (small seed dataset)  
- Not production-hardened (single institution, no payment module)  
- Grade scale read-only screen is built (`/admin/grade-scale`); optional in demo  

Be honest — examiners respect scope awareness.

---

## 15. Individual Contribution

**Batul should write her own truthful section**, for example:

- ER review and normalization explanation in report  
- Presentation and demo delivery  
- Documentation review and testing  
- Report writing and screenshot appendix  

Coordinate with Nabeel on accurate split.

---

## 16. Conclusion

- Restate problem and how UniReg solves it  
- Emphasize database concepts demonstrated  
- One sentence on future work  

Reuse tone from `cheat-sheet.md` opening paragraph.

---

## 17. References

- APA or department format  
- Brief, PostgreSQL docs, course materials, any papers cited in literature review  

---

## Appendix (required for database course)

| Appendix item | Source file |
| --- | --- |
| A. Full ER diagram | `docs/database/er-diagram.md` export |
| B. CREATE TABLE excerpt | `database/01_schema.sql` |
| C. Seed data sample | `database/02_seed.sql` (subset) |
| D. Transcript view | `database/03_views.sql` |
| E. `register_course` function | `database/04_functions.sql` |
| F. Trigger listing | `database/05_triggers.sql` |
| G. Sample queries | `database/07_sample_queries.sql` |
| H. Application screenshots | From demo rehearsal |

---

## Writing tips for Batul

1. **Lead with database design** — implementation is supporting evidence  
2. **Every claim needs a file** — “see Appendix D”  
3. **Use diagrams** — ERD + simple 3-layer architecture  
4. **Write in your own words** — explain like you’re teaching a friend  
5. **Read `defense-guide.md` first** — report and presentation should tell the same story  

---

## Quick alignment check

Before submitting, confirm report matches demo:

- [ ] Same demo accounts as `cheat-sheet.md`  
- [ ] Same flow as `demo-script.md`  
- [ ] Same SQL features as `sql-features-checklist.md`  
- [ ] Screenshots match current UI  
