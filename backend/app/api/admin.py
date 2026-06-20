from fastapi import APIRouter, HTTPException

from app.schemas.academic import DashboardSummary
from app.services.academic import get_dashboard_summary

router = APIRouter()


@router.get("/dashboard", response_model=DashboardSummary)
def dashboard_summary() -> dict:
    summary = get_dashboard_summary()

    if summary is None:
        raise HTTPException(status_code=404, detail="Dashboard summary not found")

    return summary
