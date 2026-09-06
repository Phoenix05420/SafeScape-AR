import logging
from sqlalchemy.ext.asyncio import create_async_engine, async_sessionmaker, AsyncSession
from sqlalchemy.orm import declarative_base
from app.config import settings

logger = logging.getLogger("safescape.db")

Base = declarative_base()

db_url = settings.database_url
engine = create_async_engine(db_url, echo=False)
AsyncSessionLocal = async_sessionmaker(engine, class_=AsyncSession, expire_on_commit=False)

async def init_db():
    global engine, AsyncSessionLocal
    try:
        async with engine.begin() as conn:
            await conn.run_sync(Base.metadata.create_all)
        print(f"[OK] Database connected and initialized: {engine.url.drivername}")
    except Exception as e:
        print(f"[WARN] Failed to connect to {settings.database_url}: {e}")
        print("[INFO] Falling back to local SQLite database (safescape.db)...")
        fallback_url = "sqlite+aiosqlite:///./safescape.db"
        engine = create_async_engine(fallback_url, echo=False)
        AsyncSessionLocal = async_sessionmaker(engine, class_=AsyncSession, expire_on_commit=False)
        async with engine.begin() as conn:
            await conn.run_sync(Base.metadata.create_all)
        print("[OK] Local SQLite database initialized: safescape.db")

async def get_db():
    async with AsyncSessionLocal() as session:
        yield session
