import uuid
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
    full_name: Optional[str] = None
    rating: Optional[float] = None
    reviews_count: Optional[int] = None
    preferred_categories: Optional[List[str]]
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
    id: uuid.UUID


class CreateListing(BaseModel):
    name: str
    description: str = Field(None, max_length=250)
    image: str
    price: float = Field(None, gt=0)
    deposit: float = Field(None, gt=0)
    location: str = Field(None, max_length=30)
    category_id: uuid.UUID

class UpdateListing(BaseModel):
    name: Optional[str] = None
    description: Optional[str] = None
    image: Optional[str] = None
    price: Optional[float] = None
    deposit: Optional[float] = None


class ListingResponse(BaseModel):
    id: uuid.UUID
    name: str
    description: str
    image: str
    price: float
    deposit: float
    rating: float
    review_count: int
    location: str
    created_at: datetime
    category_id: uuid.UUID
    owner_id: uuid.UUID

class DetailListingResponse(ListingResponse):
    owner_name: str
    owner_rating: float


