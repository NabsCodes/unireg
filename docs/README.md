# UniReg Documentation Index

This folder is the working documentation system for UniReg, a CSC 384 Database Systems capstone project for a University Course Registration and Result Management System.

The docs should keep the project easy to continue across Nabeel, Batul, Claude, Codex, and any other helper. Do not rely on chat history as the only source of truth.

## Read Order

1. `workflow.md`
2. `status-board.md`
3. `requirements.md`
4. `architecture.md`
5. `stack-decision.md`
6. `ui-wireframe.md`
7. `database/er-diagram.md`
8. `database/schema-plan.md`
9. The relevant feature spec under `features/`
10. `implementation-log.md`

## Documents

| File | Purpose |
| --- | --- |
| `workflow.md` | How to move from design to SQL to app demo without losing context. |
| `status-board.md` | Quick checklist for what is done, in progress, and waiting. |
| `handoff-template.md` | Copy-paste structure for handing work across agents or chats. |
| `implementation-log.md` | Short running log after meaningful work sessions. |
| `requirements.md` | Project scope from the CSC 384 brief, with decisions and open questions. |
| `architecture.md` | High-level application, roles, and module boundaries. |
| `backend-api-contract.md` | FastAPI route contract, route counts, and frontend wiring map. |
| `stack-decision.md` | Stack options and current recommendation based on the lecturer's suggested tools. |
| `design-system.md` | UniReg visual tokens, shell rules, typography, and component ownership. |
| `ui-wireframe.md` | App UI map, role portals, and screen-by-screen mental wireframe. |
| `database/er-diagram.md` | Mermaid ERD and relationship notes. |
| `database/normalization.md` | Normalization explanation for the report/presentation. |
| `database/schema-plan.md` | Table-by-table schema plan before writing SQL. |
| `database/sql-features-checklist.md` | Required database concepts and how UniReg will demonstrate them. |
| `features/` | Role and module specs for admin, student, lecturer, registration, and transcripts. |
| `delivery/` | Demo script, presentation outline, and report outline. |

## Source Of Truth Order

1. CSC 384 project brief
2. Confirmed school grading rules and lecturer requirements
3. `docs/database/er-diagram.md`
4. SQL files once created under `database/`
5. App implementation once the stack is confirmed

If these disagree, update the docs before writing code.
