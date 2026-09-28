from fastapi import FastAPI
from sqlalchemy import text

from app.database import engine
from app.routers.auth import router as auth_router


app = FastAPI(
    title="EC Recommendation System API",
    version="0.1.0",
)

app.include_router(auth_router)


@app.get("/")
def root():
    return {"message": "EC Recommendation System API"}


@app.get("/health")
def health_check():
    return {"status": "ok"}


@app.get("/health/db")
def database_health_check():
    with engine.connect() as connection:
        result = connection.execute(text("SELECT 1"))
        value = result.scalar()

    return {
        "status": "ok",
        "database": value,
    }