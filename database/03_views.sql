-- UniReg views.
-- Run after 02_seed.sql. These views are read models for the API and report.

CREATE OR REPLACE VIEW semester_results_view AS
SELECT
    cr.reg_id,
    s.student_id,
    s.matric_no,
    s.first_name || ' ' || s.last_name AS student_name,
    d.dept_name,
    acs.session_id,
    acs.session_name,
    sem.semester_id,
    sem.semester_name,
    c.course_id,
    c.course_code,
    c.course_title,
    c.credit_units,
    cr.status AS registration_status,
    r.result_id,
    r.ca_score,
    r.exam_score,
    r.total_score,
    r.grade,
    r.grade_point,
    r.grade_point * c.credit_units AS weighted_grade_points
FROM course_registration cr
JOIN student s ON s.student_id = cr.student_id
JOIN department d ON d.dept_id = s.dept_id
JOIN course_offering co ON co.offering_id = cr.offering_id
JOIN course c ON c.course_id = co.course_id
JOIN semester sem ON sem.semester_id = co.semester_id
JOIN academic_session acs ON acs.session_id = sem.session_id
LEFT JOIN result r ON r.reg_id = cr.reg_id;

CREATE OR REPLACE VIEW student_transcript_view AS
SELECT
    srv.student_id,
    srv.matric_no,
    srv.student_name,
    srv.dept_name,
    srv.session_name,
    srv.semester_name,
    srv.course_code,
    srv.course_title,
    srv.credit_units,
    srv.ca_score,
    srv.exam_score,
    srv.total_score,
    srv.grade,
    srv.grade_point,
    srv.weighted_grade_points,
    round(
        (
            sum(srv.weighted_grade_points) OVER (
                PARTITION BY srv.student_id, srv.semester_id
            )
            / NULLIF(
                sum(srv.credit_units) FILTER (WHERE srv.result_id IS NOT NULL) OVER (
                    PARTITION BY srv.student_id, srv.semester_id
                ),
                0
            )
        )::numeric,
        2
    ) AS semester_gpa,
    round(
        (
            sum(srv.weighted_grade_points) OVER (PARTITION BY srv.student_id)
            / NULLIF(
                sum(srv.credit_units) FILTER (WHERE srv.result_id IS NOT NULL) OVER (
                    PARTITION BY srv.student_id
                ),
                0
            )
        )::numeric,
        2
    ) AS cgpa
FROM semester_results_view srv
WHERE srv.registration_status = 'registered';

CREATE OR REPLACE VIEW admin_dashboard_summary_view AS
SELECT
    (SELECT count(*) FROM student WHERE status = 'active') AS active_students,
    (SELECT count(*) FROM lecturer) AS lecturers,
    (SELECT count(*) FROM department) AS departments,
    (SELECT count(*) FROM course) AS courses,
    (
        SELECT count(*)
        FROM course_registration
        WHERE status = 'registered'
    ) AS active_registrations,
    (SELECT count(*) FROM result) AS uploaded_results,
    (
        SELECT session_name
        FROM academic_session
        WHERE is_current
        LIMIT 1
    ) AS current_session;
