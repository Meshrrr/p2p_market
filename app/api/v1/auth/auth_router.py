from fastapi import Depends, APIRouter, HTTPException, status
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.schemas import RegisterRequest, LoginRequest, TokenResponse
from app.models.User import User

from app.api.v1.auth.auth_utils import (
    encode_jwt,
    decode_jwt,
    get_current_user,
    validate_password,
    hash_password)
from app.database import get_db

router = APIRouter(prefix="/auth", tags=["Auth & Profile"])

@router.post("/register", response_model=TokenResponse)
async def register(user_data: RegisterRequest,
                   db: AsyncSession = Depends(get_db)):

    check_email = await db.execute(select(User).where(User.email == user_data.email))

    result_email = check_email.scalar_one_or_none()
    if result_email:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail='This email is already registered')

    check_username = await db.execute(select(User).where(User.username == user_data.username))
    result_username = check_username.scalar_one_or_none()
    if result_username:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail='This username is already registered')

    hashed_password = hash_password(user_data.password)

    user = User(username=user_data.username,
                email=user_data.email,
                hashed_password=hashed_password)

    db.add(user)
    await db.commit()
    await db.refresh(user)

    user_payload = {
        "sub": str(user.id),
        "email": user.email,
        "username": user.username
    }

    access_token = encode_jwt(payload=user_payload)

    return TokenResponse(access_token=access_token, token_type="bearer")

@router.post("/login", response_model=TokenResponse)
async def login(user_data: LoginRequest,
                db: AsyncSession = Depends(get_db)):

    check_user = await db.execute(select(User).where(User.username == user_data.username))

    user = check_user.scalar_one_or_none()

    if not user:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail='Incorrect username or password')

    if not validate_password(user_data.password, user.hashed_password):
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail='Incorrect username or password')

    user_payload = {
        "sub": str(user.id),
        "email": user.email,
        "username": user.username
    }

    access_token = encode_jwt(payload=user_payload)

    return TokenResponse(access_token=access_token, token_type="bearer")
