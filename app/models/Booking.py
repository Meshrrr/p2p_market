import enum
import uuid
from datetime import datetime
from email.policy import default

from sqlalchemy import ForeignKey, DateTime, func,
from sqlalchemy.databases import postgresql
from sqlalchemy.orm import Mapped, relationship
from sqlalchemy.testing.schema import mapped_column

from app.database import Base
from models.Product import Product
from models.User import User


class BookingStatus(str, enum.Enum):
    """Статусы бронирования."""
    PENDING = "pending"
    CONFIRMED = "confirmed"
    CANCELLED = "cancelled"
    COMPLETED = "completed"


class Booking(Base):
    __tablename__ = "booking"

    id: Mapped[uuid.UUID] = mapped_column(uuid.UUID, primary_key=True, index=True, default=uuid.uuid4.uuid4)

    product_id: Mapped[uuid.UUID] = mapped_column(uuid.UUID, ForeignKey("product.id"))

    user_id: Mapped[uuid.UUID] = mapped_column(uuid.UUID, ForeignKey("user.id"))

    start_date: Mapped[datetime] = mapped_column(DateTime(timezone=True))

    end_date: Mapped[datetime] = mapped_column(DateTime(timezone=True))

    status: Mapped[BookingStatus] = mapped_column(
        postgresql.ENUM(BookingStatus, name="booking_status"),
        default=BookingStatus.PENDING
    )

    total_price: Mapped[float] = mapped_column(float, default=0)

    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), server_default=func.now())

    confirmed_at: Mapped[datetime | None] = mapped_column(DateTime(timezone=True), nullable=True)


    user: Mapped[User] = relationship("User", back_populates="bookings")

    listing: Mapped[Product] = relationship("Product", back_populates="bookings")