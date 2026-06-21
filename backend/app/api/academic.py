from fastapi import APIRouter, HTTPException

from app.schemas.academic import AvailableCourseOffering, CurrentAcademicPeriod
from app.services.academic import (
    get_current_academic_period,
    list_available_course_offerings,
)

router = APIRouter()


@router.get("/current-period", response_model=CurrentAcademicPeriod)
def current_academic_period() -> dict:
    period = get_current_academic_period()
    if period is None:
        raise HTTPException(status_code=404, detail="No current academic period.")
    return period


@router.get("/course-offerings", response_model=list[AvailableCourseOffering])
def available_course_offerings() -> list[dict]:
    return list_available_course_offerings()
