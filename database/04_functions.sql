-- UniReg functions and stored procedures.
-- Run after 03_views.sql.

CREATE OR REPLACE FUNCTION get_grade_for_score(p_total_score numeric)
RETURNS TABLE (grade varchar, grade_point numeric)
LANGUAGE sql
STABLE
AS $$
    SELECT gs.grade, gs.grade_point
    FROM grade_scale gs
    WHERE p_total_score BETWEEN gs.min_score AND gs.max_score
    ORDER BY gs.min_score DESC
    LIMIT 1
$$;

CREATE OR REPLACE FUNCTION calculate_semester_gpa(
    p_student_id integer,
    p_semester_id integer
)
RETURNS numeric
LANGUAGE sql
STABLE
AS $$
    SELECT round(
        (
            sum(r.grade_point * c.credit_units)
            / NULLIF(sum(c.credit_units), 0)
        )::numeric,
        2
    )
    FROM course_registration cr
    JOIN course_offering co ON co.offering_id = cr.offering_id
    JOIN course c ON c.course_id = co.course_id
    JOIN result r ON r.reg_id = cr.reg_id
    WHERE cr.student_id = p_student_id
      AND co.semester_id = p_semester_id
      AND cr.status = 'registered'
$$;

CREATE OR REPLACE FUNCTION calculate_cgpa(p_student_id integer)
RETURNS numeric
LANGUAGE sql
STABLE
AS $$
    SELECT round(
        (
            sum(r.grade_point * c.credit_units)
            / NULLIF(sum(c.credit_units), 0)
        )::numeric,
        2
    )
    FROM course_registration cr
    JOIN course_offering co ON co.offering_id = cr.offering_id
    JOIN course c ON c.course_id = co.course_id
    JOIN result r ON r.reg_id = cr.reg_id
    WHERE cr.student_id = p_student_id
      AND cr.status = 'registered'
$$;

CREATE OR REPLACE FUNCTION register_course(
    p_student_id integer,
    p_offering_id integer
)
RETURNS integer
LANGUAGE plpgsql
AS $$
DECLARE
    v_registration_id integer;
    v_registered_count integer;
    v_capacity integer;
    v_offering_status varchar(20);
    v_student_status varchar(20);
    v_existing_reg_id integer;
    v_existing_status varchar(20);
BEGIN
    SELECT status
    INTO v_student_status
    FROM student
    WHERE student_id = p_student_id;

    IF v_student_status IS NULL THEN
        RAISE EXCEPTION 'Student % does not exist', p_student_id;
    END IF;

    IF v_student_status <> 'active' THEN
        RAISE EXCEPTION 'Student % is not active', p_student_id;
    END IF;

    SELECT status, max_capacity
    INTO v_offering_status, v_capacity
    FROM course_offering
    WHERE offering_id = p_offering_id;

    IF v_offering_status IS NULL THEN
        RAISE EXCEPTION 'Course offering % does not exist', p_offering_id;
    END IF;

    IF v_offering_status <> 'open' THEN
        RAISE EXCEPTION 'Course offering % is not open', p_offering_id;
    END IF;

    SELECT count(*)
    INTO v_registered_count
    FROM course_registration
    WHERE offering_id = p_offering_id
      AND status = 'registered';

    IF v_registered_count >= v_capacity THEN
        RAISE EXCEPTION 'Course offering % is full', p_offering_id;
    END IF;

    SELECT reg_id, status
    INTO v_existing_reg_id, v_existing_status
    FROM course_registration
    WHERE student_id = p_student_id
      AND offering_id = p_offering_id;

    IF v_existing_status = 'registered' THEN
        RAISE EXCEPTION 'Student is already registered for offering %', p_offering_id;
    END IF;

    IF v_existing_reg_id IS NOT NULL AND v_existing_status = 'dropped' THEN
        UPDATE course_registration
        SET status = 'registered',
            reg_date = current_date,
            updated_at = now()
        WHERE reg_id = v_existing_reg_id
        RETURNING reg_id INTO v_registration_id;

        RETURN v_registration_id;
    END IF;

    INSERT INTO course_registration (student_id, offering_id)
    VALUES (p_student_id, p_offering_id)
    RETURNING reg_id INTO v_registration_id;

    RETURN v_registration_id;
END;
$$;

CREATE OR REPLACE FUNCTION upload_result(
    p_reg_id integer,
    p_ca_score numeric,
    p_exam_score numeric,
    p_user_id integer DEFAULT NULL
)
RETURNS integer
LANGUAGE plpgsql
AS $$
DECLARE
    v_result_id integer;
BEGIN
    IF p_user_id IS NOT NULL THEN
        PERFORM set_config('app.current_user_id', p_user_id::text, true);
    END IF;

    INSERT INTO result (
        reg_id,
        ca_score,
        exam_score,
        total_score,
        grade,
        grade_point
    )
    VALUES (
        p_reg_id,
        p_ca_score,
        p_exam_score,
        p_ca_score + p_exam_score,
        (SELECT g.grade FROM get_grade_for_score(p_ca_score + p_exam_score) g),
        (
            SELECT g.grade_point
            FROM get_grade_for_score(p_ca_score + p_exam_score) g
        )
    )
    ON CONFLICT (reg_id)
    DO UPDATE SET
        ca_score = EXCLUDED.ca_score,
        exam_score = EXCLUDED.exam_score,
        total_score = EXCLUDED.total_score,
        grade = EXCLUDED.grade,
        grade_point = EXCLUDED.grade_point,
        updated_at = now()
    RETURNING result_id INTO v_result_id;

    RETURN v_result_id;
END;
$$;
