-- UniReg seed data.
-- Run after 01_schema.sql.

BEGIN;

INSERT INTO grade_scale (grade, min_score, max_score, grade_point, remark)
VALUES
    ('A', 93.00, 100.00, 4.00, 'Excellent'),
    ('A-', 90.00, 92.99, 3.70, 'Excellent'),
    ('B+', 87.00, 89.99, 3.30, 'Very Good'),
    ('B', 83.00, 86.99, 3.00, 'Very Good'),
    ('B-', 80.00, 82.99, 2.70, 'Good'),
    ('C+', 77.00, 79.99, 2.30, 'Good'),
    ('C', 73.00, 76.99, 2.00, 'Satisfactory'),
    ('C-', 70.00, 72.99, 1.70, 'Pass'),
    ('D', 60.00, 69.99, 1.00, 'Poor'),
    ('F', 0.00, 59.99, 0.00, 'Fail');

INSERT INTO department (dept_name, faculty)
VALUES
    ('Computer Science', 'School of Information Technology and Computing'),
    ('Software Engineering', 'School of Information Technology and Computing'),
    ('Information Systems', 'School of Information Technology and Computing');

INSERT INTO lecturer (staff_no, first_name, last_name, email, title, dept_id)
VALUES
    (
        'STF-CS-001',
        'Gabriel',
        'Ayem',
        'gabriel.ayem@unireg.test',
        'Dr.',
        (SELECT dept_id FROM department WHERE dept_name = 'Computer Science')
    ),
    (
        'STF-CS-002',
        'Musa',
        'Danjuma',
        'musa.danjuma@unireg.test',
        'Dr.',
        (SELECT dept_id FROM department WHERE dept_name = 'Computer Science')
    ),
    (
        'STF-SE-001',
        'Amina',
        'Yusuf',
        'amina.yusuf@unireg.test',
        'Engr.',
        (SELECT dept_id FROM department WHERE dept_name = 'Software Engineering')
    );

UPDATE department
SET hod_id = (
    SELECT lecturer_id
    FROM lecturer
    WHERE staff_no = 'STF-CS-001'
)
WHERE dept_name = 'Computer Science';

INSERT INTO student (
    matric_no,
    first_name,
    last_name,
    email,
    level,
    dept_id,
    status
)
VALUES
    (
        'A00025332',
        'Batul',
        'Hassan',
        'batul.hassan@unireg.test',
        '300',
        (SELECT dept_id FROM department WHERE dept_name = 'Computer Science'),
        'active'
    ),
    (
        'A00024575',
        'Simtong',
        'Tongnan',
        'simtong.tongnan@unireg.test',
        '300',
        (SELECT dept_id FROM department WHERE dept_name = 'Computer Science'),
        'active'
    ),
    (
        'A00024901',
        'Maryam',
        'Bello',
        'maryam.bello@unireg.test',
        '300',
        (SELECT dept_id FROM department WHERE dept_name = 'Software Engineering'),
        'active'
    );

INSERT INTO user_account (email, password_hash, role, student_id, lecturer_id)
VALUES
    (
        'admin@unireg.test',
        '$pbkdf2-sha256$29000$5Bwj5DxnDCGEkJJSau39Hw$YzyhAzpJyW965hRmeI4wgTuVe9QoGACOXujrfw4k84A',
        'admin',
        NULL,
        NULL
    ),
    (
        'batul.hassan@unireg.test',
        '$pbkdf2-sha256$29000$5Bwj5DxnDCGEkJJSau39Hw$YzyhAzpJyW965hRmeI4wgTuVe9QoGACOXujrfw4k84A',
        'student',
        (SELECT student_id FROM student WHERE matric_no = 'A00025332'),
        NULL
    ),
    (
        'simtong.tongnan@unireg.test',
        '$pbkdf2-sha256$29000$5Bwj5DxnDCGEkJJSau39Hw$YzyhAzpJyW965hRmeI4wgTuVe9QoGACOXujrfw4k84A',
        'student',
        (SELECT student_id FROM student WHERE matric_no = 'A00024575'),
        NULL
    ),
    (
        'gabriel.ayem@unireg.test',
        '$pbkdf2-sha256$29000$5Bwj5DxnDCGEkJJSau39Hw$YzyhAzpJyW965hRmeI4wgTuVe9QoGACOXujrfw4k84A',
        'lecturer',
        NULL,
        (SELECT lecturer_id FROM lecturer WHERE staff_no = 'STF-CS-001')
    ),
    (
        'musa.danjuma@unireg.test',
        '$pbkdf2-sha256$29000$5Bwj5DxnDCGEkJJSau39Hw$YzyhAzpJyW965hRmeI4wgTuVe9QoGACOXujrfw4k84A',
        'lecturer',
        NULL,
        (SELECT lecturer_id FROM lecturer WHERE staff_no = 'STF-CS-002')
    );

INSERT INTO academic_session (session_name, start_date, end_date, is_current)
VALUES
    ('2024/2025', DATE '2024-09-01', DATE '2025-07-31', false),
    ('2025/2026', DATE '2025-09-01', DATE '2026-07-31', true);

INSERT INTO semester (session_id, semester_name, start_date, end_date)
VALUES
    (
        (SELECT session_id FROM academic_session WHERE session_name = '2025/2026'),
        'First Semester',
        DATE '2025-09-01',
        DATE '2025-12-20'
    ),
    (
        (SELECT session_id FROM academic_session WHERE session_name = '2025/2026'),
        'Second Semester',
        DATE '2026-01-12',
        DATE '2026-05-15'
    );

INSERT INTO course (course_code, course_title, credit_units, level, dept_id)
VALUES
    (
        'CSC384',
        'Database Systems',
        3,
        '300',
        (SELECT dept_id FROM department WHERE dept_name = 'Computer Science')
    ),
    (
        'CSC302',
        'Operating Systems',
        3,
        '300',
        (SELECT dept_id FROM department WHERE dept_name = 'Computer Science')
    ),
    (
        'CSC305',
        'Software Engineering',
        3,
        '300',
        (SELECT dept_id FROM department WHERE dept_name = 'Software Engineering')
    ),
    (
        'MTH201',
        'Numerical Methods',
        2,
        '200',
        (SELECT dept_id FROM department WHERE dept_name = 'Computer Science')
    );

INSERT INTO course_offering (course_id, semester_id, max_capacity, status)
VALUES
    (
        (SELECT course_id FROM course WHERE course_code = 'CSC384'),
        (
            SELECT semester_id
            FROM semester sem
            JOIN academic_session acs ON acs.session_id = sem.session_id
            WHERE acs.session_name = '2025/2026'
              AND sem.semester_name = 'First Semester'
        ),
        80,
        'open'
    ),
    (
        (SELECT course_id FROM course WHERE course_code = 'CSC302'),
        (
            SELECT semester_id
            FROM semester sem
            JOIN academic_session acs ON acs.session_id = sem.session_id
            WHERE acs.session_name = '2025/2026'
              AND sem.semester_name = 'First Semester'
        ),
        70,
        'open'
    ),
    (
        (SELECT course_id FROM course WHERE course_code = 'MTH201'),
        (
            SELECT semester_id
            FROM semester sem
            JOIN academic_session acs ON acs.session_id = sem.session_id
            WHERE acs.session_name = '2025/2026'
              AND sem.semester_name = 'First Semester'
        ),
        60,
        'open'
    ),
    (
        (SELECT course_id FROM course WHERE course_code = 'CSC305'),
        (
            SELECT semester_id
            FROM semester sem
            JOIN academic_session acs ON acs.session_id = sem.session_id
            WHERE acs.session_name = '2025/2026'
              AND sem.semester_name = 'Second Semester'
        ),
        75,
        'open'
    );

INSERT INTO course_assignment (offering_id, lecturer_id)
VALUES
    (
        (
            SELECT offering_id
            FROM course_offering co
            JOIN course c ON c.course_id = co.course_id
            WHERE c.course_code = 'CSC384'
        ),
        (SELECT lecturer_id FROM lecturer WHERE staff_no = 'STF-CS-001')
    ),
    (
        (
            SELECT offering_id
            FROM course_offering co
            JOIN course c ON c.course_id = co.course_id
            WHERE c.course_code = 'CSC302'
        ),
        (SELECT lecturer_id FROM lecturer WHERE staff_no = 'STF-CS-002')
    ),
    (
        (
            SELECT offering_id
            FROM course_offering co
            JOIN course c ON c.course_id = co.course_id
            WHERE c.course_code = 'MTH201'
        ),
        (SELECT lecturer_id FROM lecturer WHERE staff_no = 'STF-CS-002')
    );

INSERT INTO course_registration (student_id, offering_id, reg_date, status)
SELECT s.student_id, co.offering_id, DATE '2025-09-10', 'registered'
FROM student s
CROSS JOIN course_offering co
JOIN course c ON c.course_id = co.course_id
WHERE s.matric_no IN ('A00025332', 'A00024575')
  AND c.course_code IN ('CSC384', 'CSC302', 'MTH201');

INSERT INTO result (
    reg_id,
    ca_score,
    exam_score,
    total_score,
    grade,
    grade_point
)
SELECT
    cr.reg_id,
    demo.ca_score,
    demo.exam_score,
    demo.ca_score + demo.exam_score AS total_score,
    gs.grade,
    gs.grade_point
FROM course_registration cr
JOIN student s ON s.student_id = cr.student_id
JOIN course_offering co ON co.offering_id = cr.offering_id
JOIN course c ON c.course_id = co.course_id
JOIN (
    VALUES
        ('A00025332', 'CSC384', 36.00, 55.00),
        ('A00025332', 'CSC302', 32.00, 50.00),
        ('A00024575', 'CSC384', 34.00, 48.00),
        ('A00024575', 'CSC302', 30.00, 43.00)
) AS demo(matric_no, course_code, ca_score, exam_score)
    ON demo.matric_no = s.matric_no
   AND demo.course_code = c.course_code
JOIN grade_scale gs
    ON demo.ca_score + demo.exam_score BETWEEN gs.min_score AND gs.max_score;

COMMIT;
