from datetime import datetime
from typing import List, Optional

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

class UpdateRequestUser(BaseModel):
    username: Optional[str] = None
    full_name: Optional[str] = Field(None, max_length=255)
    preferred_categories: Optional[List[str]] = None
    notification_preferences: Optional[dict] = None


class CreateCategory(BaseModel):
    name: str
    description: str = Field(None, ge=10, le=150)

class CategoryResponse(BaseModel):
    id: int
