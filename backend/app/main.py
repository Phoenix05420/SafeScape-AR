from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager
from app.database import engine, Base
from app.routers import auth, workers, training, assessment, certificates, analytics, sync

@asynccontextmanager
async def lifespan(app: FastAPI):
    # In production, use Alembic instead of this
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)
    yield

app = FastAPI(title="SafeScape AR API", lifespan=lifspan)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router, prefix="/auth", tags=["Auth"])
app.include_router(workers.router, prefix="/workers", tags=["Workers"])
app.include_router(training.router, prefix="/training", tags=["Training"])
app.include_router(assessment.router, prefix="/assessment", tags=["Assessment"])
app.include_router(certificates.router, prefix="/certificates", tags=["Certificates"])
app.include_router(analytics.router, prefix="/analytics", tags=["Analytics"])
app.include_router(sync.router, prefix="/sync", tags=["Sync"])

@app.get("/")
async def root():
    return {"message": "Welcome to SafeScape AR API"}
