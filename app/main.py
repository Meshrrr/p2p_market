from fastapi import FastAPI

from database import create_tables

app = FastAPI(title="P2P-Market")


@app.on_event("startup")
async def startup():
    await create_tables()
    print("DB start")


@app.get("/")
async def root():
    return {"message": "Healthy"}
