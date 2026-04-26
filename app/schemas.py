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
    full_name: Optional[str] = Field(None, max_length=30)
    preferred_categories: Optional[List[str]] = None
    notification_preferences: Optional[dict] = None


class CreateCategory(BaseModel):
    name: str
    description: str = Field(None, ge=10, le=150)

class CategoryResponse(BaseModel):
    id: int


class CreateListing(BaseModel):
    name: str
    description: str
    image: str
    price: float

class UpdateListing(BaseModel):
    name: Optional[str] = None
    description: Optional[str] = None
    image: Optional[str] = None
    price: Optional[float] = None

class ListingResponse(BaseModel):
    id: int
    name: str
    description: str
    image: str
    price: float
    reting: float
    created_at: datetime
    category_id: int
    owner_id: int


