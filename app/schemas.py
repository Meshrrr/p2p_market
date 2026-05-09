import uuid
from datetime import datetime
from enum import Enum
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


class CreateCategory(BaseModel):
    name: str
    description: str = Field(None, ge=10, le=150)

class CategoryResponse(BaseModel):
    name: str
    id: uuid.UUID


class CreateListing(BaseModel):
    name: str
    description: str = Field(None, max_length=250)
    images: str
    price: float = Field(None, gt=0)
    deposit: float = Field(None, gt=0)
    location: str = Field(None, max_length=30)
    category_id: Optional[uuid.UUID] = None

class UpdateListing(BaseModel):
    name: Optional[str] = None
    description: Optional[str] = None
    images: Optional[str] = None
    price: Optional[float] = None
    deposit: Optional[float] = None


class ListingResponse(BaseModel):
    id: uuid.UUID
    name: str
    description: str
    images: str
    price: float
    deposit: float
    location: str
    created_at: datetime
    category_id: uuid.UUID
    owner_id: uuid.UUID

class DetailListingResponse(ListingResponse):
    owner_name: str
    owner_rating: Optional[float] = None


class BookingEnumStatus(str, Enum):
    PENDING = "pending"
    CONFIRMED = "confirmed"
    CANCELLED = "cancelled"
    COMPLETED = "completed"

class BookingCreate(BaseModel):
    start_date: datetime
    end_date: datetime

class BookingResponse(BaseModel):
    id: uuid.UUID
    product_id: uuid.UUID
    user_id: uuid.UUID
    start_date: datetime
    end_date: datetime
    status: str
    created_at: datetime
    confirmed_at: Optional[datetime] = None

class BookingUpdateStatus(BaseModel):
    status: BookingEnumStatus


class SearchRequest(BaseModel):
    q: str
    location: str
    category: str
    limit: int
    skip: int
