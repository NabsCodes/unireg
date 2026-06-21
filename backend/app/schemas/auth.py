from pydantic import BaseModel


class LoginRequest(BaseModel):
    identifier: str
    password: str


class AuthUser(BaseModel):
    user_id: int
    email: str
    role: str
    student_id: int | None = None
    lecturer_id: int | None = None
    matric_no: str | None = None
    staff_no: str | None = None
    name: str | None = None


class LoginResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"
    user: AuthUser
