from fastapi import Depends, APIRouter, HTTPException, status
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.schemas import RegisterRequest, LoginRequest, TokenResponse, UserProfile
from app.models import User

from app.api.v1.auth.auth_utils import (
    encode_jwt,
    decode_jwt,
    get_current_user,
    validate_password,
    hash_password)

from app.database import get_db

router = APIRouter(prefix="/users", tags=["Auth & Profile"])

@router.get("/me", response_model=UserProfile)
async def get_user_profile(current_user: User = Depends(get_current_user),
                           db: AsyncSession = Depends(get_db)):

    find_user = await db.execute(select(User).where(User.id == current_user.id))

    user = find_user.scalar_one_or_none()

    if not user:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="User not found")

    return UserProfile