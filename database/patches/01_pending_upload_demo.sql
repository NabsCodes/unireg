-- Add one pending upload demo row for Dr. Gabriel / CSC384 (Maryam Bello).
-- Safe to run on an existing seeded database. Idempotent where possible.

INSERT INTO course_registration (student_id, offering_id, reg_date, status)
SELECT s.student_id, co.offering_id, DATE '2025-09-12', 'registered'
FROM student s
CROSS JOIN course_offering co
JOIN course c ON c.course_id = co.course_id
WHERE s.matric_no = 'A00024901'
  AND c.course_code = 'CSC384'
  AND NOT EXISTS (
      SELECT 1
      FROM course_registration cr
      WHERE cr.student_id = s.student_id
        AND cr.offering_id = co.offering_id
  );
