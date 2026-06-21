from typing import Annotated

from fastapi import APIRouter, Depends, HTTPException, status

from app.core.security import require_roles
from app.schemas.academic import DashboardSummary
from app.schemas.admin import (
    AcademicSessionCreate,
    AcademicSessionRow,
    AuditLogRow,
    CourseCreate,
    CourseOfferingCreate,
    CourseOfferingRow,
    CourseOfferingUpdate,
    CourseRow,
    CourseUpdate,
    DepartmentCreate,
    DepartmentRow,
    DepartmentUpdate,
    GradeScaleRow,
    LecturerCreate,
    LecturerRow,
    LecturerUpdate,
    SemesterCreate,
    SemesterRow,
    StudentCreate,
    StudentRow,
    StudentUpdate,
)
from app.schemas.auth import AuthUser
from app.services import admin as admin_service
from app.services.academic import get_dashboard_summary

router = APIRouter()
AdminUser = Annotated[AuthUser, Depends(require_roles("admin"))]


def _not_found(resource: str) -> None:
    raise HTTPException(
        status_code=status.HTTP_404_NOT_FOUND,
        detail=f"{resource} not found",
    )


@router.get("/dashboard", response_model=DashboardSummary)
def dashboard_summary(_: AdminUser) -> dict:
    summary = get_dashboard_summary()
    if summary is None:
        _not_found("Dashboard summary")
    return summary


@router.get("/departments", response_model=list[DepartmentRow])
def departments(_: AdminUser) -> list[dict]:
    return admin_service.list_departments()


@router.post("/departments", response_model=DepartmentRow, status_code=201)
def create_department(payload: DepartmentCreate, _: AdminUser) -> dict:
    row = admin_service.create_department(payload.model_dump())
    if row is None:
        _not_found("Department")
    return row


@router.patch("/departments/{dept_id}", response_model=DepartmentRow)
def update_department(
    dept_id: int,
    payload: DepartmentUpdate,
    _: AdminUser,
) -> dict:
    row = admin_service.update_department(
        dept_id,
        payload.model_dump(exclude_unset=True),
    )
    if row is None:
        _not_found("Department")
    return row


@router.get("/students", response_model=list[StudentRow])
def students(_: AdminUser) -> list[dict]:
    return admin_service.list_students()


@router.post("/students", response_model=StudentRow, status_code=201)
def create_student(payload: StudentCreate, _: AdminUser) -> dict:
    row = admin_service.create_student(payload.model_dump())
    if row is None:
        _not_found("Student")
    return row


@router.patch("/students/{student_id}", response_model=StudentRow)
def update_student(student_id: int, payload: StudentUpdate, _: AdminUser) -> dict:
    row = admin_service.update_student(
        student_id,
        payload.model_dump(exclude_unset=True),
    )
    if row is None:
        _not_found("Student")
    return row


@router.get("/lecturers", response_model=list[LecturerRow])
def lecturers(_: AdminUser) -> list[dict]:
    return admin_service.list_lecturers()


@router.post("/lecturers", response_model=LecturerRow, status_code=201)
def create_lecturer(payload: LecturerCreate, _: AdminUser) -> dict:
    row = admin_service.create_lecturer(payload.model_dump())
    if row is None:
        _not_found("Lecturer")
    return row


@router.patch("/lecturers/{lecturer_id}", response_model=LecturerRow)
def update_lecturer(
    lecturer_id: int,
    payload: LecturerUpdate,
    _: AdminUser,
) -> dict:
    row = admin_service.update_lecturer(
        lecturer_id,
        payload.model_dump(exclude_unset=True),
    )
    if row is None:
        _not_found("Lecturer")
    return row


@router.get("/courses", response_model=list[CourseRow])
def courses(_: AdminUser) -> list[dict]:
    return admin_service.list_courses()


@router.post("/courses", response_model=CourseRow, status_code=201)
def create_course(payload: CourseCreate, _: AdminUser) -> dict:
    row = admin_service.create_course(payload.model_dump())
    if row is None:
        _not_found("Course")
    return row


@router.patch("/courses/{course_id}", response_model=CourseRow)
def update_course(course_id: int, payload: CourseUpdate, _: AdminUser) -> dict:
    row = admin_service.update_course(
        course_id,
        payload.model_dump(exclude_unset=True),
    )
    if row is None:
        _not_found("Course")
    return row


@router.get("/sessions", response_model=list[AcademicSessionRow])
def academic_sessions(_: AdminUser) -> list[dict]:
    return admin_service.list_academic_sessions()


@router.post("/sessions", response_model=AcademicSessionRow, status_code=201)
def create_academic_session(payload: AcademicSessionCreate, _: AdminUser) -> dict:
    row = admin_service.create_academic_session(payload.model_dump())
    if row is None:
        _not_found("Academic session")
    return row


@router.get("/semesters", response_model=list[SemesterRow])
def semesters(_: AdminUser) -> list[dict]:
    return admin_service.list_semesters()


@router.post("/semesters", response_model=SemesterRow, status_code=201)
def create_semester(payload: SemesterCreate, _: AdminUser) -> dict:
    row = admin_service.create_semester(payload.model_dump())
    if row is None:
        _not_found("Semester")
    return row


@router.get("/offerings", response_model=list[CourseOfferingRow])
def course_offerings(_: AdminUser) -> list[dict]:
    return admin_service.list_course_offerings()


@router.post("/offerings", response_model=CourseOfferingRow, status_code=201)
def create_course_offering(payload: CourseOfferingCreate, _: AdminUser) -> dict:
    row = admin_service.create_course_offering(payload.model_dump())
    if row is None:
        _not_found("Course offering")
    return row


@router.patch("/offerings/{offering_id}", response_model=CourseOfferingRow)
def update_course_offering(
    offering_id: int,
    payload: CourseOfferingUpdate,
    _: AdminUser,
) -> dict:
    row = admin_service.update_course_offering(
        offering_id,
        payload.model_dump(exclude_unset=True),
    )
    if row is None:
        _not_found("Course offering")
    return row


@router.get("/audit-logs", response_model=list[AuditLogRow])
def audit_logs(_: AdminUser) -> list[dict]:
    return admin_service.list_audit_logs()


@router.get("/grade-scale", response_model=list[GradeScaleRow])
def grade_scale(_: AdminUser) -> list[dict]:
    return admin_service.list_grade_scale()
