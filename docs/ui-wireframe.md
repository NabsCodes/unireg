# UI Wireframe

This is the mental wireframe for the UniReg app. The UI should feel like a real university academic system, not a throwaway assignment screen.

## App Map

```text
UniReg
+-- Auth
|   +-- Login
+-- Admin Portal
|   +-- Dashboard
|   +-- Departments
|   +-- Students
|   +-- Lecturers
|   +-- Courses
|   +-- Sessions & Semesters
|   +-- Course Offerings
|   +-- Audit Logs
+-- Lecturer Portal
|   +-- Dashboard
|   +-- Assigned Courses
|   +-- Result Upload
+-- Student Portal
    +-- Dashboard
    +-- Course Registration
    +-- Registered Courses
    +-- Results
    +-- Transcript
```

## UI Direction

- Calm university admin portal.
- Left sidebar navigation.
- Topbar with current session and semester.
- Main area with tables, filters, forms, and summary cards.
- Desktop-first, with mobile sidebar collapse.
- Colors: white, slate, deep blue, and restrained green for success states.
- No marketing landing page.

## Login

```text
-------------------------------------------------
| UniReg                                        |
| University Course Registration System          |
|                                                |
|  Email / Matric No / Staff No                  |
|  [________________________]                    |
|                                                |
|  Password                                      |
|  [________________________]                    |
|                                                |
|  [ Sign in ]                                   |
|                                                |
|  Demo accounts: Admin | Lecturer | Student     |
-------------------------------------------------
```

Role routing:

```text
admin    -> /admin/dashboard
lecturer -> /lecturer/dashboard
student  -> /student/dashboard
```

## Shared App Shell

```text
---------------------------------------------------------------
| Sidebar                 | Topbar                             |
|                         | Session: 2025/2026 | First Semester|
| UniReg                  | User: Batul Hassan                 |
|                         |------------------------------------|
| Dashboard               |                                    |
| Students / Courses      | Main Page Content                  |
| Registration            |                                    |
| Results                 |                                    |
| Transcript              |                                    |
| Settings / Logout       |                                    |
---------------------------------------------------------------
```

## Admin Dashboard

```text
Admin Dashboard
---------------------------------------------------------------
| Current Session: 2025/2026 First Semester                    |
|                                                               |
| [Students: 245] [Courses: 48] [Registrations: 1,120]          |
| [Lecturers: 32] [Departments: 6] [Results Uploaded: 780]      |
|                                                               |
| Recent Activity                                               |
| - CSC384 results uploaded by Dr. Ayem                         |
| - Batul Hassan registered CSC384                              |
| - New course offering added: CSC384                           |
|                                                               |
| Quick Actions                                                 |
| [Add Student] [Add Course] [Create Offering] [Assign Lecturer]|
---------------------------------------------------------------
```

## Admin Departments

```text
Departments
---------------------------------------------------------------
| [Search department...]                         [Add Dept]     |
|                                                               |
| Department        Faculty          HOD              Students  |
| Computer Science  Computing        Dr. Ayem         120       |
| Software Eng.     Computing        Dr. John         85        |
|                                                               |
| Detail Drawer / Modal                                         |
| - Department name                                             |
| - Faculty                                                     |
| - Head of Department                                          |
| - Courses under department                                    |
| - Students under department                                   |
---------------------------------------------------------------
```

## Admin Students

```text
Students
---------------------------------------------------------------
| [Search matric/name...] [Department v] [Level v] [Add Student]|
|                                                               |
| Matric No    Name             Department      Level  Status   |
| A00025332    Batul Hassan     Computer Sci.   300    Active   |
| A00024575    Simtong Tongnan  Computer Sci.   300    Active   |
|                                                               |
| Student Profile                                               |
| - Biodata                                                     |
| - Department                                                  |
| - Registered courses                                          |
| - Result summary                                              |
| - CGPA                                                        |
---------------------------------------------------------------
```

## Admin Courses

```text
Courses
---------------------------------------------------------------
| [Search course...] [Department v] [Level v] [Add Course]      |
|                                                               |
| Code     Title                         Unit  Level Department |
| CSC384   Database Systems              3     300   CS         |
| CSC302   Operating Systems             3     300   CS         |
|                                                               |
| Course Detail                                                 |
| - Course code/title                                           |
| - Credit units                                                |
| - Department                                                  |
| - Offerings across semesters                                  |
---------------------------------------------------------------
```

## Admin Course Offerings

Students register course offerings, not raw courses. This is one of the most important screens.

```text
Course Offerings
---------------------------------------------------------------
| Session: 2025/2026     Semester: First Semester               |
|                                           [Create Offering]   |
|                                                               |
| Course   Title              Lecturer        Capacity Status   |
| CSC384   Database Systems   Dr. Ayem        80       Open     |
| CSC302   Operating Systems  Dr. Musa        70       Open     |
|                                                               |
| Offering Detail                                               |
| - Course                                                      |
| - Semester                                                    |
| - Assigned lecturers                                          |
| - Registered students                                         |
| - Results uploaded?                                           |
---------------------------------------------------------------
```

## Student Dashboard

```text
Student Dashboard
---------------------------------------------------------------
| Welcome, Batul Hassan                                        |
| Department: Computer Science | Level: 300                     |
|                                                               |
| [Registered Units: 18] [Semester GPA: 4.25] [CGPA: 4.12]      |
|                                                               |
| Current Registration                                          |
| CSC384 Database Systems        Registered                     |
| CSC302 Operating Systems       Registered                     |
|                                                               |
| Quick Actions                                                 |
| [Register Courses] [View Results] [View Transcript]           |
---------------------------------------------------------------
```

## Student Course Registration

```text
Course Registration
---------------------------------------------------------------
| Session: 2025/2026 | First Semester                           |
|                                                               |
| Available Courses                                             |
| Code    Title                  Unit  Lecturer       Action    |
| CSC384  Database Systems       3     Dr. Ayem       [Add]     |
| CSC302  Operating Systems      3     Dr. Musa       [Add]     |
|                                                               |
| Selected Courses                                              |
| Code    Title                  Unit              Action       |
| CSC384  Database Systems       3                 [Remove]     |
| CSC302  Operating Systems      3                 [Remove]     |
|                                                               |
| Total Units: 6                                                |
|                                                               |
| [Submit Registration]                                         |
---------------------------------------------------------------
```

Important demo behavior:

- Submitting registration uses a database transaction.
- Registering the same course offering twice should be blocked by a unique constraint.

## Lecturer Dashboard

```text
Lecturer Dashboard
---------------------------------------------------------------
| Welcome, Dr. Gabriel Ayem                                     |
| Department: Computer Science                                  |
|                                                               |
| Assigned Courses                                              |
| Course   Semester          Registered Students   Results      |
| CSC384   First Semester    42                    Pending      |
| CSC301   First Semester    38                    Uploaded     |
|                                                               |
| [Upload Results]                                              |
---------------------------------------------------------------
```

## Lecturer Result Upload

```text
Result Upload
---------------------------------------------------------------
| Course: CSC384 - Database Systems                             |
| Session: 2025/2026 | First Semester                           |
| Lecturer: Dr. Gabriel Ayem                                    |
|                                                               |
| Student          Matric No     CA      Exam     Total  Grade  |
| Batul Hassan     A00025332     [28]    [50]     78     A      |
| Simtong Tongnan  A00024575     [25]    [42]     67     B      |
|                                                               |
| [Save Results]                                                |
---------------------------------------------------------------
```

Important behavior:

- Lecturer enters CA and exam.
- System calculates total.
- Database trigger/function assigns grade and grade point.
- Audit log records upload or update.

## Student Results

```text
Results
---------------------------------------------------------------
| Session: 2025/2026 | First Semester                           |
|                                                               |
| Code    Course              Unit  CA  Exam Total Grade Point  |
| CSC384  Database Systems    3     28  50   78    A     5.00   |
| CSC302  Operating Systems   3     24  45   69    B     4.00   |
|                                                               |
| Semester Summary                                              |
| Total Units: 6                                                |
| Total Grade Points: 27                                        |
| GPA: 4.50                                                     |
---------------------------------------------------------------
```

## Student Transcript

```text
Transcript
---------------------------------------------------------------
| UNIVERSITY ACADEMIC TRANSCRIPT                               |
|                                                               |
| Name: Batul Hassan                                            |
| Matric No: A00025332                                          |
| Department: Computer Science                                  |
| Level: 300                                                    |
|                                                               |
| 2025/2026 - First Semester                                    |
| Code    Course              Unit  Score  Grade  Grade Point   |
| CSC384  Database Systems    3     78     A      5.00          |
| CSC302  Operating Systems   3     69     B      4.00          |
|                                                               |
| Semester GPA: 4.50                                            |
| Cumulative CGPA: 4.38                                         |
|                                                               |
| [Print] [Download PDF]                                        |
---------------------------------------------------------------
```

## Audit Logs

```text
Audit Logs
---------------------------------------------------------------
| [Action v] [User v] [Date range]                              |
|                                                               |
| Date        User          Action          Table       Record   |
| Jun 20      Dr. Ayem      RESULT_UPDATED  results     102      |
| Jun 20      Admin         COURSE_CREATED  courses     14       |
---------------------------------------------------------------
```

## Core User Journey

```text
Admin sets up:
Department -> Students/Lecturers -> Courses -> Session/Semester -> Offerings -> Assign Lecturers

Student does:
Login -> View available offerings -> Register courses -> Wait for results -> View transcript

Lecturer does:
Login -> View assigned offerings -> Enter scores -> Save results

Database does:
Validate registration -> prevent duplicates -> compute grades -> compute GPA/CGPA -> generate transcript -> log sensitive actions
```

## Screen Priority

1. Login and role routing
2. Admin academic setup
3. Course offerings
4. Student registration
5. Lecturer result upload
6. Student results
7. Transcript
8. Audit logs and dashboard polish
