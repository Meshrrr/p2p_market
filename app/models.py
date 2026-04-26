import uuid

from datetime import datetime
from tkinter.constants import CASCADE
from typing import List

from sqlalchemy import String, Integer, DateTime, func, Float, Boolean, JSON, UUID, ForeignKey
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.database import Base


class User(Base):
    __tablename__ = "user"

    id: Mapped[uuid.UUID] = mapped_column(UUID, primary_key=True, index=True)

    username: Mapped[str] = mapped_column(String, nullable=False)

    email: Mapped[str] = mapped_column(String, nullable=False)

    hashed_password: Mapped[str] = mapped_column(String, nullable=False)

    full_name: Mapped[str] = mapped_column(String, nullable=True)

    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), server_default=func.now())
    rating: Mapped[float] = mapped_column(Float)

    reviews_count: Mapped[int] = mapped_column(Integer, default=0)

    preferred_categories: Mapped[list[str]] = mapped_column(JSON)


    is_active: Mapped[bool] = mapped_column(Boolean, default=True)
    email_verified: Mapped[bool] = mapped_column(Boolean, default=False)


#сделаем вложенность категорий с через родительский айди, ссылающийся на айди этой же таблицы.
#к примеру категория Одежда будет родительской для категории Пуховики
class Category(Base):
    __tablename__ = "category"

    id: Mapped[uuid.UUID] = mapped_column(UUID, primary_key=True, index=True)

    parent_id: Mapped[uuid.UUID] = mapped_column(UUID, ForeignKey("category.id", ondelete="CASCADE"), index=True, nullable=True)

    name: Mapped[str] = mapped_column(String, nullable=False)

    description: Mapped[str] = mapped_column(String, nullable=False)

    created_at: Mapped[int] = mapped_column(DateTime(timezone=True), server_default=func.now())



    parent: Mapped["Category | None"] = relationship("Category", back_populates="children", remote_side=[id])

    children: Mapped[List["Category"]] = relationship("Category", back_populates="parent")



class Product(Base):
    __tablename__ = "product"

    id: Mapped[uuid.UUID] = mapped_column(UUID, primary_key=True, index=True)

    owner_id: Mapped[UUID] = mapped_column(UUID, ForeignKey("user.id", ondelete="CASCADE"), index=True)

    owner: Mapped["User"] = relationship("User", back_populates="products")

    category_id: Mapped[uuid.UUID] = mapped_column(UUID, ForeignKey("category.id"), index=True)

    category: Mapped["Category"] = relationship("Category", back_populates="products")

    name: Mapped[str] = mapped_column(String, nullable=False)

    description: Mapped[str] = mapped_column(String, ge=5, le=250)

    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), server_default=func.now())

    location: Mapped[dict] = mapped_column(JSON, nullable=False)

    availability: Mapped[dict] = mapped_column(JSON, nullable=True)

