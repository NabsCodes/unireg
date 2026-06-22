from datetime import date, datetime
from decimal import Decimal
from typing import Literal

from pydantic import BaseModel


class DepartmentCreate(BaseModel):
    dept_name: str
    faculty: str
    hod_id: int | None = None


class DepartmentUpdate(BaseModel):
    dept_name: str | None = None
    faculty: str | None = None
    hod_id: int | None = None


class DepartmentRow(BaseModel):
    dept_id: int
    dept_name: str
    faculty: str
    hod_id: int | None = None
    hod_name: str | None = None
    student_count: int = 0


class StudentCreate(BaseModel):
    matric_no: str | None = None
    first_name: str
    last_name: str
    email: str
    level: str
    dept_id: int
    status: str = "active"


class StudentUpdate(BaseModel):
    first_name: str | None = None
    last_name: str | None = None
    email: str | None = None
    level: str | None = None
    dept_id: int | None = None
    status: str | None = None


class StudentRow(BaseModel):
    student_id: int
    matric_no: str
    first_name: str
    last_name: str
    email: str
    level: str
    dept_id: int
    dept_name: str
    status: str


class LecturerCreate(BaseModel):
    staff_no: str | None = None
    first_name: str
    last_name: str
    email: str
    title: str
    dept_id: int


class LecturerUpdate(BaseModel):
    first_name: str | None = None
    last_name: str | None = None
    email: str | None = None
    title: str | None = None
    dept_id: int | None = None


class LecturerRow(BaseModel):
    lecturer_id: int
    staff_no: str
    first_name: str
    last_name: str
    email: str
    title: str
    dept_id: int
    dept_name: str


class CourseCreate(BaseModel):
    course_code: str
    course_title: str
    credit_units: int
    level: str
    dept_id: int


class CourseUpdate(BaseModel):
    course_title: str | None = None
    credit_units: int | None = None
    level: str | None = None
    dept_id: int | None = None


class CourseRow(BaseModel):
    course_id: int
    course_code: str
    course_title: str
    credit_units: int
    level: str
    dept_id: int
    dept_name: str


class AcademicSessionCreate(BaseModel):
    session_name: str
    start_date: date
    end_date: date
    is_current: bool = False


class AcademicSessionRow(BaseModel):
    session_id: int
    session_name: str
    start_date: date
    end_date: date
    is_current: bool


class SemesterCreate(BaseModel):
    session_id: int
    semester_name: Literal["First Semester", "Second Semester", "Summer"]
    start_date: date
    end_date: date


class SemesterRow(BaseModel):
    semester_id: int
    session_id: int
    session_name: str
    semester_name: str
    start_date: date
    end_date: date


class CourseOfferingCreate(BaseModel):
    course_id: int
    semester_id: int
    max_capacity: int
    status: Literal["open", "closed", "archived"] = "open"
    lecturer_ids: list[int] = []


class CourseOfferingUpdate(BaseModel):
    max_capacity: int | None = None
    status: Literal["open", "closed", "archived"] | None = None
    lecturer_ids: list[int] | None = None


class CourseOfferingRow(BaseModel):
    offering_id: int
    course_id: int
    course_code: str
    course_title: str
    semester_id: int
    semester_name: str
    session_name: str
    max_capacity: int
    status: str
    registered_students: int
    lecturers: list[str]
    lecturer_ids: list[int] = []


class AuditLogRow(BaseModel):
    log_id: int
    user_id: int | None
    action: str
    table_name: str
    record_id: int
    old_values: dict | None
    new_values: dict | None
    created_at: datetime
    actor_name: str | None = None
    student_name: str | None = None
    matric_no: str | None = None
    course_code: str | None = None
    course_title: str | None = None


class GradeScaleRow(BaseModel):
    grade: str
    min_score: Decimal
    max_score: Decimal
    grade_point: Decimal
    remark: str
