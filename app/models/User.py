import uuid

from datetime import datetime
from typing import List

from sqlalchemy import String, Integer, DateTime, func, Float, Boolean, JSON, UUID, ForeignKey
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.database import Base


class User(Base):
    __tablename__ = "user"

    id: Mapped[uuid.UUID] = mapped_column(UUID, primary_key=True, index=True, default=uuid.uuid4)

    username: Mapped[str] = mapped_column(String, nullable=False)

    email: Mapped[str] = mapped_column(String, nullable=False)

    hashed_password: Mapped[str] = mapped_column(String, nullable=False)

    full_name: Mapped[str] = mapped_column(String, nullable=True)

    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), server_default=func.now())
    rating: Mapped[float | None] = mapped_column(Float, nullable=True)

    reviews_count: Mapped[int] = mapped_column(Integer, default=0)

    preferred_categories: Mapped[list[str]] = mapped_column(JSON, default=list, server_default='[]')


    is_active: Mapped[bool] = mapped_column(Boolean, default=True)

    email_verified: Mapped[bool] = mapped_column(Boolean, default=False)

    products: Mapped[List["Product"]] = relationship("Product", back_populates="owner")
