# Local Setup Guide (Beginner)

Use this guide if you are setting up UniReg on your own laptop for the first time. It covers **everything** needed to run the portal locally: PostgreSQL, the Python backend, and the Next.js frontend.

**Mac with Homebrew** is the path we document step by step. If you are on Windows or Linux, ask a teammate — the same tools exist, but install commands differ.

---

## What you are installing

| Tool | Why you need it |
| --- | --- |
| **Git** | Clone and pull the project |
| **Node.js + pnpm** | Run the Next.js frontend |
| **Python 3.11+** | Run the FastAPI backend |
| **PostgreSQL** | Store the database the app reads from |
| **Homebrew** (Mac) | Easiest way to install the tools above |

You need **two terminal windows** running at the same time during normal work:

1. Backend API (`uvicorn`) on port **8000**
2. Frontend app (`pnpm dev`) on port **3000**

---

## Before you start

1. Clone the repo (or pull the latest changes):

```bash
git clone <repo-url> unireg
cd unireg
```

2. Confirm Homebrew works (Mac):

```bash
brew --version
```

If Homebrew is missing, install it from [https://brew.sh](https://brew.sh) first.

---

## Part 1 — PostgreSQL (database)

The frontend and backend both depend on a local PostgreSQL database named `unireg`.

### Install and start PostgreSQL

```bash
brew update
brew install postgresql@16
brew services start postgresql@16
```

Check that Postgres is running:

```bash
brew services list | grep postgresql
```

You should see `started` next to `postgresql@16`.

### Create the database user and database (one-time)

```bash
createuser -s unireg 2>/dev/null || true
createdb -O unireg unireg 2>/dev/null || true
psql postgres -c "ALTER USER unireg WITH PASSWORD 'unireg';"
```

### Load the SQL files (one-time, or after a reseed)

From the **project root** (`unireg/`), run these in order:

```bash
psql postgresql://unireg:unireg@localhost:5432/unireg -f database/01_schema.sql
psql postgresql://unireg:unireg@localhost:5432/unireg -f database/02_seed.sql
psql postgresql://unireg:unireg@localhost:5432/unireg -f database/03_views.sql
psql postgresql://unireg:unireg@localhost:5432/unireg -f database/04_functions.sql
psql postgresql://unireg:unireg@localhost:5432/unireg -f database/05_triggers.sql
```

Optional (for report samples, not required to run the app):

```bash
psql postgresql://unireg:unireg@localhost:5432/unireg -f database/06_transactions.sql
psql postgresql://unireg:unireg@localhost:5432/unireg -f database/07_sample_queries.sql
```

Quick sanity check:

```bash
psql postgresql://unireg:unireg@localhost:5432/unireg -c "SELECT session_name FROM academic_session WHERE is_current;"
```

You should see `2025/2026`.

More database notes: `database/README.md`.

---

## Part 2 — Python backend (API)

The backend needs **Python 3.11 or newer**.

### Install Python (Mac + Homebrew)

```bash
brew install python@3.12
python3 --version
```

Expected output: `Python 3.12.x` (3.11+ is fine).

If `python3` is not found after install, add it to your shell path:

```bash
echo 'export PATH="/opt/homebrew/opt/python@3.12/bin:$PATH"' >> ~/.zshrc
source ~/.zshrc
python3 --version
```

On Intel Macs, the path may be `/usr/local/opt/python@3.12/bin` instead of `/opt/homebrew/...`.

### Create a virtual environment and install packages (one-time)

```bash
cd backend
python3 -m venv .venv
source .venv/bin/activate
pip install --upgrade pip
pip install ".[dev]"
cp .env.example .env
```

Your terminal prompt should show `(.venv)` when the environment is active.

The default `.env` should contain:

```env
DATABASE_URL=postgresql://unireg:unireg@localhost:5432/unireg
BACKEND_CORS_ORIGINS=http://localhost:3000,http://127.0.0.1:3000
JWT_SECRET_KEY=change-me-before-demo
```

### Start the backend (every session)

```bash
cd backend
source .venv/bin/activate
uvicorn app.main:app --reload
```

Leave this terminal open. You should see:

```text
Uvicorn running on http://127.0.0.1:8000
```

Test in a **second** terminal:

```bash
curl http://127.0.0.1:8000/health
```

More backend notes: `backend/README.md`.

---

## Part 3 — Frontend (Next.js)

The frontend needs **Node.js** and **pnpm**.

### Install Node.js and pnpm (Mac + Homebrew)

```bash
brew install node
corepack enable
corepack prepare pnpm@latest --activate
node --version
pnpm --version
```

### Install frontend packages (one-time)

From the **project root**:

```bash
pnpm install
```

### Configure environment (one-time)

```bash
cp frontend/.env.example frontend/.env.local
```

`frontend/.env.local` should contain:

```env
NEXT_PUBLIC_DATA_SOURCE=api
NEXT_PUBLIC_API_BASE_URL=http://127.0.0.1:8000
```

### Start the frontend (every session)

From the **project root**:

```bash
pnpm --dir frontend dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Daily workflow (two terminals)

**Terminal 1 — Backend**

```bash
cd unireg/backend
source .venv/bin/activate
uvicorn app.main:app --reload
```

**Terminal 2 — Frontend**

```bash
cd unireg
pnpm --dir frontend dev
```

Open the app at [http://localhost:3000](http://localhost:3000).

---

## Demo logins

All demo accounts use password: **`demo1234`**

| Role | Email / login |
| --- | --- |
| Student | `batul.hassan@unireg.test` |
| Lecturer (upload demo) | `musa.danjuma@unireg.test` |
| Lecturer (edit demo) | `gabriel.ayem@unireg.test` |
| Admin | `admin@unireg.test` |

Student matric login also works: `A00025332` / `demo1234`.

For presentation prep, see `docs/delivery/README.md`.

---

## Troubleshooting

### `command not found: python`

Use `python3`, not `python`. Always activate the venv before running backend commands.

### `command not found: uvicorn`

The virtual environment is not active:

```bash
cd backend
source .venv/bin/activate
```

### `OPTIONS ... 400 Bad Request` on login (Failed to fetch)

The browser sends a CORS preflight before `POST /api/auth/login`. A **400 on OPTIONS** means the frontend origin is not allowed by the backend.

1. Open the app using **`http://localhost:3000`** or **`http://127.0.0.1:3000`** (not a random port unless you add it to CORS).
2. In `backend/.env`, ensure:

```env
BACKEND_CORS_ORIGINS=http://localhost:3000,http://127.0.0.1:3000
```

3. Restart uvicorn after changing `.env`.
4. In development, the backend also allows any `localhost` / `127.0.0.1` port via regex — pull latest backend if you still see 400.

### `GET /api/students/me/course-offerings` returns 500

If the backend log shows `can_drop ... Input should be a valid boolean ... None`, pull the latest backend code (fixed with `COALESCE(..., false)` in the offerings query) and restart uvicorn.

### Frontend loads but data is empty or errors appear

Usually one of these:

1. Backend is not running → start Terminal 1 above.
2. PostgreSQL is not running → `brew services start postgresql@16`
3. Database was never seeded → rerun the SQL files in Part 1.
4. Wrong frontend env → confirm `NEXT_PUBLIC_DATA_SOURCE=api` in `frontend/.env.local`.

### `connection refused` on port 5432

PostgreSQL is stopped:

```bash
brew services start postgresql@16
```

### `psql: FATAL: database "nabeelhassan" does not exist`

You forgot the connection URL. Always use:

```bash
psql postgresql://unireg:unireg@localhost:5432/unireg
```

### Port already in use (3000 or 8000)

Another app is using that port. Stop the old process or ask a teammate — do not change ports unless you also update `.env` files.

### After `git pull`, things break

Try in order:

```bash
pnpm install
cd backend && source .venv/bin/activate && pip install ".[dev]"
```

If database objects changed, re-run the SQL files from Part 1 (this resets demo data).

---

## Optional checks (when something still feels wrong)

**Frontend**

```bash
pnpm --dir frontend lint
pnpm --dir frontend typecheck
```

**Backend** (with venv active)

```bash
cd backend
ruff check .
pytest
```

---

## Where this doc lives in the project

| File | When to read it |
| --- | --- |
| **`docs/local-setup.md`** (this file) | First-time laptop setup |
| `README.md` | Project overview and quick commands |
| `database/README.md` | SQL file order and reseed options |
| `backend/README.md` | API routes and backend folder layout |
| `docs/workflow.md` | How the team builds features |
| `docs/delivery/README.md` | Demo and defense preparation |

If you complete this guide successfully, you are ready to work on UniReg locally. For feature specs and architecture, continue with `docs/README.md`.
