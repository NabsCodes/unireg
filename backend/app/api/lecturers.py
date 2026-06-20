from fastapi import APIRouter

from app.schemas.academic import LecturerCourseRow
from app.services.academic import list_lecturer_courses

router = APIRouter()


@router.get("/{staff_no}/courses", response_model=list[LecturerCourseRow])
def lecturer_courses(staff_no: str) -> list[dict]:
    return list_lecturer_courses(staff_no)
