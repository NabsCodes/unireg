from decimal import Decimal

from pydantic import BaseModel


class DashboardSummary(BaseModel):
    active_students: int
    lecturers: int
    departments: int
    courses: int
    active_registrations: int
    uploaded_results: int
    current_session: str | None


class AvailableCourseOffering(BaseModel):
    offering_id: int
    course_code: str
    course_title: str
    credit_units: int
    semester_name: str
    session_name: str
    max_capacity: int
    status: str
    registered_students: int


class StudentResultRow(BaseModel):
    matric_no: str
    student_name: str
    dept_name: str
    session_name: str
    semester_name: str
    course_code: str
    course_title: str
    credit_units: int
    ca_score: Decimal | None
    exam_score: Decimal | None
    total_score: Decimal | None
    grade: str | None
    grade_point: Decimal | None
    semester_gpa: Decimal | None
    cgpa: Decimal | None


class LecturerCourseRow(BaseModel):
    staff_no: str
    lecturer_name: str
    course_code: str
    course_title: str
    semester_name: str
    session_name: str
    registered_students: int
    results_uploaded: int
