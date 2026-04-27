import uuid

from datetime import datetime
from typing import List

from sqlalchemy import String, Integer, DateTime, func, Float, Boolean, JSON, UUID, ForeignKey
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.database import Base


#сделаем вложенность категорий с через родительский айди, ссылающийся на айди этой же таблицы.
#к примеру категория Одежда будет родительской для категории Пуховики
class Category(Base):
    __tablename__ = "category"

    id: Mapped[uuid.UUID] = mapped_column(UUID, primary_key=True, index=True, default=uuid.uuid4)

    parent_id: Mapped[uuid.UUID] = mapped_column(UUID, ForeignKey("category.id", ondelete="CASCADE"), index=True, nullable=True)

    name: Mapped[str] = mapped_column(String, nullable=False)

    description: Mapped[str] = mapped_column(String, nullable=False)

    created_at: Mapped[int] = mapped_column(DateTime(timezone=True), server_default=func.now())



    parent: Mapped["Category | None"] = relationship("Category", back_populates="children", remote_side=[id])

    children: Mapped[List["Category"]] = relationship("Category", back_populates="parent")

    products: Mapped[List["Product"]] = relationship("Product", back_populates="category")
