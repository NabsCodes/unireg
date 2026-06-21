from typing import Any

from app.db.pool import get_connection
from app.services.query import execute_one, fetch_all, fetch_one


def _update_row(
    table: str,
    id_column: str,
    row_id: int,
    values: dict[str, Any],
    returning: str = "*",
) -> dict | None:
    changes = {key: value for key, value in values.items() if value is not None}
    if not changes:
        return fetch_one(
            f"SELECT {returning} FROM {table} WHERE {id_column} = %s",
            (row_id,),
        )

    set_clause = ", ".join(f"{column} = %s" for column in changes)
    params = (*changes.values(), row_id)
    return execute_one(
        f"""
        UPDATE {table}
        SET {set_clause}, updated_at = now()
        WHERE {id_column} = %s
        RETURNING {returning}
        """,
        params,
    )


def list_departments() -> list[dict]:
    return fetch_all(
        """
        SELECT
            d.dept_id,
            d.dept_name,
            d.faculty,
            d.hod_id,
            CASE
                WHEN l.lecturer_id IS NULL THEN NULL
                ELSE l.title || ' ' || l.first_name || ' ' || l.last_name
            END AS hod_name
        FROM department d
        LEFT JOIN lecturer l ON l.lecturer_id = d.hod_id
        ORDER BY d.dept_name
        """
    )


def create_department(payload: dict) -> dict | None:
    return execute_one(
        """
        INSERT INTO department (dept_name, faculty, hod_id)
        VALUES (%s, %s, %s)
        RETURNING dept_id, dept_name, faculty, hod_id, NULL::text AS hod_name
        """,
        (payload["dept_name"], payload["faculty"], payload.get("hod_id")),
    )


def update_department(dept_id: int, payload: dict) -> dict | None:
    _update_row("department", "dept_id", dept_id, payload)
    return fetch_one(
        """
        SELECT
            d.dept_id,
            d.dept_name,
            d.faculty,
            d.hod_id,
            CASE
                WHEN l.lecturer_id IS NULL THEN NULL
                ELSE l.title || ' ' || l.first_name || ' ' || l.last_name
            END AS hod_name
        FROM department d
        LEFT JOIN lecturer l ON l.lecturer_id = d.hod_id
        WHERE d.dept_id = %s
        """,
        (dept_id,),
    )


def list_students() -> list[dict]:
    return fetch_all(
        """
        SELECT
            s.student_id,
            s.matric_no,
            s.first_name,
            s.last_name,
            s.email,
            s.level,
            s.dept_id,
            d.dept_name,
            s.status
        FROM student s
        JOIN department d ON d.dept_id = s.dept_id
        ORDER BY s.matric_no
        """
    )


def create_student(payload: dict) -> dict | None:
    row = execute_one(
        """
        INSERT INTO student (
            matric_no,
            first_name,
            last_name,
            email,
            level,
            dept_id,
            status
        )
        VALUES (%s, %s, %s, %s, %s, %s, %s)
        RETURNING student_id
        """,
        (
            payload["matric_no"],
            payload["first_name"],
            payload["last_name"],
            payload["email"],
            payload["level"],
            payload["dept_id"],
            payload.get("status", "active"),
        ),
    )
    return get_student(row["student_id"]) if row else None


def get_student(student_id: int) -> dict | None:
    return fetch_one(
        """
        SELECT
            s.student_id,
            s.matric_no,
            s.first_name,
            s.last_name,
            s.email,
            s.level,
            s.dept_id,
            d.dept_name,
            s.status
        FROM student s
        JOIN department d ON d.dept_id = s.dept_id
        WHERE s.student_id = %s
        """,
        (student_id,),
    )


def update_student(student_id: int, payload: dict) -> dict | None:
    _update_row("student", "student_id", student_id, payload)
    return get_student(student_id)


def list_lecturers() -> list[dict]:
    return fetch_all(
        """
        SELECT
            l.lecturer_id,
            l.staff_no,
            l.first_name,
            l.last_name,
            l.email,
            l.title,
            l.dept_id,
            d.dept_name
        FROM lecturer l
        JOIN department d ON d.dept_id = l.dept_id
        ORDER BY l.staff_no
        """
    )


def create_lecturer(payload: dict) -> dict | None:
    row = execute_one(
        """
        INSERT INTO lecturer (staff_no, first_name, last_name, email, title, dept_id)
        VALUES (%s, %s, %s, %s, %s, %s)
        RETURNING lecturer_id
        """,
        (
            payload["staff_no"],
            payload["first_name"],
            payload["last_name"],
            payload["email"],
            payload["title"],
            payload["dept_id"],
        ),
    )
    return get_lecturer(row["lecturer_id"]) if row else None


def get_lecturer(lecturer_id: int) -> dict | None:
    return fetch_one(
        """
        SELECT
            l.lecturer_id,
            l.staff_no,
            l.first_name,
            l.last_name,
            l.email,
            l.title,
            l.dept_id,
            d.dept_name
        FROM lecturer l
        JOIN department d ON d.dept_id = l.dept_id
        WHERE l.lecturer_id = %s
        """,
        (lecturer_id,),
    )


def update_lecturer(lecturer_id: int, payload: dict) -> dict | None:
    _update_row("lecturer", "lecturer_id", lecturer_id, payload)
    return get_lecturer(lecturer_id)


def list_courses() -> list[dict]:
    return fetch_all(
        """
        SELECT
            c.course_id,
            c.course_code,
            c.course_title,
            c.credit_units,
            c.level,
            c.dept_id,
            d.dept_name
        FROM course c
        JOIN department d ON d.dept_id = c.dept_id
        ORDER BY c.course_code
        """
    )


def create_course(payload: dict) -> dict | None:
    row = execute_one(
        """
        INSERT INTO course (
            course_code,
            course_title,
            credit_units,
            level,
            dept_id
        )
        VALUES (%s, %s, %s, %s, %s)
        RETURNING course_id
        """,
        (
            payload["course_code"],
            payload["course_title"],
            payload["credit_units"],
            payload["level"],
            payload["dept_id"],
        ),
    )
    return get_course(row["course_id"]) if row else None


def get_course(course_id: int) -> dict | None:
    return fetch_one(
        """
        SELECT
            c.course_id,
            c.course_code,
            c.course_title,
            c.credit_units,
            c.level,
            c.dept_id,
            d.dept_name
        FROM course c
        JOIN department d ON d.dept_id = c.dept_id
        WHERE c.course_id = %s
        """,
        (course_id,),
    )


def update_course(course_id: int, payload: dict) -> dict | None:
    _update_row("course", "course_id", course_id, payload)
    return get_course(course_id)


def list_academic_sessions() -> list[dict]:
    return fetch_all(
        """
        SELECT session_id, session_name, start_date, end_date, is_current
        FROM academic_session
        ORDER BY start_date DESC
        """
    )


def create_academic_session(payload: dict) -> dict | None:
    with get_connection() as connection:
        with connection.cursor() as cursor:
            if payload.get("is_current"):
                cursor.execute("UPDATE academic_session SET is_current = false")
            cursor.execute(
                """
                INSERT INTO academic_session (
                    session_name,
                    start_date,
                    end_date,
                    is_current
                )
                VALUES (%s, %s, %s, %s)
                RETURNING session_id, session_name, start_date, end_date, is_current
                """,
                (
                    payload["session_name"],
                    payload["start_date"],
                    payload["end_date"],
                    payload.get("is_current", False),
                ),
            )
            row = cursor.fetchone()
            connection.commit()
            return dict(row) if row else None


def list_semesters() -> list[dict]:
    return fetch_all(
        """
        SELECT
            sem.semester_id,
            sem.session_id,
            acs.session_name,
            sem.semester_name,
            sem.start_date,
            sem.end_date
        FROM semester sem
        JOIN academic_session acs ON acs.session_id = sem.session_id
        ORDER BY acs.start_date DESC, sem.start_date
        """
    )


def create_semester(payload: dict) -> dict | None:
    row = execute_one(
        """
        INSERT INTO semester (session_id, semester_name, start_date, end_date)
        VALUES (%s, %s, %s, %s)
        RETURNING semester_id
        """,
        (
            payload["session_id"],
            payload["semester_name"],
            payload["start_date"],
            payload["end_date"],
        ),
    )
    if row is None:
        return None
    return fetch_one(
        """
        SELECT
            sem.semester_id,
            sem.session_id,
            acs.session_name,
            sem.semester_name,
            sem.start_date,
            sem.end_date
        FROM semester sem
        JOIN academic_session acs ON acs.session_id = sem.session_id
        WHERE sem.semester_id = %s
        """,
        (row["semester_id"],),
    )


def list_course_offerings() -> list[dict]:
    return fetch_all(
        """
        SELECT
            co.offering_id,
            co.course_id,
            c.course_code,
            c.course_title,
            co.semester_id,
            sem.semester_name,
            acs.session_name,
            co.max_capacity,
            co.status,
            count(DISTINCT cr.reg_id) FILTER (WHERE cr.status = 'registered')
                AS registered_students,
            coalesce(
                array_agg(
                    DISTINCT l.title || ' ' || l.first_name || ' ' || l.last_name
                ) FILTER (WHERE l.lecturer_id IS NOT NULL),
                '{}'
            ) AS lecturers
        FROM course_offering co
        JOIN course c ON c.course_id = co.course_id
        JOIN semester sem ON sem.semester_id = co.semester_id
        JOIN academic_session acs ON acs.session_id = sem.session_id
        LEFT JOIN course_registration cr ON cr.offering_id = co.offering_id
        LEFT JOIN course_assignment ca ON ca.offering_id = co.offering_id
        LEFT JOIN lecturer l ON l.lecturer_id = ca.lecturer_id
        GROUP BY
            co.offering_id,
            co.course_id,
            c.course_code,
            c.course_title,
            co.semester_id,
            sem.semester_name,
            acs.session_name,
            co.max_capacity,
            co.status
        ORDER BY acs.session_name DESC, sem.semester_name, c.course_code
        """
    )


def create_course_offering(payload: dict) -> dict | None:
    with get_connection() as connection:
        with connection.cursor() as cursor:
            cursor.execute(
                """
                INSERT INTO course_offering (
                    course_id,
                    semester_id,
                    max_capacity,
                    status
                )
                VALUES (%s, %s, %s, %s)
                RETURNING offering_id
                """,
                (
                    payload["course_id"],
                    payload["semester_id"],
                    payload["max_capacity"],
                    payload.get("status", "open"),
                ),
            )
            row = cursor.fetchone()
            if row is None:
                connection.commit()
                return None

            offering_id = row["offering_id"]
            for lecturer_id in payload.get("lecturer_ids", []):
                cursor.execute(
                    """
                    INSERT INTO course_assignment (offering_id, lecturer_id)
                    VALUES (%s, %s)
                    ON CONFLICT DO NOTHING
                    """,
                    (offering_id, lecturer_id),
                )
            connection.commit()

    return get_course_offering(offering_id)


def update_course_offering(offering_id: int, payload: dict) -> dict | None:
    with get_connection() as connection:
        with connection.cursor() as cursor:
            updates = {
                key: value
                for key, value in {
                    "max_capacity": payload.get("max_capacity"),
                    "status": payload.get("status"),
                }.items()
                if value is not None
            }
            if updates:
                set_clause = ", ".join(f"{column} = %s" for column in updates)
                cursor.execute(
                    f"""
                    UPDATE course_offering
                    SET {set_clause}, updated_at = now()
                    WHERE offering_id = %s
                    """,
                    (*updates.values(), offering_id),
                )
            if payload.get("lecturer_ids") is not None:
                cursor.execute(
                    "DELETE FROM course_assignment WHERE offering_id = %s",
                    (offering_id,),
                )
                for lecturer_id in payload["lecturer_ids"]:
                    cursor.execute(
                        """
                        INSERT INTO course_assignment (offering_id, lecturer_id)
                        VALUES (%s, %s)
                        ON CONFLICT DO NOTHING
                        """,
                        (offering_id, lecturer_id),
                    )
            connection.commit()

    return get_course_offering(offering_id)


def get_course_offering(offering_id: int) -> dict | None:
    rows = fetch_all(
        """
        SELECT *
        FROM (
            SELECT
                co.offering_id,
                co.course_id,
                c.course_code,
                c.course_title,
                co.semester_id,
                sem.semester_name,
                acs.session_name,
                co.max_capacity,
                co.status,
                count(DISTINCT cr.reg_id) FILTER (WHERE cr.status = 'registered')
                    AS registered_students,
                coalesce(
                    array_agg(
                        DISTINCT l.title || ' ' || l.first_name || ' ' || l.last_name
                    ) FILTER (WHERE l.lecturer_id IS NOT NULL),
                    '{}'
                ) AS lecturers
            FROM course_offering co
            JOIN course c ON c.course_id = co.course_id
            JOIN semester sem ON sem.semester_id = co.semester_id
            JOIN academic_session acs ON acs.session_id = sem.session_id
            LEFT JOIN course_registration cr ON cr.offering_id = co.offering_id
            LEFT JOIN course_assignment ca ON ca.offering_id = co.offering_id
            LEFT JOIN lecturer l ON l.lecturer_id = ca.lecturer_id
            WHERE co.offering_id = %s
            GROUP BY
                co.offering_id,
                co.course_id,
                c.course_code,
                c.course_title,
                co.semester_id,
                sem.semester_name,
                acs.session_name,
                co.max_capacity,
                co.status
        ) offering
        """,
        (offering_id,),
    )
    return rows[0] if rows else None


def list_audit_logs() -> list[dict]:
    return fetch_all(
        """
        SELECT
            log_id,
            user_id,
            action,
            table_name,
            record_id,
            old_values,
            new_values,
            created_at
        FROM audit_log
        ORDER BY created_at DESC, log_id DESC
        LIMIT 100
        """
    )


def list_grade_scale() -> list[dict]:
    return fetch_all(
        """
        SELECT grade, min_score, max_score, grade_point, remark
        FROM grade_scale
        ORDER BY min_score DESC
        """
    )
