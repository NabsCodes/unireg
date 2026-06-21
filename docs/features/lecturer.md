# Lecturer Feature Spec

## Purpose

Lecturer users upload and edit results for course offerings assigned to them.

## Core Screens

| Screen | Route | Purpose |
| --- | --- | --- |
| Dashboard | `/lecturer/dashboard` | Assigned courses + **Upload results** links |
| Assigned Courses | `/lecturer/courses` | Read-only list + link to upload |
| **Result Upload** | `/lecturer/results` | Enter or edit CA/exam scores per student |

**Important:** Upload and edit happen on **Result Upload**, not on Assigned Courses. Assigned Courses only links there.

## Upload vs Edit

| Student row status | Button | Action |
| --- | --- | --- |
| **Pending** (no scores) | **Upload scores** | First-time entry |
| **Uploaded** | **Edit scores** | Update existing scores |

Both call `POST /api/lecturers/me/results` → PostgreSQL `upload_result()` (insert or update on conflict).

## Required Data Operations

- Read assigned course offerings
- List registered students for an offering
- Upload CA (0–40) and exam (0–60) scores
- Edit scores after upload
- Trigger grade computation and audit logging

## Demo note

Seeded lecturer **Dr. Gabriel Ayem** (CSC384) includes one **pending** student (Maryam Bello) for first-time upload demo.

## Checklist

- [x] Assigned courses query
- [x] Registered students roster query
- [x] Result upload / edit form
- [x] Lecturer assignment access rules
- [x] Links from dashboard/courses to Result Upload
