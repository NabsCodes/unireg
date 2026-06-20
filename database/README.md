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

