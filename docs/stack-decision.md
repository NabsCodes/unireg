# Stack Decision

## Current Constraint

The lecturer expects the project to use the suggested backend tools from the CSC 384 brief. That means the backend should be one of:

- PHP
- Python
- Java

The frontend can still be built with a modern framework as long as it is presented correctly as an HTML, CSS, and JavaScript frontend.

## Recommendation

Use this stack:

```text
Frontend: Next.js + TypeScript + Tailwind CSS
Backend: Python API
Database: PostgreSQL
SQL: Raw SQL files as source-of-truth deliverables
```

## Why This Is The Best Fit

- Next.js keeps the frontend inside Nabeel's strongest area.
- Python is easier to rebuild quickly than Java for this project size.
- PostgreSQL directly supports the database concepts needed for the assignment.
- Raw SQL keeps the project academically defensible.
- Keeping the backend separate avoids depending on Next.js API routes when the lecturer asked for PHP, Python, or Java.

## Python Backend Options

### Option A: FastAPI

Recommended if we want a clean API-first project.

Pros:

- Small amount of code.
- Good request validation with Pydantic.
- Automatic API docs.
- Works well with a separate Next.js frontend.
- Easy to organize into routers and services.

Cons:

- The lecturer may not know FastAPI specifically, but it is still Python.

### Option B: Flask

Recommended if we want the most familiar "school project" Python backend.

Pros:

- Very easy to explain.
- Minimal framework concepts.
- Common in beginner-to-intermediate Python web projects.

Cons:

- More manual validation and structure.
- Easier for routes to become messy unless we are disciplined.

## Current Recommendation

Use **Python FastAPI** unless Batul thinks the lecturer expects a very traditional tool.

If we want the easiest story for a lecturer:

```text
"The frontend is built with HTML, CSS, and JavaScript using Next.js.
The backend is built with Python.
The database is PostgreSQL, and the database design is implemented with raw SQL."
```

## What Not To Do

- Do not use Next.js route handlers as the main backend if the lecturer is strict about the suggested tools.
- Do not use Prisma as the source of truth for schema design.
- Do not hide the SQL behind an ORM.
- Do not start with Java unless someone on the group is comfortable defending Java backend code.
- Do not use PHP just because it is common for school projects if nobody wants to maintain it under time pressure.

