from app.services.query import execute_one, fetch_all, fetch_one

_FOCUS_SEMESTER_SQL = """
    WITH current_session AS (
        SELECT session_id, session_name
        FROM academic_session
        WHERE is_current = true
        LIMIT 1
    )
    SELECT
        cs.session_id,
        cs.session_name,
        sem.semester_id,
        sem.semester_name
    FROM current_session cs
    JOIN semester sem ON sem.session_id = cs.session_id
    ORDER BY
        (CURRENT_DATE BETWEEN sem.start_date AND sem.end_date) DESC,
        (
            SELECT count(*)
            FROM course_offering co
            WHERE co.semester_id = sem.semester_id
              AND co.status = 'open'
        ) DESC,
        sem.start_date ASC
    LIMIT 1
"""


def get_current_academic_period() -> dict | None:
    row = fetch_one(_FOCUS_SEMESTER_SQL)
    if row is None:
        return None
    return {
        "session_name": row["session_name"],
        "semester_name": row["semester_name"],
    }


def get_dashboard_summary() -> dict | None:
    return fetch_one("SELECT * FROM admin_dashboard_summary_view")


def get_student_dashboard(student_id: int) -> dict | None:
    focus = fetch_one(_FOCUS_SEMESTER_SQL)
    if focus is None:
        return None

    profile = fetch_one(
        """
        SELECT
            s.matric_no,
            s.first_name || ' ' || s.last_name AS student_name,
            s.email,
            s.level,
            d.dept_name,
            %s AS session_name,
            %s AS semester_name
        FROM student s
        JOIN department d ON d.dept_id = s.dept_id
        WHERE s.student_id = %s
        """,
        (
            focus["session_name"],
            focus["semester_name"],
            student_id,
        ),
    )
    if profile is None:
        return None

    registered_courses = fetch_all(
        """
        SELECT
            cr.reg_id,
            co.offering_id,
            c.course_code,
            c.course_title,
            c.credit_units,
            cr.status,
            sem.semester_name
        FROM course_registration cr
        JOIN course_offering co ON co.offering_id = cr.offering_id
        JOIN course c ON c.course_id = co.course_id
        JOIN semester sem ON sem.semester_id = co.semester_id
        WHERE cr.student_id = %s
          AND sem.semester_id = %s
          AND cr.status = 'registered'
        ORDER BY c.course_code
        """,
        (student_id, focus["semester_id"]),
    )

    gpa_row = fetch_one(
        """
        SELECT semester_gpa, cgpa
        FROM student_transcript_view
        WHERE matric_no = %s
          AND session_name = %s
          AND semester_name = %s
        LIMIT 1
        """,
        (
            profile["matric_no"],
            focus["session_name"],
            focus["semester_name"],
        ),
    )
    if gpa_row is None or gpa_row.get("cgpa") is None:
        cgpa_row = fetch_one(
            """
            SELECT cgpa
            FROM student_transcript_view
            WHERE matric_no = %s
              AND cgpa IS NOT NULL
            LIMIT 1
            """,
            (profile["matric_no"],),
        )
    else:
        cgpa_row = gpa_row

    return {
        **profile,
        "registered_courses": registered_courses,
        "registered_count": len(registered_courses),
        "semester_gpa": gpa_row["semester_gpa"] if gpa_row else None,
        "cgpa": cgpa_row["cgpa"] if cgpa_row else None,
    }


def list_available_course_offerings() -> list[dict]:
    return fetch_all(
        """
        SELECT
            co.offering_id,
            c.course_code,
            c.course_title,
            c.credit_units,
            sem.semester_name,
            acs.session_name,
            co.max_capacity,
            co.status,
            count(cr.reg_id) FILTER (WHERE cr.status = 'registered')
                AS registered_students
        FROM course_offering co
        JOIN course c ON c.course_id = co.course_id
        JOIN semester sem ON sem.semester_id = co.semester_id
        JOIN academic_session acs ON acs.session_id = sem.session_id
        LEFT JOIN course_registration cr ON cr.offering_id = co.offering_id
        WHERE acs.is_current = true
          AND co.status = 'open'
        GROUP BY
            co.offering_id,
            c.course_code,
            c.course_title,
            c.credit_units,
            sem.semester_name,
            sem.start_date,
            acs.session_name,
            co.max_capacity,
            co.status
        ORDER BY sem.start_date, c.course_code
        """
    )


def list_available_course_offerings_for_student(student_id: int) -> list[dict]:
    return fetch_all(
        """
        SELECT
            co.offering_id,
            c.course_code,
            c.course_title,
            c.credit_units,
            sem.semester_name,
            acs.session_name,
            co.max_capacity,
            co.status,
            count(cr_all.reg_id) FILTER (WHERE cr_all.status = 'registered')
                AS registered_students,
            (cr_student.reg_id IS NOT NULL AND cr_student.status = 'registered')
                AS is_registered,
            cr_student.status AS registration_status,
            COALESCE(
                EXISTS (
                    SELECT 1
                    FROM result r
                    WHERE r.reg_id = cr_student.reg_id
                ),
                false
            ) AS has_results,
            COALESCE(
                cr_student.status = 'registered'
                AND NOT EXISTS (
                    SELECT 1
                    FROM result r
                    WHERE r.reg_id = cr_student.reg_id
                ),
                false
            ) AS can_drop
        FROM course_offering co
        JOIN course c ON c.course_id = co.course_id
        JOIN semester sem ON sem.semester_id = co.semester_id
        JOIN academic_session acs ON acs.session_id = sem.session_id
        LEFT JOIN course_registration cr_all ON cr_all.offering_id = co.offering_id
        LEFT JOIN course_registration cr_student
            ON cr_student.offering_id = co.offering_id
           AND cr_student.student_id = %s
        WHERE acs.is_current = true
          AND co.status = 'open'
        GROUP BY
            co.offering_id,
            c.course_code,
            c.course_title,
            c.credit_units,
            sem.semester_name,
            sem.start_date,
            acs.session_name,
            co.max_capacity,
            co.status,
            cr_student.reg_id,
            cr_student.status
        ORDER BY sem.start_date, c.course_code
        """,
        (student_id,),
    )


def list_student_results(matric_no: str) -> list[dict]:
    return fetch_all(
        """
        SELECT
            matric_no,
            student_name,
            dept_name,
            session_name,
            semester_name,
            course_code,
            course_title,
            credit_units,
            ca_score,
            exam_score,
            total_score,
            grade,
            grade_point,
            semester_gpa,
            cgpa
        FROM student_transcript_view
        WHERE matric_no = %s
        ORDER BY session_name, semester_name, course_code
        """,
        (matric_no,),
    )


def list_student_results_by_id(student_id: int) -> list[dict]:
    student = fetch_one(
        "SELECT matric_no FROM student WHERE student_id = %s",
        (student_id,),
    )
    if student is None:
        return []
    return list_student_results(student["matric_no"])


def register_course_for_student(student_id: int, offering_id: int) -> dict | None:
    row = execute_one(
        """
        SELECT register_course(%s, %s) AS reg_id
        """,
        (student_id, offering_id),
    )
    if row is None:
        return None
    return fetch_one(
        """
        SELECT reg_id, student_id, offering_id, status
        FROM course_registration
        WHERE reg_id = %s
        """,
        (row["reg_id"],),
    )


def drop_course_for_student(student_id: int, offering_id: int) -> dict | None:
    return execute_one(
        """
        UPDATE course_registration cr
        SET status = 'dropped', updated_at = now()
        WHERE cr.student_id = %s
          AND cr.offering_id = %s
          AND cr.status = 'registered'
          AND NOT EXISTS (
              SELECT 1
              FROM result r
              WHERE r.reg_id = cr.reg_id
          )
        RETURNING reg_id, student_id, offering_id, status
        """,
        (student_id, offering_id),
    )


def list_lecturer_courses(staff_no: str) -> list[dict]:
    return fetch_all(
        """
        SELECT
            co.offering_id,
            l.staff_no,
            l.title || ' ' || l.first_name || ' ' || l.last_name
                AS lecturer_name,
            c.course_code,
            c.course_title,
            sem.semester_name,
            acs.session_name,
            count(cr.reg_id) FILTER (WHERE cr.status = 'registered')
                AS registered_students,
            count(r.result_id) AS results_uploaded
        FROM course_assignment ca
        JOIN lecturer l ON l.lecturer_id = ca.lecturer_id
        JOIN course_offering co ON co.offering_id = ca.offering_id
        JOIN course c ON c.course_id = co.course_id
        JOIN semester sem ON sem.semester_id = co.semester_id
        JOIN academic_session acs ON acs.session_id = sem.session_id
        LEFT JOIN course_registration cr
            ON cr.offering_id = co.offering_id
           AND cr.status = 'registered'
        LEFT JOIN result r ON r.reg_id = cr.reg_id
        WHERE l.staff_no = %s
        GROUP BY
            co.offering_id,
            l.staff_no,
            l.title,
            l.first_name,
            l.last_name,
            c.course_code,
            c.course_title,
            sem.semester_name,
            acs.session_name
        ORDER BY acs.session_name, sem.semester_name, c.course_code
        """,
        (staff_no,),
    )


def list_lecturer_courses_by_id(lecturer_id: int) -> list[dict]:
    lecturer = fetch_one(
        "SELECT staff_no FROM lecturer WHERE lecturer_id = %s",
        (lecturer_id,),
    )
    if lecturer is None:
        return []
    return list_lecturer_courses(lecturer["staff_no"])


def lecturer_owns_registration(lecturer_id: int, reg_id: int) -> bool:
    row = fetch_one(
        """
        SELECT 1 AS allowed
        FROM course_registration cr
        JOIN course_assignment ca ON ca.offering_id = cr.offering_id
        WHERE cr.reg_id = %s
          AND ca.lecturer_id = %s
        """,
        (reg_id, lecturer_id),
    )
    return row is not None


def lecturer_owns_offering(lecturer_id: int, offering_id: int) -> bool:
    row = fetch_one(
        """
        SELECT 1 AS allowed
        FROM course_assignment
        WHERE lecturer_id = %s
          AND offering_id = %s
        """,
        (lecturer_id, offering_id),
    )
    return row is not None


def list_offering_result_roster(offering_id: int) -> list[dict]:
    return fetch_all(
        """
        SELECT
            cr.reg_id,
            s.matric_no,
            s.first_name || ' ' || s.last_name AS student_name,
            c.course_code,
            c.course_title,
            r.ca_score,
            r.exam_score,
            r.total_score,
            r.grade,
            r.grade_point,
            CASE WHEN r.result_id IS NULL THEN 'Pending' ELSE 'Uploaded' END
                AS status
        FROM course_registration cr
        JOIN student s ON s.student_id = cr.student_id
        JOIN course_offering co ON co.offering_id = cr.offering_id
        JOIN course c ON c.course_id = co.course_id
        LEFT JOIN result r ON r.reg_id = cr.reg_id
        WHERE co.offering_id = %s
          AND cr.status = 'registered'
        ORDER BY s.matric_no
        """,
        (offering_id,),
    )


def list_result_roster(lecturer_id: int, offering_id: int) -> list[dict]:
    if not lecturer_owns_offering(lecturer_id, offering_id):
        return []
    return list_offering_result_roster(offering_id)


def save_result(
    reg_id: int,
    ca_score,
    exam_score,
    user_id: int,
) -> dict | None:
    row = execute_one(
        """
        SELECT upload_result(%s, %s, %s, %s) AS result_id
        """,
        (reg_id, ca_score, exam_score, user_id),
    )
    if row is None:
        return None
    return fetch_one(
        """
        SELECT
            result_id,
            reg_id,
            ca_score,
            exam_score,
            total_score,
            grade,
            grade_point
        FROM result
        WHERE result_id = %s
        """,
        (row["result_id"],),
    )


def upload_result_for_lecturer(
    reg_id: int,
    ca_score,
    exam_score,
    user_id: int,
) -> dict | None:
    return save_result(reg_id, ca_score, exam_score, user_id)


def upload_result_for_admin(
    reg_id: int,
    ca_score,
    exam_score,
    user_id: int,
) -> dict | None:
    return save_result(reg_id, ca_score, exam_score, user_id)
