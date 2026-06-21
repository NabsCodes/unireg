from typing import Annotated

from fastapi import APIRouter, Depends, HTTPException, status

from app.core.security import get_current_user
from app.schemas.auth import AuthUser, LoginRequest, LoginResponse
from app.services.auth import authenticate

router = APIRouter()


@router.post("/login", response_model=LoginResponse)
def login(payload: LoginRequest) -> LoginResponse:
    response = authenticate(payload.identifier, payload.password)
    if response is None:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid login credentials",
        )
    return response


@router.get("/me", response_model=AuthUser)
def current_user(user: Annotated[AuthUser, Depends(get_current_user)]) -> AuthUser:
    return user
