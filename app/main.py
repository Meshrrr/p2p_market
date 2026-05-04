from fastapi import FastAPI, Depends
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.database import create_tables, asyncSession

from app.api.router_api import router as api_router
from app.models.Category import Category

app = FastAPI(title="P2P-Market")

app.include_router(api_router)


INITAL_CATEGORIES = [
    {"name": "Техника", "description": "Все виды техники", "parent_id": None},
    {"name": "Инструменты", "description": "Все виды инструментов", "parent_id": None},
    {"name": "Игры", "description": "Все виды игр", "parent_id": None}
]

async def init_categories(db: AsyncSession) -> None:
    for cat in INITAL_CATEGORIES:

        query = await db.execute(select(Category).where(Category.name == cat["name"]))

        if not query.scalar_one_or_none():
            db.add(Category(**cat))

    await db.commit()

@app.on_event("startup")
async def startup():
    await create_tables()
    async with asyncSession() as session:
        await init_categories(session)
    print("DB start")


@app.get("/")
async def root():
    return {"message": "Healthy"}
