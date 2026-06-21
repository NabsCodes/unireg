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


class CurrentAcademicPeriod(BaseModel):
    session_name: str
    semester_name: str


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


class StudentAvailableCourseOffering(AvailableCourseOffering):
    is_registered: bool
    registration_status: str | None = None
    has_results: bool = False
    can_drop: bool = False


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
    offering_id: int
    staff_no: str
    lecturer_name: str
    course_code: str
    course_title: str
    semester_name: str
    session_name: str
    registered_students: int
    results_uploaded: int


class StudentDashboardRegisteredCourse(BaseModel):
    reg_id: int
    offering_id: int
    course_code: str
    course_title: str
    credit_units: int
    status: str
    semester_name: str


class StudentDashboardSummary(BaseModel):
    matric_no: str
    student_name: str
    email: str
    level: str
    dept_name: str
    session_name: str
    semester_name: str | None = None
    registered_count: int
    semester_gpa: Decimal | None = None
    cgpa: Decimal | None = None
    registered_courses: list[StudentDashboardRegisteredCourse]


class CourseRegistrationRequest(BaseModel):
    offering_id: int


class CourseRegistrationResponse(BaseModel):
    reg_id: int
    student_id: int
    offering_id: int
    status: str


class LecturerResultRosterRow(BaseModel):
    reg_id: int
    matric_no: str
    student_name: str
    course_code: str
    course_title: str
    ca_score: Decimal | None
    exam_score: Decimal | None
    total_score: Decimal | None
    grade: str | None
    grade_point: Decimal | None
    status: str


class ResultUploadRequest(BaseModel):
    reg_id: int
    ca_score: Decimal
    exam_score: Decimal


class ResultUploadResponse(BaseModel):
    result_id: int
    reg_id: int
    ca_score: Decimal
    exam_score: Decimal
    total_score: Decimal
    grade: str
    grade_point: Decimal
