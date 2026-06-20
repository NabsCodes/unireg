-- UniReg triggers.
-- Run after 04_functions.sql.

CREATE OR REPLACE FUNCTION set_updated_at()
RETURNS trigger
LANGUAGE plpgsql
AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$;

CREATE OR REPLACE FUNCTION set_result_grade_fields()
RETURNS trigger
LANGUAGE plpgsql
AS $$
DECLARE
    v_grade varchar(4);
    v_grade_point numeric(3,2);
BEGIN
    NEW.total_score = NEW.ca_score + NEW.exam_score;

    SELECT g.grade, g.grade_point
    INTO v_grade, v_grade_point
    FROM get_grade_for_score(NEW.total_score) g;

    IF v_grade IS NULL THEN
        RAISE EXCEPTION 'No grade scale entry found for score %', NEW.total_score;
    END IF;

    NEW.grade = v_grade;
    NEW.grade_point = v_grade_point;
    NEW.updated_at = now();

    RETURN NEW;
END;
$$;

CREATE OR REPLACE FUNCTION write_result_audit_log()
RETURNS trigger
LANGUAGE plpgsql
AS $$
DECLARE
    v_user_id integer;
BEGIN
    v_user_id = NULLIF(current_setting('app.current_user_id', true), '')::integer;

    IF TG_OP = 'INSERT' THEN
        INSERT INTO audit_log (user_id, action, table_name, record_id, new_data)
        VALUES (
            v_user_id,
            'RESULT_INSERTED',
            TG_TABLE_NAME,
            NEW.result_id,
            to_jsonb(NEW)
        );
        RETURN NEW;
    ELSIF TG_OP = 'UPDATE' THEN
        INSERT INTO audit_log (
            user_id,
            action,
            table_name,
            record_id,
            old_data,
            new_data
        )
        VALUES (
            v_user_id,
            'RESULT_UPDATED',
            TG_TABLE_NAME,
            NEW.result_id,
            to_jsonb(OLD),
            to_jsonb(NEW)
        );
        RETURN NEW;
    END IF;

    RETURN NULL;
END;
$$;

CREATE TRIGGER trg_department_updated_at
BEFORE UPDATE ON department
FOR EACH ROW
EXECUTE FUNCTION set_updated_at();

CREATE TRIGGER trg_lecturer_updated_at
BEFORE UPDATE ON lecturer
FOR EACH ROW
EXECUTE FUNCTION set_updated_at();

CREATE TRIGGER trg_student_updated_at
BEFORE UPDATE ON student
FOR EACH ROW
EXECUTE FUNCTION set_updated_at();

CREATE TRIGGER trg_user_account_updated_at
BEFORE UPDATE ON user_account
FOR EACH ROW
EXECUTE FUNCTION set_updated_at();

CREATE TRIGGER trg_academic_session_updated_at
BEFORE UPDATE ON academic_session
FOR EACH ROW
EXECUTE FUNCTION set_updated_at();

CREATE TRIGGER trg_semester_updated_at
BEFORE UPDATE ON semester
FOR EACH ROW
EXECUTE FUNCTION set_updated_at();

CREATE TRIGGER trg_course_updated_at
BEFORE UPDATE ON course
FOR EACH ROW
EXECUTE FUNCTION set_updated_at();

CREATE TRIGGER trg_course_offering_updated_at
BEFORE UPDATE ON course_offering
FOR EACH ROW
EXECUTE FUNCTION set_updated_at();

CREATE TRIGGER trg_course_registration_updated_at
BEFORE UPDATE ON course_registration
FOR EACH ROW
EXECUTE FUNCTION set_updated_at();

CREATE TRIGGER trg_result_grade_fields
BEFORE INSERT OR UPDATE OF ca_score, exam_score ON result
FOR EACH ROW
EXECUTE FUNCTION set_result_grade_fields();

CREATE TRIGGER trg_result_audit_log
AFTER INSERT OR UPDATE ON result
FOR EACH ROW
EXECUTE FUNCTION write_result_audit_log();
