import uuid
from enum import Enum
from typing import List, Optional

from fastapi import Depends, APIRouter, HTTPException, status
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import selectinload

from app.database import get_db
from app.schemas import CreateListing, ListingResponse, DetailListingResponse, UpdateListing
from app.api.v1.auth.auth_utils import get_current_user
from app.models.Product import Product
from app.models.User import User
from app.models.Category import Category

router = APIRouter(prefix="/listings", tags=["listings & search"])

class SortParams(Enum, str):
    POPULAR = "popular"
    PRICE_ASC = "price_asc"
    PRICE_DESC = "price_desc"

@router.get("/search", response_model=List[ListingResponse])
async def search_listings(q: str = None, location: str = None,
                          category_id: Optional[uuid.UUID] = None,
                          price_min: int = None,
                          price_max: int = None,
                          sort: SortParams = SortParams.POPULAR,
                          limit: int = 20, skip: int = 0,
        db: AsyncSession = Depends(get_db)):

    query = select(Product).options(selectinload(Product.owner))

    if q:
        query = query.where(Product.name.ilike(f"%{q}%") | Product.description.ilike(f"%{q}%"))

    if location:
        query = query.where(Product.location.ilike(f"%{location}%"))

    if price_min is not None:
        query = query.where(Product.price >= price_min)

    if price_max:
        query = query.where(Product.price <= price_max)

    if category_id:
        query = query.where(Product.category_id == category_id)


    if sort == SortParams.POPULAR:
        query = query.order_by(Product.owner.reviews_count.desc())
    elif sort == SortParams.PRICE_DESC:
        query = query.order_by(Product.price.desc())
    elif sort == SortParams.PRICE_ASC:
        query = query.order_by(Product.price.asc())


    query = query.limit(limit).offset(skip)
    result = await db.execute(query)

    listings = result.scalars().all()
    if not listings:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Listings not found")

    return listings



@router.post("/", response_model=ListingResponse)
async def create_listing(listing: CreateListing,
                         current_user: User = Depends(get_current_user),
                         db: AsyncSession = Depends(get_db)):

    query = await db.execute(select(Category).where(Category.id == listing.category_id))

    result = query.scalar_one_or_none()

    if not result:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Category not found")


    add_listing = Product(name=listing.name,
                          description=listing.description,
                          images=listing.images,
                          price=listing.price,
                          deposit=listing.deposit,
                          location=listing.location,
                          owner_id=current_user.id,
                          category_id=listing.category_id)

    db.add(add_listing)
    await db.commit()
    await db.refresh(add_listing)

    return add_listing

@router.get("/", response_model=List[ListingResponse])
async def get_listings(db:AsyncSession = Depends(get_db),
                       limit: int = 20,
                       skip: int = 0,
                       category_id: uuid.UUID = None):
    query = select(Product)

    if category_id:
        query = query.where(Product.category_id == category_id)

    query = query.offset(skip).limit(limit)

    result = await db.execute(query)

    listings = result.scalars().all()

    return listings

@router.patch("/{listing_id}", response_model=ListingResponse)
async def update_listing(listing_id: uuid.UUID,
                         update_data: UpdateListing,
                         current_user: User = Depends(get_current_user),
                         db: AsyncSession = Depends(get_db)):

    query = await db.execute(select(Product).where(Product.id == listing_id))

    listing = query.scalar_one_or_none()

    if not listing:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Listing not found")

    if listing.owner_id != current_user.id:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="You are not the owner of this listing")

    to_update = update_data.model_dump(exclude_unset=True)

    for field, value in to_update.items():
        setattr(listing, field, value)


    await db.commit()
    await db.refresh(listing)

    return listing

@router.get("/{listing_id}", response_model=DetailListingResponse)
async def get_listing_by_id(listing_id: uuid.UUID,
                            db: AsyncSession = Depends(get_db)):

    query = await db.execute(select(Product).options(selectinload(Product.owner)).where(Product.id == listing_id))

    result = query.unique().scalar_one_or_none()

    if not result:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Listing not found")

    return DetailListingResponse(
        id=result.id,
        name=result.name,
        description=result.description,
        images=result.images,
        price=result.price,
        deposit=result.deposit,
        location=result.location,
        created_at=result.created_at,
        category_id=result.category_id,
        owner_id=result.owner_id,
        owner_name=result.owner.username if result.owner else "Unknown",
        owner_rating=result.owner.rating if result.owner else None
    )

@router.delete("/{listing_id}")
async def delete_listing(listing_id: uuid.UUID,
                         current_user: User = Depends(get_current_user),
                         db: AsyncSession = Depends(get_db)):

    query = await db.execute(select(Product).where(Product.id == listing_id))

    result = query.scalar_one_or_none()

    if not result:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Listing not found")

    if result.owner_id != current_user.id:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="You are not the owner of this listing")

    await db.delete(result)
    await db.commit()

    return {
        "message": "Successfully deleted listing"
    }