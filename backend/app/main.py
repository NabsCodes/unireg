from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api.academic import router as academic_router
from app.api.admin import router as admin_router
from app.api.auth import router as auth_router
from app.api.health import router as health_router
from app.api.lecturers import router as lecturers_router
from app.api.students import router as students_router
from app.core.config import settings


def create_app() -> FastAPI:
    app = FastAPI(
        title="UniReg API",
        description="Python backend for course registration and results.",
        version="0.1.0",
    )

    app.add_middleware(
        CORSMiddleware,
        allow_origins=settings.cors_origins,
        allow_origin_regex=(
            r"http://(localhost|127\.0\.0\.1)(:\d+)?"
            if settings.environment == "development"
            else None
        ),
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )

    app.include_router(health_router, prefix="/health", tags=["health"])
    app.include_router(auth_router, prefix="/api/auth", tags=["auth"])
    app.include_router(admin_router, prefix="/api/admin", tags=["admin"])
    app.include_router(academic_router, prefix="/api/academic", tags=["academic"])
    app.include_router(students_router, prefix="/api/students", tags=["students"])
    app.include_router(lecturers_router, prefix="/api/lecturers", tags=["lecturers"])

    return app


app = create_app()
