# Student Feature Spec

## Purpose

Student users register for course offerings and view their academic records.

## Core Screens

| Screen | Route | Purpose |
| --- | --- | --- |
| Dashboard | `/student/dashboard` | Summary + link to **Course Registration** |
| **Course Registration** | `/student/registration` | Browse offerings, **register**, drop |
| Results | `/student/results` | Published semester scores |
| Transcript | `/student/transcript` | Generated GPA/CGPA transcript |

## Course Registration (ERP requirement)

This is the primary student action screen — not the dashboard.

Students can:

- See all **open offerings** for the current session
- Filter: **All · My courses · Available**
- **Register** for courses not yet enrolled
- **Drop** courses that have no uploaded results yet
- See **Results published** status when a course is locked

Dashboard shows registered courses but directs students to **Register for courses** for new registrations.

## Required Data Operations

- Read available course offerings (`GET /api/students/me/course-offerings`)
- Register for a course offering (`POST /api/students/me/registrations` → `register_course()`)
- Drop registration when allowed (`DELETE /api/students/me/registrations/{offering_id}`)
- View approved registrations (dashboard + registration tabs)
- View semester results and transcript

## Checklist

- [x] Student dashboard with registration CTA
- [x] Course registration screen with register/drop actions
- [x] Registration rules enforced in PostgreSQL
- [x] Results view
- [x] Transcript view
