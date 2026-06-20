from fastapi import APIRouter

from app.schemas.academic import StudentResultRow
from app.services.academic import list_student_results

router = APIRouter()


@router.get("/{matric_no}/results", response_model=list[StudentResultRow])
def student_results(matric_no: str) -> list[dict]:
    return list_student_results(matric_no)


@router.get("/{matric_no}/transcript", response_model=list[StudentResultRow])
def student_transcript(matric_no: str) -> list[dict]:
    return list_student_results(matric_no)
