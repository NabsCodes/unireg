from typing import Annotated

from fastapi import APIRouter, Depends, HTTPException, Query, status
from psycopg import Error as PsycopgError

from app.core.security import require_roles
from app.schemas.academic import (
    LecturerCourseRow,
    LecturerResultRosterRow,
    ResultUploadRequest,
    ResultUploadResponse,
)
from app.schemas.auth import AuthUser
from app.services.academic import (
    lecturer_owns_offering,
    lecturer_owns_registration,
    list_lecturer_courses,
    list_lecturer_courses_by_id,
    list_result_roster,
    upload_result_for_lecturer,
)

router = APIRouter()
LecturerUser = Annotated[AuthUser, Depends(require_roles("lecturer"))]


def _lecturer_id(user: AuthUser) -> int:
    if user.lecturer_id is None:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Lecturer account is not linked to a lecturer record",
        )
    return user.lecturer_id


@router.get("/me/courses", response_model=list[LecturerCourseRow])
def my_courses(user: LecturerUser) -> list[dict]:
    return list_lecturer_courses_by_id(_lecturer_id(user))


@router.get("/me/result-roster", response_model=list[LecturerResultRosterRow])
def my_result_roster(
    user: LecturerUser,
    offering_id: int = Query(..., gt=0),
) -> list[dict]:
    lecturer_id = _lecturer_id(user)
    if not lecturer_owns_offering(lecturer_id, offering_id):
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="You are not assigned to this course offering",
        )
    return list_result_roster(lecturer_id, offering_id)


@router.post("/me/results", response_model=ResultUploadResponse)
def upload_result(payload: ResultUploadRequest, user: LecturerUser) -> dict:
    lecturer_id = _lecturer_id(user)
    if not lecturer_owns_registration(lecturer_id, payload.reg_id):
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="You can only upload results for your assigned offerings",
        )

    try:
        row = upload_result_for_lecturer(
            payload.reg_id,
            payload.ca_score,
            payload.exam_score,
            user.user_id,
        )
    except PsycopgError as exc:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(exc).splitlines()[0],
        ) from exc

    if row is None:
        raise HTTPException(status_code=404, detail="Registration not found")
    return row


@router.get("/{staff_no}/courses", response_model=list[LecturerCourseRow])
def lecturer_courses(staff_no: str) -> list[dict]:
    return list_lecturer_courses(staff_no)
