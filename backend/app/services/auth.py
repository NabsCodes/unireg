from app.core.security import create_access_token, verify_password
from app.schemas.auth import AuthUser, LoginResponse
from app.services.query import fetch_one


def get_user_by_id(user_id: int) -> dict | None:
    return fetch_one(
        """
        SELECT
            ua.user_id,
            ua.email,
            ua.role,
            ua.student_id,
            ua.lecturer_id,
            s.matric_no,
            l.staff_no,
            CASE
                WHEN ua.role = 'student'
                    THEN s.first_name || ' ' || s.last_name
                WHEN ua.role = 'lecturer'
                    THEN l.title || ' ' || l.first_name || ' ' || l.last_name
                ELSE 'Registry Administrator'
            END AS name
        FROM user_account ua
        LEFT JOIN student s ON s.student_id = ua.student_id
        LEFT JOIN lecturer l ON l.lecturer_id = ua.lecturer_id
        WHERE ua.user_id = %s
          AND ua.is_active = true
        """,
        (user_id,),
    )


def get_login_account(identifier: str) -> dict | None:
    normalized = identifier.strip().lower()
    return fetch_one(
        """
        SELECT
            ua.user_id,
            ua.email,
            ua.password_hash,
            ua.role,
            ua.student_id,
            ua.lecturer_id,
            s.matric_no,
            l.staff_no,
            CASE
                WHEN ua.role = 'student'
                    THEN s.first_name || ' ' || s.last_name
                WHEN ua.role = 'lecturer'
                    THEN l.title || ' ' || l.first_name || ' ' || l.last_name
                ELSE 'Registry Administrator'
            END AS name
        FROM user_account ua
        LEFT JOIN student s ON s.student_id = ua.student_id
        LEFT JOIN lecturer l ON l.lecturer_id = ua.lecturer_id
        WHERE ua.is_active = true
          AND (
              lower(ua.email) = %s
              OR lower(s.matric_no) = %s
              OR lower(l.staff_no) = %s
          )
        """,
        (normalized, normalized, normalized),
    )


def authenticate(identifier: str, password: str) -> LoginResponse | None:
    account = get_login_account(identifier)
    if account is None:
        return None

    password_hash = account.pop("password_hash")
    if not verify_password(password, password_hash):
        return None

    user = AuthUser(**account)
    return LoginResponse(access_token=create_access_token(user), user=user)
