-- UniReg schema.
-- PostgreSQL target.
--
-- This file owns the relational structure: tables, primary keys, foreign keys,
-- check constraints, unique constraints, and indexes.

BEGIN;

DROP TABLE IF EXISTS audit_log CASCADE;
DROP TABLE IF EXISTS result CASCADE;
DROP TABLE IF EXISTS course_registration CASCADE;
DROP TABLE IF EXISTS course_assignment CASCADE;
DROP TABLE IF EXISTS course_offering CASCADE;
DROP TABLE IF EXISTS course CASCADE;
DROP TABLE IF EXISTS semester CASCADE;
DROP TABLE IF EXISTS academic_session CASCADE;
DROP TABLE IF EXISTS user_account CASCADE;
DROP TABLE IF EXISTS student CASCADE;
DROP TABLE IF EXISTS lecturer CASCADE;
DROP TABLE IF EXISTS department CASCADE;
DROP TABLE IF EXISTS grade_scale CASCADE;

CREATE TABLE department (
    dept_id integer GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    dept_name varchar(120) NOT NULL,
    faculty varchar(120) NOT NULL,
    hod_id integer,
    created_at timestamptz NOT NULL DEFAULT now(),
    updated_at timestamptz NOT NULL DEFAULT now(),

    CONSTRAINT uq_department_name UNIQUE (dept_name)
);

CREATE TABLE lecturer (
    lecturer_id integer GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    staff_no varchar(30) NOT NULL,
    first_name varchar(80) NOT NULL,
    last_name varchar(80) NOT NULL,
    email varchar(160) NOT NULL,
    title varchar(40) NOT NULL,
    dept_id integer NOT NULL REFERENCES department (dept_id) ON UPDATE CASCADE,
    created_at timestamptz NOT NULL DEFAULT now(),
    updated_at timestamptz NOT NULL DEFAULT now(),

    CONSTRAINT uq_lecturer_staff_no UNIQUE (staff_no),
    CONSTRAINT uq_lecturer_email UNIQUE (email)
);

ALTER TABLE department
    ADD CONSTRAINT fk_department_hod
    FOREIGN KEY (hod_id)
    REFERENCES lecturer (lecturer_id)
    ON UPDATE CASCADE
    ON DELETE SET NULL
    DEFERRABLE INITIALLY DEFERRED;

CREATE TABLE student (
    student_id integer GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    matric_no varchar(30) NOT NULL,
    first_name varchar(80) NOT NULL,
    last_name varchar(80) NOT NULL,
    email varchar(160) NOT NULL,
    level varchar(10) NOT NULL,
    dept_id integer NOT NULL REFERENCES department (dept_id) ON UPDATE CASCADE,
    status varchar(20) NOT NULL DEFAULT 'active',
    created_at timestamptz NOT NULL DEFAULT now(),
    updated_at timestamptz NOT NULL DEFAULT now(),

    CONSTRAINT uq_student_matric_no UNIQUE (matric_no),
    CONSTRAINT uq_student_email UNIQUE (email),
    CONSTRAINT chk_student_level CHECK (level IN ('100', '200', '300', '400', '500')),
    CONSTRAINT chk_student_status CHECK (
        status IN ('active', 'inactive', 'graduated', 'suspended')
    )
);

CREATE TABLE user_account (
    user_id integer GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    email varchar(160) NOT NULL,
    password_hash text NOT NULL,
    role varchar(20) NOT NULL,
    student_id integer REFERENCES student (student_id)
        ON UPDATE CASCADE
        ON DELETE CASCADE,
    lecturer_id integer REFERENCES lecturer (lecturer_id)
        ON UPDATE CASCADE
        ON DELETE CASCADE,
    is_active boolean NOT NULL DEFAULT true,
    created_at timestamptz NOT NULL DEFAULT now(),
    updated_at timestamptz NOT NULL DEFAULT now(),

    CONSTRAINT uq_user_account_email UNIQUE (email),
    CONSTRAINT chk_user_account_role CHECK (role IN ('admin', 'lecturer', 'student')),
    CONSTRAINT chk_user_account_owner CHECK (
        (role = 'admin' AND student_id IS NULL AND lecturer_id IS NULL)
        OR (role = 'student' AND student_id IS NOT NULL AND lecturer_id IS NULL)
        OR (role = 'lecturer' AND student_id IS NULL AND lecturer_id IS NOT NULL)
    )
);

CREATE UNIQUE INDEX uq_user_account_student_id
    ON user_account (student_id)
    WHERE student_id IS NOT NULL;

CREATE UNIQUE INDEX uq_user_account_lecturer_id
    ON user_account (lecturer_id)
    WHERE lecturer_id IS NOT NULL;

CREATE TABLE academic_session (
    session_id integer GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    session_name varchar(20) NOT NULL,
    start_date date NOT NULL,
    end_date date NOT NULL,
    is_current boolean NOT NULL DEFAULT false,
    created_at timestamptz NOT NULL DEFAULT now(),
    updated_at timestamptz NOT NULL DEFAULT now(),

    CONSTRAINT uq_academic_session_name UNIQUE (session_name),
    CONSTRAINT chk_academic_session_dates CHECK (start_date < end_date)
);

CREATE UNIQUE INDEX uq_current_academic_session
    ON academic_session (is_current)
    WHERE is_current;

CREATE TABLE semester (
    semester_id integer GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    session_id integer NOT NULL REFERENCES academic_session (session_id)
        ON UPDATE CASCADE
        ON DELETE CASCADE,
    semester_name varchar(40) NOT NULL,
    start_date date NOT NULL,
    end_date date NOT NULL,
    created_at timestamptz NOT NULL DEFAULT now(),
    updated_at timestamptz NOT NULL DEFAULT now(),

    CONSTRAINT uq_semester_session_name UNIQUE (session_id, semester_name),
    CONSTRAINT chk_semester_name CHECK (
        semester_name IN ('First Semester', 'Second Semester', 'Summer')
    ),
    CONSTRAINT chk_semester_dates CHECK (start_date < end_date)
);

CREATE TABLE course (
    course_id integer GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    course_code varchar(20) NOT NULL,
    course_title varchar(180) NOT NULL,
    credit_units integer NOT NULL,
    level varchar(10) NOT NULL,
    dept_id integer NOT NULL REFERENCES department (dept_id) ON UPDATE CASCADE,
    created_at timestamptz NOT NULL DEFAULT now(),
    updated_at timestamptz NOT NULL DEFAULT now(),

    CONSTRAINT uq_course_code UNIQUE (course_code),
    CONSTRAINT chk_course_credit_units CHECK (credit_units BETWEEN 1 AND 6),
    CONSTRAINT chk_course_level CHECK (level IN ('100', '200', '300', '400', '500'))
);

CREATE TABLE course_offering (
    offering_id integer GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    course_id integer NOT NULL REFERENCES course (course_id)
        ON UPDATE CASCADE
        ON DELETE CASCADE,
    semester_id integer NOT NULL REFERENCES semester (semester_id)
        ON UPDATE CASCADE
        ON DELETE CASCADE,
    max_capacity integer NOT NULL,
    status varchar(20) NOT NULL DEFAULT 'open',
    created_at timestamptz NOT NULL DEFAULT now(),
    updated_at timestamptz NOT NULL DEFAULT now(),

    CONSTRAINT uq_course_offering_course_semester UNIQUE (course_id, semester_id),
    CONSTRAINT chk_course_offering_capacity CHECK (max_capacity > 0),
    CONSTRAINT chk_course_offering_status CHECK (
        status IN ('open', 'closed', 'archived')
    )
);

CREATE TABLE course_assignment (
    assignment_id integer GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    offering_id integer NOT NULL REFERENCES course_offering (offering_id)
        ON UPDATE CASCADE
        ON DELETE CASCADE,
    lecturer_id integer NOT NULL REFERENCES lecturer (lecturer_id)
        ON UPDATE CASCADE
        ON DELETE RESTRICT,
    created_at timestamptz NOT NULL DEFAULT now(),

    CONSTRAINT uq_course_assignment_offering_lecturer UNIQUE (
        offering_id,
        lecturer_id
    )
);

CREATE TABLE course_registration (
    reg_id integer GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    student_id integer NOT NULL REFERENCES student (student_id)
        ON UPDATE CASCADE
        ON DELETE CASCADE,
    offering_id integer NOT NULL REFERENCES course_offering (offering_id)
        ON UPDATE CASCADE
        ON DELETE CASCADE,
    reg_date date NOT NULL DEFAULT current_date,
    status varchar(20) NOT NULL DEFAULT 'registered',
    created_at timestamptz NOT NULL DEFAULT now(),
    updated_at timestamptz NOT NULL DEFAULT now(),

    CONSTRAINT uq_course_registration_student_offering UNIQUE (
        student_id,
        offering_id
    ),
    CONSTRAINT chk_course_registration_status CHECK (
        status IN ('registered', 'dropped', 'withdrawn')
    )
);

CREATE TABLE grade_scale (
    grade varchar(4) PRIMARY KEY,
    min_score numeric(5,2) NOT NULL,
    max_score numeric(5,2) NOT NULL,
    grade_point numeric(3,2) NOT NULL,
    remark varchar(80) NOT NULL,

    CONSTRAINT chk_grade_scale_score_range CHECK (
        min_score >= 0
        AND max_score <= 100
        AND min_score <= max_score
    ),
    CONSTRAINT chk_grade_scale_point CHECK (grade_point BETWEEN 0 AND 4)
);

CREATE TABLE result (
    result_id integer GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    reg_id integer NOT NULL REFERENCES course_registration (reg_id)
        ON UPDATE CASCADE
        ON DELETE CASCADE,
    ca_score numeric(5,2) NOT NULL,
    exam_score numeric(5,2) NOT NULL,
    total_score numeric(5,2) NOT NULL,
    grade varchar(4) NOT NULL REFERENCES grade_scale (grade)
        ON UPDATE CASCADE
        ON DELETE RESTRICT,
    grade_point numeric(3,2) NOT NULL,
    created_at timestamptz NOT NULL DEFAULT now(),
    updated_at timestamptz NOT NULL DEFAULT now(),

    CONSTRAINT uq_result_registration UNIQUE (reg_id),
    CONSTRAINT chk_result_ca_score CHECK (ca_score BETWEEN 0 AND 40),
    CONSTRAINT chk_result_exam_score CHECK (exam_score BETWEEN 0 AND 60),
    CONSTRAINT chk_result_total_score CHECK (total_score BETWEEN 0 AND 100),
    CONSTRAINT chk_result_total_matches_parts CHECK (
        total_score = ca_score + exam_score
    ),
    CONSTRAINT chk_result_grade_point CHECK (grade_point BETWEEN 0 AND 4)
);

CREATE TABLE audit_log (
    log_id integer GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    user_id integer REFERENCES user_account (user_id)
        ON UPDATE CASCADE
        ON DELETE SET NULL,
    action varchar(80) NOT NULL,
    table_name varchar(80) NOT NULL,
    record_id integer NOT NULL,
    old_data jsonb,
    new_data jsonb,
    created_at timestamptz NOT NULL DEFAULT now(),

    CONSTRAINT chk_audit_log_action CHECK (length(action) > 0),
    CONSTRAINT chk_audit_log_table_name CHECK (length(table_name) > 0)
);

CREATE INDEX idx_student_department ON student (dept_id);
CREATE INDEX idx_lecturer_department ON lecturer (dept_id);
CREATE INDEX idx_course_department ON course (dept_id);
CREATE INDEX idx_semester_session ON semester (session_id);
CREATE INDEX idx_course_offering_semester ON course_offering (semester_id);
CREATE INDEX idx_course_assignment_lecturer ON course_assignment (lecturer_id);
CREATE INDEX idx_course_registration_student ON course_registration (student_id);
CREATE INDEX idx_course_registration_offering ON course_registration (offering_id);
CREATE INDEX idx_result_grade ON result (grade);
CREATE INDEX idx_audit_log_user_created ON audit_log (user_id, created_at DESC);
CREATE INDEX idx_audit_log_table_record ON audit_log (table_name, record_id);

COMMIT;
