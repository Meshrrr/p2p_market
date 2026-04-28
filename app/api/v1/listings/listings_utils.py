import uuid
from typing import List

from fastapi import Depends, APIRouter, HTTPException, status
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import selectinload

from app.database import get_db
from app.schemas import CreateListing, ListingResponse, DetailListingResponse, UpdateListing
from app.api.v1.auth.auth_utils import get_current_user
from app.models.Product import Product
from app.models.User import User
from models.Category import Category

router = APIRouter(prefix="/listings", tags=["listings"])

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
                          image=listing.image,
                          price=listing.price,
                          deposit=listing.deposit,
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
                       category_id: int = None):
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

    listing = await query.scalar_one_or_none()

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

    return result

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