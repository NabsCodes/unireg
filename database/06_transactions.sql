-- UniReg transaction examples.
-- Run after 05_triggers.sql if you want to demonstrate transaction behavior.
-- These examples use ROLLBACK so they do not permanently change demo data.

-- Example 1: course registration is atomic.
BEGIN;

SELECT register_course(
    (SELECT student_id FROM student WHERE matric_no = 'A00024901'),
    (
        SELECT co.offering_id
        FROM course_offering co
        JOIN course c ON c.course_id = co.course_id
        WHERE c.course_code = 'CSC384'
    )
) AS demo_registration_id;

ROLLBACK;

-- Example 2: result upload updates result and writes audit log in one transaction.
BEGIN;

SELECT upload_result(
    (
        SELECT cr.reg_id
        FROM course_registration cr
        JOIN student s ON s.student_id = cr.student_id
        JOIN course_offering co ON co.offering_id = cr.offering_id
        JOIN course c ON c.course_id = co.course_id
        WHERE s.matric_no = 'A00025332'
          AND c.course_code = 'MTH201'
    ),
    35.00,
    52.00,
    (SELECT user_id FROM user_account WHERE email = 'gabriel.ayem@unireg.test')
) AS demo_result_id;

SELECT
    al.created_at,
    ua.email AS actor,
    al.action,
    al.table_name,
    al.record_id
FROM audit_log al
LEFT JOIN user_account ua ON ua.user_id = al.user_id
ORDER BY al.created_at DESC
LIMIT 5;

ROLLBACK;

-- Example 3: duplicate registration is rejected by the unique constraint.
-- Keep this commented unless demonstrating an intentional error.
--
-- BEGIN;
-- INSERT INTO course_registration (student_id, offering_id)
-- SELECT student_id, offering_id
-- FROM course_registration
-- WHERE reg_id = (
--     SELECT min(reg_id)
--     FROM course_registration
-- );
-- ROLLBACK;
