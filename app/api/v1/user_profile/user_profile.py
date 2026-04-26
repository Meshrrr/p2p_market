from fastapi import Depends, APIRouter, HTTPException, status
from fastapi.params import Body
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.database import get_db
from app.schemas import UserProfile, UpdateRequestUser
from app.models import User

from app.api.v1.auth.auth_utils import get_current_user


router = APIRouter(prefix="/users", tags=["Auth & Profile"])

@router.get("/me", response_model=UserProfile)
async def get_user_profile(current_user: User = Depends(get_current_user),
                           db: AsyncSession = Depends(get_db)):

    find_user = await db.execute(select(User).where(User.id == current_user.id))

    user = find_user.scalar_one_or_none()

    if not user:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="User not found")

    return UserProfile(
        username=user.username,
        email=user.email,
        full_name=user.full_name,
        rating=user.rating,
        reviews_count=user.reviews_count,
        preferred_categories=user.preferred_categories,
        created_at=user.created_at
    )

@router.patch("/me")
async def update_user_profile(request: UpdateRequestUser,
                              current_user: User = Depends(get_current_user),
                              db: AsyncSession = Depends(get_db),):

    find_user = await db.execute(select(User).where(User.id == current_user.id))

    user = find_user.scalar_one_or_none()
    if not user:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="User not found")

    if not user.is_active:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="User account is deactivated")

    if request.username is not None:
        check_username = await db.execute(
            select(User).where(User.username == request.username, User.id != user.id)
        )
        if check_username.scalar_one_or_none():
            raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Username already taken")
        user.username = request.username

    if request.full_name is not None:
        user.full_name = request.full_name

    if request.preferred_categories is not None:
        user.preferred_categories = request.preferred_categories

    await db.commit()
    await db.refresh(user)

    return UserProfile(
        username=user.username,
        email=user.email,
        full_name=user.full_name,
        rating=user.rating,
        reviews_count=user.reviews_count,
        preferred_categories=user.preferred_categories,
        created_at=user.created_at
    )

@router.delete("/me/delete")
async def delete_user_profile(current_user: User = Depends(get_current_user),
                              db: AsyncSession = Depends(get_db),
                              confirm_action: bool = Body(default=False)):

    if confirm_action:

        find_user = await db.execute(select(User).where(User.id == current_user.id))

        user = find_user.scalar_one_or_none()
        if not user:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="User not found")

        await db.delete(user)
        await db.commit()

        return {
            "message": "You have successfully deleted your profile"
        }

    return {
        "message": "Action not confirmed"
    }
