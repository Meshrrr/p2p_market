from fastapi import FastAPI

from app.database import create_tables

from app.api.router_api import router as api_router

app = FastAPI(title="P2P-Market")

app.include_router(api_router)


@app.on_event("startup")
async def startup():
    await create_tables()
    print("DB start")


@app.get("/")
async def root():
    return {"message": "Healthy"}
