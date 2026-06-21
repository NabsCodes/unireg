from typing import Annotated

from fastapi import APIRouter, Depends, HTTPException, status
from psycopg import Error as PsycopgError

from app.core.security import require_roles
from app.schemas.academic import (
    CourseRegistrationRequest,
    CourseRegistrationResponse,
    StudentAvailableCourseOffering,
    StudentResultRow,
)
from app.schemas.auth import AuthUser
from app.services.academic import (
    drop_course_for_student,
    list_available_course_offerings_for_student,
    list_student_results,
    list_student_results_by_id,
    register_course_for_student,
)

router = APIRouter()
StudentUser = Annotated[AuthUser, Depends(require_roles("student"))]


def _student_id(user: AuthUser) -> int:
    if user.student_id is None:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Student account is not linked to a student record",
        )
    return user.student_id


@router.get("/me/course-offerings", response_model=list[StudentAvailableCourseOffering])
def my_course_offerings(user: StudentUser) -> list[dict]:
    return list_available_course_offerings_for_student(_student_id(user))


@router.post(
    "/me/registrations",
    response_model=CourseRegistrationResponse,
    status_code=201,
)
def register_course(
    payload: CourseRegistrationRequest,
    user: StudentUser,
) -> dict:
    try:
        row = register_course_for_student(_student_id(user), payload.offering_id)
    except PsycopgError as exc:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(exc).splitlines()[0],
        ) from exc

    if row is None:
        raise HTTPException(status_code=404, detail="Course offering not found")
    return row


@router.delete(
    "/me/registrations/{offering_id}",
    response_model=CourseRegistrationResponse,
)
def drop_course(offering_id: int, user: StudentUser) -> dict:
    row = drop_course_for_student(_student_id(user), offering_id)
    if row is None:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Registration cannot be dropped or was not found",
        )
    return row


@router.get("/me/results", response_model=list[StudentResultRow])
def my_results(user: StudentUser) -> list[dict]:
    return list_student_results_by_id(_student_id(user))


@router.get("/me/transcript", response_model=list[StudentResultRow])
def my_transcript(user: StudentUser) -> list[dict]:
    return list_student_results_by_id(_student_id(user))


@router.get("/{matric_no}/results", response_model=list[StudentResultRow])
def student_results(matric_no: str) -> list[dict]:
    return list_student_results(matric_no)


@router.get("/{matric_no}/transcript", response_model=list[StudentResultRow])
def student_transcript(matric_no: str) -> list[dict]:
    return list_student_results(matric_no)
