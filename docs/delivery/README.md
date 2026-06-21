# Presentation & Defense Pack

**For Batul (and anyone presenting UniReg)**

This folder is your **teaching pack** — not technical specs. Read these files in order before the demo or defense. You do not need to memorize code. You need to tell the **story** of how admin setup, student registration, lecturer results, and PostgreSQL rules work together.

---

## How to use this folder

| Order | File | When to use it |
| --- | --- | --- |
| 1 | [`defense-guide.md`](./defense-guide.md) | **Start here.** Read this like a lesson. It explains every flow in plain language with wireframes and “what to say if asked.” |
| 2 | [`cheat-sheet.md`](./cheat-sheet.md) | Print or keep on your phone during rehearsal. One page: logins, demo order, database mapping. |
| 3 | [`demo-script.md`](./demo-script.md) | Step-by-step clicks during the live demo. Follow it exactly the first time you rehearse. |
| 4 | [`presentation-outline.md`](./presentation-outline.md) | Copy slide titles and bullets into PowerPoint. |
| 5 | [`report-outline.md`](./report-outline.md) | Structure for the 3,000+ word report and appendix. |

---

## The one idea to remember

UniReg is a **database systems project** with a working portal on top.

```text
What the user sees (screen)
        ↓
Who is allowed + which action (FastAPI + JWT)
        ↓
Where the truth lives (PostgreSQL tables, functions, views, triggers)
```

If you can explain **registration** and **result upload** using that three-layer story, you can defend the whole project.

---

## Before you rehearse (checklist)

- [ ] PostgreSQL is running with seed data loaded (`database/README.md`)
- [ ] Backend running: `uvicorn app.main:app --reload` (from `backend/`)
- [ ] Frontend `.env.local` has `NEXT_PUBLIC_DATA_SOURCE=api`
- [ ] Frontend running: `pnpm --dir frontend dev`
- [ ] You can log in once as admin, student, and lecturer with password `demo1234`
- [ ] You have [`cheat-sheet.md`](./cheat-sheet.md) open or printed

---

## Demo accounts

| Role | Login | Password |
| --- | --- | --- |
| Admin | `admin@unireg.test` | `demo1234` |
| Student | `A00025332` or `batul.hassan@unireg.test` | `demo1234` |
| Lecturer | `gabriel.ayem@unireg.test` | `demo1234` |

---

## Where the “academic evidence” lives

When an examiner asks for SQL proof, open these (in order):

| File | What it proves |
| --- | --- |
| `docs/database/er-diagram.md` | ER modeling |
| `database/01_schema.sql` | Tables, keys, constraints |
| `database/02_seed.sql` | Sample data |
| `database/03_views.sql` | Transcript and dashboard views |
| `database/04_functions.sql` | `register_course()`, `upload_result()`, GPA/CGPA |
| `database/05_triggers.sql` | Grade calculation, audit logging |
| `database/06_transactions.sql` | Transaction examples |
| `database/07_sample_queries.sql` | Report appendix queries |

---

## What you do **not** need to do

- Explain every React component or file in `frontend/`
- Memorize API route names (helpful, not required)
- Demo the grade-scale screen at `/admin/grade-scale` or result oversight at `/admin/results`

---

## If something breaks during the demo

Stay calm. Say:

> “The business rule is enforced in PostgreSQL. Let me show the function or view in our SQL files.”

Then open `database/04_functions.sql` or `database/03_views.sql`. That is a strong, honest answer for a database course.

---

## Related docs (for deeper reading)

- App screen map: `docs/ui-wireframe.md`
- Database concepts checklist: `docs/database/sql-features-checklist.md`
- Normalization for report: `docs/database/normalization.md`
- Project status: `docs/status-board.md`
