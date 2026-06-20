-- UniReg sample queries for presentation and report appendix.

-- 1. Courses available in the current semester.
SELECT
    c.course_code,
    c.course_title,
    c.credit_units,
    sem.semester_name,
    acs.session_name,
    co.max_capacity,
    co.status
FROM course_offering co
JOIN course c ON c.course_id = co.course_id
JOIN semester sem ON sem.semester_id = co.semester_id
JOIN academic_session acs ON acs.session_id = sem.session_id
WHERE acs.is_current = true
  AND co.status = 'open'
ORDER BY c.course_code;

-- 2. Registered courses for Batul in the current session.
SELECT
    s.matric_no,
    c.course_code,
    c.course_title,
    c.credit_units,
    cr.status
FROM course_registration cr
JOIN student s ON s.student_id = cr.student_id
JOIN course_offering co ON co.offering_id = cr.offering_id
JOIN course c ON c.course_id = co.course_id
JOIN semester sem ON sem.semester_id = co.semester_id
JOIN academic_session acs ON acs.session_id = sem.session_id
WHERE s.matric_no = 'A00025332'
  AND acs.is_current = true
ORDER BY c.course_code;

-- 3. Lecturer assigned courses.
SELECT
    l.title || ' ' || l.first_name || ' ' || l.last_name AS lecturer_name,
    c.course_code,
    c.course_title,
    sem.semester_name,
    acs.session_name,
    count(cr.reg_id) AS registered_students
FROM course_assignment ca
JOIN lecturer l ON l.lecturer_id = ca.lecturer_id
JOIN course_offering co ON co.offering_id = ca.offering_id
JOIN course c ON c.course_id = co.course_id
JOIN semester sem ON sem.semester_id = co.semester_id
JOIN academic_session acs ON acs.session_id = sem.session_id
LEFT JOIN course_registration cr
    ON cr.offering_id = co.offering_id
   AND cr.status = 'registered'
WHERE l.staff_no = 'STF-CS-001'
GROUP BY
    l.title,
    l.first_name,
    l.last_name,
    c.course_code,
    c.course_title,
    sem.semester_name,
    acs.session_name
ORDER BY c.course_code;

-- 4. Transcript rows for Batul.
SELECT
    matric_no,
    student_name,
    dept_name,
    session_name,
    semester_name,
    course_code,
    course_title,
    credit_units,
    total_score,
    grade,
    grade_point,
    semester_gpa,
    cgpa
FROM student_transcript_view
WHERE matric_no = 'A00025332'
ORDER BY session_name, semester_name, course_code;

-- 5. GPA and CGPA function demo.
SELECT
    s.matric_no,
    sem.semester_name,
    calculate_semester_gpa(s.student_id, sem.semester_id) AS semester_gpa,
    calculate_cgpa(s.student_id) AS cgpa
FROM student s
CROSS JOIN semester sem
JOIN academic_session acs ON acs.session_id = sem.session_id
WHERE s.matric_no = 'A00025332'
  AND acs.session_name = '2025/2026'
  AND sem.semester_name = 'First Semester';

-- 6. Audit history for result changes.
SELECT
    al.created_at,
    ua.email AS actor,
    al.action,
    al.table_name,
    al.record_id
FROM audit_log al
LEFT JOIN user_account ua ON ua.user_id = al.user_id
ORDER BY al.created_at DESC;
