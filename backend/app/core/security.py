from collections.abc import Callable
from datetime import UTC, datetime, timedelta
from typing import Annotated

from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer
from jose import JWTError, jwt
from passlib.hash import pbkdf2_sha256

from app.core.config import settings
from app.schemas.auth import AuthUser
from app.services.query import fetch_one

security = HTTPBearer(auto_error=False)

JWT_ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 60 * 8


def verify_password(plain_password: str, password_hash: str) -> bool:
    return pbkdf2_sha256.verify(plain_password, password_hash)


def create_access_token(user: AuthUser) -> str:
    expires_at = datetime.now(UTC) + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    payload = {
        "sub": str(user.user_id),
        "role": user.role,
        "exp": expires_at,
    }
    return jwt.encode(payload, settings.jwt_secret_key, algorithm=JWT_ALGORITHM)


def get_current_user(
    credentials: Annotated[HTTPAuthorizationCredentials | None, Depends(security)],
) -> AuthUser:
    if credentials is None:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Authentication required",
        )

    try:
        payload = jwt.decode(
            credentials.credentials,
            settings.jwt_secret_key,
            algorithms=[JWT_ALGORITHM],
        )
        user_id = int(payload["sub"])
    except (JWTError, KeyError, ValueError) as exc:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid or expired token",
        ) from exc

    user = fetch_one(
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
    if user is None:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="User account not found",
        )

    return AuthUser(**user)


def require_roles(*roles: str) -> Callable[[AuthUser], AuthUser]:
    allowed_roles = set(roles)

    def dependency(user: Annotated[AuthUser, Depends(get_current_user)]) -> AuthUser:
        if user.role not in allowed_roles:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="You do not have permission to access this resource",
            )
        return user

    return dependency
