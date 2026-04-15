from typing import List

from fastapi import Depends, APIRouter, HTTPException, status
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.database import get_db
from app.schemas import CategoryResponse
from models import Category

router = APIRouter(prefix="/categories")

@router.get("/", response_model=List[CategoryResponse])
async def get_categories(db: AsyncSession = Depends(get_db)):

    result = await db.execute(select(Category).where(Category.is_active == True))

    categories = result.scalars().all()

    return categories


@router.get("/{category_id}", response_model=CategoryResponse)
async def get_category(category_id: str,
        db: AsyncSession = Depends(get_db)):

    result = await db.execute(
        select(Category).where(
            Category.id == category_id)
    )
    category = result.scalar_one_or_none()

    if not category:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Category not found"
        )

    return category

@router.get("/{category_id}/tree", response_model=List[CategoryResponse])
async def get_category_tree(category_id: int, db: AsyncSession = Depends(get_db)):

    check_category = await db.execute(select(Category).where(Category.id == category_id))

    category = check_category.scalar_one_or_none()
    if not category:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Category not found")

    category_children = await db.execute(select(Category.children).where(Category.parent_id == category_id))

    result = category_children.scalars().all()

    return result