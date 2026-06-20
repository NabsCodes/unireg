# Workflow

UniReg should be built database-first. The frontend exists to demonstrate the database design, not to hide weak data modeling behind a polished interface.

## Standard Loop

1. Confirm the requirement or open question.
2. Update the relevant doc or checklist.
3. Design or adjust the database shape first.
4. Write or update SQL.
5. Implement only the app surface needed to demonstrate the database behavior.
6. Run targeted verification.
7. Add a short `implementation-log.md` entry.
8. Leave a handoff note if work is incomplete.

## Current Stack Rule

The app stack is intentionally not locked yet.

- If backend tools are flexible: use Next.js, PostgreSQL, and raw SQL through a database driver.
- If backend tools must follow the brief strictly: use a Next.js frontend, Python backend, PostgreSQL, and raw SQL.

Do not scaffold the application until Batul confirms whether the suggested backend tools are flexible.

## Database Rule

The SQL files should be visible and defendable:

- `database/01_schema.sql`
- `database/02_seed.sql`
- `database/03_views.sql`
- `database/04_functions.sql`
- `database/05_triggers.sql`
- `database/06_transactions.sql`
- `database/07_sample_queries.sql`

The application may use helper libraries, but the academic evidence should be in raw SQL.

## Completion Rule

Do not mark a checklist item complete just because a file exists. Mark it complete only when the relevant behavior is implemented, verified, and documented.

