import uuid
from datetime import datetime

from sqlalchemy import ForeignKey, DateTime, Text
from sqlalchemy.orm import Mapped, relationship, mapped_column

from app.database import Base
from app.models.User import User


class ChatRoom(Base):
    __tablename__ = "chatroom"

    id: Mapped[uuid.UUID] = mapped_column(uuid.UUID, primary_key=True, default=uuid.uuid4)

    booking_id: Mapped[uuid.UUID] = mapped_column(uuid.UUID, ForeignKey("booking.id"))

    created_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow())


class Message(Base):
    __tablename__ = "message"

    id: Mapped[uuid.UUID] = mapped_column(uuid.UUID, primary_key=True, index=True)

    room_id: Mapped[uuid.UUID] = mapped_column(uuid.UUID, ForeignKey('chatroom.id'))

    sender_id: Mapped[uuid.UUID] = mapped_column(uuid.UUID, ForeignKey("user.id"))

    text: Mapped[str] = mapped_column(Text, nullable=False)

    created_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow())


    room: Mapped[ChatRoom] = relationship("ChatRoom", back_populates="messages")
    sender: Mapped[User] = relationship("User")