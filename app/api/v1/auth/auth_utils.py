from datetime import datetime
from typing import Optional

import bcrypt
import jwt

from fastapi import HTTPException
from pydantic import BaseModel
from pathlib import Path


from app.schemas import RegisterRequest, LoginRequest

BASE_DIR =Path(__file__).parent.parent.parent.parent

class AuthJWT(BaseModel):
    private_key_path: Path = BASE_DIR / "certs/jwt-private.pem"
    public_key_path: Path = BASE_DIR / "certs/jwt-public.pem"
    algoritm: str = "RS256"
    TOKEN_EXPIRES_MINUTES: int = 30

auth_jwt = AuthJWT()

def encode_kwt(
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

