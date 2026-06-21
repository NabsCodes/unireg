# UniReg Database

This folder owns the raw SQL deliverables for the CSC 384 project.

Run these files in order after creating the PostgreSQL database:

```text
01_schema.sql
02_seed.sql
03_views.sql
04_functions.sql
05_triggers.sql
06_transactions.sql
07_sample_queries.sql
```

## Rule

The database should enforce academic truth:

- A result must belong to a registration.
- A student cannot register the same course offering twice.
- GPA and CGPA should be computable from stored results and course credit units.
- Grade points should come from `grade_scale`.
- Sensitive result changes should be auditable.

## Application Connection

The UniReg portal reads this database **live** in demo mode:

1. Apply the SQL files above to a PostgreSQL database.
2. Point the FastAPI backend at that database (see `backend/README.md`).
3. Run the frontend with `NEXT_PUBLIC_DATA_SOURCE=api`.

Registration, result upload, transcript, GPA, and audit log screens all flow through API endpoints that query the seeded tables, views, functions, and triggers defined here.

## Reseed / refresh demo data

If lecturer upload only shows **Edit scores**, your database likely has results for every registered student on that offering.

**Option A — no full reseed (fastest upload demo):**

Log in as **`musa.danjuma@unireg.test`** / `demo1234` → **Upload Results** → select **MTH201 · First Semester**.  
MTH201 registrations have **no** seeded results, so every row is **Pending** with **Upload scores**.

**Option B — Gabriel + one pending student:**

Reload seed (or run the Maryam patch below), then log in as **`gabriel.ayem@unireg.test`** → **Upload Results** → **CSC384** → upload for **Maryam Bello**.

**Full reseed** (resets all data):

```bash
psql "$DATABASE_URL" -f database/01_schema.sql
psql "$DATABASE_URL" -f database/02_seed.sql
psql "$DATABASE_URL" -f database/03_views.sql
psql "$DATABASE_URL" -f database/04_functions.sql
psql "$DATABASE_URL" -f database/05_triggers.sql
```

**Light patch** (add pending CSC384 student only — safe on existing DB):

```bash
psql postgresql://unireg:unireg@localhost:5432/unireg \
  -f database/patches/01_pending_upload_demo.sql
```

If your shell does not have `DATABASE_URL` set, use the connection string from `backend/.env` (not your macOS username). Example:

```bash
export DATABASE_URL=postgresql://unireg:unireg@localhost:5432/unireg
psql "$DATABASE_URL" -f database/patches/01_pending_upload_demo.sql
```

