from fastapi import Depends, APIRouter, HTTPException, status
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.database import get_db
from app.schemas import CreateListing, ListingResponse
from app.api.v1.auth.auth_utils import get_current_user
from app.models.Product import Product
from app.models.User import User

router = APIRouter(prefix="/listings", tags=["listings"])

@router.post("/listings", response_model=ListingResponse)
async def create_listing(listing: CreateListing,
                         current_user: User = Depends(get_current_user),
                         db: AsyncSession = Depends(get_db)):

    check_listing = await db.execute(select(Product).where(Product.name == listing.name))

    res = check_listing.scalar_one_or_none()
    if res:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Listing already exists")


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
