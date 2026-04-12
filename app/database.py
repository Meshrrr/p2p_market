import os

from sqlalchemy.ext.asyncio import create_async_engine, async_sessionmaker, AsyncSession
from sqlalchemy.orm import DeclarativeBase

DATABASE_URL = os.getenv("DATABASE_URL",
                         "postgresql+asyncpg://vesh_user:vesh_password@localhost:5432/vesh_vokrug")


engine = create_async_engine(DATABASE_URL,)

asyncSession = async_sessionmaker(engine=engine,
                                  class_=AsyncSession,
                                  expire_on_commit=False,
                                  )

class Base(DeclarativeBase):
    pass

async def create_tables():
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)

async def get_db() -> AsyncSession:
    async with asyncSession as session:
        try:
            yield session
        finally:
            await session.close()

