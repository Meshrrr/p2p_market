from datetime import datetime
from typing import Optional

import bcrypt
import jwt

from fastapi import HTTPException, Depends, status
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer
from pydantic import BaseModel
from pathlib import Path

from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from database import get_db
from models import User

BASE_DIR =Path(__file__).parent.parent.parent.parent

class AuthJWT(BaseModel):
    private_key_path: Path = BASE_DIR / "certs/jwt-private.pem"
    public_key_path: Path = BASE_DIR / "certs/jwt-public.pem"
    algoritm: str = "RS256"
    TOKEN_EXPIRES_MINUTES: int = 30

auth_jwt = AuthJWT()

security = HTTPBearer()

def encode_jwt(
        payload: dict,
        private_key: Optional[str] = None,
        algorithm: str = auth_jwt.algoritm,
        expire: int = auth_jwt.TOKEN_EXPIRES_MINUTES,):
    if private_key is None:
        private_key = auth_jwt.private_key_path.read_text()

    to_encode = payload.copy()
    now = datetime.utcnow()
    to_encode.update(exp=expire,
                     iat=now)

    encode = jwt.encode(to_encode, private_key, algorithm=algorithm)

    return encode

def decode_jwt(token: str,
               public_key: Optional[str] = None,
               algorithm: str = auth_jwt.algoritm):
    if public_key is None:
        public_key = auth_jwt.public_key_path.read_text()

    decode = jwt.decode(token, public_key, algorithms=algorithm)

    return decode


def hash_password(password: str) -> str:
    salt = bcrypt.gensalt()
    pwd_bytes: bytes = password.encode()
    hash_bytes = bcrypt.hashpw(pwd_bytes, salt)

    return hash_bytes.decode('utf-8')

def validate_password(password: str, hashed_password: str) -> bool:
    checking = bcrypt.checkpw(password=password.encode(), hashed_password=hashed_password.encode('utf-8'))

    return checking

async def get_current_user(credentials: HTTPAuthorizationCredentials = Depends(security),
                     db: AsyncSession = Depends(get_db)) -> User:
    if not credentials:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED,
                            detail="No authorization header")

    token = credentials.credentials

    payload = decode_jwt(token)

    user_id = payload.get("sub")
    if not user_id:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid token")

    result = await db.execute(select(User).where(User.id == user_id))

    current_user = result.scalar_one_or_none()

    if not current_user:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="User not found")

    return current_user