import datetime
import uuid
from typing import List

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy import select, and_, or_
from sqlalchemy.ext.asyncio import AsyncSession

from app.api.v1.auth.auth_utils import get_current_user
from app.models.Booking import Booking, BookingStatus
from app.schemas import BookingCreate, BookingResponse, BookingUpdateStatus
from app.database import get_db
from app.models.Product import Product
from app.models.User import User

router = APIRouter(prefix="/listings", tags=["bookings"])

@router.post("/{listing_id}/book", response_model=BookingResponse)
async def create_booking(listing_id: uuid.UUID, booking: BookingCreate,
                         current_user: User = Depends(get_current_user),
                         db: AsyncSession = Depends(get_db)):

    query = await db.execute(select(Product).where(Product.id == listing_id))

    curr_listing = query.scalar_one_or_none()

    if not curr_listing:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Listing not found")

    if not curr_listing.is_available:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Listing is not available")

    check_booking = await db.execute(select(Booking)
                                     .where(
        and_(
        Booking.product_id == listing_id,
        Booking.status != BookingStatus.CANCELLED,
        or_(
            and_(
                Booking.start_date <= booking.end_date,
                Booking.end_date >= booking.start_date
            )
        ))))

    if check_booking.scalars().first():
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Listing is already booked for these dates")

    days = (booking.end_date - booking.start_date).days
    total_price = curr_listing.price * days

    booking_data = Booking(
        product_id=listing_id,
        user_id=current_user.id,
        start_date=booking.start_date,
        end_date=booking.end_date,
        total_price=total_price,
        status=BookingStatus.PENDING
    )

    db.add(booking_data)
    await db.commit()
    await db.refresh(booking_data)

    return booking_data

@router.get("/bookings/", response_model=List[BookingResponse])
async def get_my_bookings(skip: int = 0,
                          limit: int = 20,
                          current_user: User = Depends(get_current_user),
                          db: AsyncSession = Depends(get_db)):

    query = await db.execute(select(Booking).where(Booking.user_id == current_user.id)
                             .offset(skip).limit(limit))

    bookings = query.scalars().all()

    if not bookings:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Bookings not found")

    return bookings


@router.get("/bookings/{id}", response_model=BookingResponse)
async def get_booking_by_id(id: uuid.UUID,
                            current_user: User = Depends(get_current_user),
                            db: AsyncSession = Depends(get_db)):

    query = await db.execute(select(Booking).where(Booking.id == id))

    booking = query.scalar_one_or_none()
    if not booking:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Booking not found")

    if booking.user_id != current_user.id and booking.product.owner_id != current_user.id:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Not authorized")

    return booking

@router.put("/bookings/{id}/confirm", response_model=BookingResponse)
async def confirm_booking(id: uuid.UUID,
                          current_user: User = Depends(get_current_user),
                          db: AsyncSession = Depends(get_db)):

    query = await db.execute(select(Booking).where(Booking.id == id))

    booking = query.scalar_one_or_none()

    if not booking:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Booking not found")

    if booking.product.owner_id != current_user.id:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="You can't change this booking")

    booking.status = BookingStatus.CONFIRMED
    booking.confirm_at = datetime.utcnow()

    booking.product.is_available = False

    await db.commit()
    await db.refresh(booking)

    return booking


@router.put("/bookings/{id}/cancel", response_model=BookingResponse)
async def cancel_booking(id: uuid.UUID,
                         current_user: User = Depends(get_current_user),
                         db: AsyncSession = Depends(get_db)):
    query = await db.execute(select(Booking).where(Booking.id == id))

    booking = query.scalar_one_or_none()

    if not booking:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Booking not found")

    if booking.product.owner_id != current_user.id and booking.user_id != current_user.id:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="You can't change this booking")

    booking.status = BookingStatus.CANCELLED

    if booking.confirm_at:
        booking.product.is_available = True

    await db.commit()
    await db.refresh(booking)

    return booking


@router.get("/bookings/product/{product_id}", response_model=BookingResponse)
async def get_bookings_from_product(product_id: uuid.UUID,
                                    current_user: User = get_current_user,
                                    db: AsyncSession = Depends(get_db)):
    query = await db.execute(select(Product).where(Product.id == product_id))
    product = query.scalar_one_or_none()
    if not product:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Product not found")

    if product.owner_id != current_user.id:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="You can't check these bookings")

    query = await db.execute(select(Booking).where(Booking.product_id == product_id))

    booking = query.scalars().all()

    if not booking:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Booking not found")

    return booking

