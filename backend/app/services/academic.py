from app.services.query import fetch_all, fetch_one


def get_dashboard_summary() -> dict | None:
    return fetch_one("SELECT * FROM admin_dashboard_summary_view")


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


def list_lecturer_courses(staff_no: str) -> list[dict]:
    return fetch_all(
        """
        SELECT
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
