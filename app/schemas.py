from datetime import datetime
from typing import List

from pydantic import BaseModel, Field, EmailStr


class RegisterRequest(BaseModel):
    username: str
    email: EmailStr
    password: str

class LoginRequest(BaseModel):
    username: str
    password: str

class TokenResponse(BaseModel):
    access_token: str
    token_type: str

class UserProfile(BaseModel):
    username: str
    email: str
    full_name: str
    rating: float
    reviews_count: int
    preferred_categories: List[str]
    created_at: datetime
