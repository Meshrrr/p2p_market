import uuid

from datetime import datetime
from typing import List

from sqlalchemy import String, DateTime, func, UUID, ForeignKey, Float, JSON
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.database import Base
from app.models.Category import Category


class Product(Base):
    __tablename__ = "product"

    id: Mapped[uuid.UUID] = mapped_column(UUID, primary_key=True, index=True, default=uuid.uuid4)

    owner_id: Mapped[UUID] = mapped_column(UUID, ForeignKey("user.id", ondelete="CASCADE"), index=True)

    owner: Mapped["User"] = relationship("User", back_populates="products")

    category_id: Mapped[uuid.UUID] = mapped_column(UUID, ForeignKey("category.id"), index=True)

    category: Mapped["Category"] = relationship("Category", back_populates="products")

    name: Mapped[str] = mapped_column(String, nullable=False)

    description: Mapped[str] = mapped_column(String)

    price: Mapped[float] = mapped_column(Float, nullable=False)

    deposit: Mapped[float] = mapped_column(Float)

    images: Mapped[List[str]] = mapped_column(JSON, default=list)

    availability: Mapped[dict] = mapped_column(JSON, nullable=True)

    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), server_default=func.now())