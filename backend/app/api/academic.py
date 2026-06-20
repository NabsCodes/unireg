from fastapi import APIRouter

from app.schemas.academic import AvailableCourseOffering
from app.services.academic import list_available_course_offerings

router = APIRouter()


@router.get("/course-offerings", response_model=list[AvailableCourseOffering])
def available_course_offerings() -> list[dict]:
    return list_available_course_offerings()
