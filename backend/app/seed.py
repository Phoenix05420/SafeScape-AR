import asyncio
from sqlalchemy.ext.asyncio import AsyncSession
from app.database import engine, AsyncSessionLocal, Base
from app.models.user import User, RoleEnum
from app.models.training_module import TrainingModule, ModuleTypeEnum, DifficultyEnum
from app.auth.password import hash_password

async def seed():
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)
        
    async with AsyncSessionLocal() as session:
        admin = User(
            email="admin@safescape.com",
            password_hash=hash_password("admin123"),
            full_name="Admin User",
            role=RoleEnum.admin
        )
        worker = User(
            email="worker@safescape.com",
            password_hash=hash_password("worker123"),
            full_name="John Doe",
            role=RoleEnum.worker
        )
        session.add(admin)
        session.add(worker)
        
        m1 = TrainingModule(
            title="Basic Fire Safety",
            description="Learn how to use fire extinguishers.",
            module_type=ModuleTypeEnum.fire_safety,
            difficulty=DifficultyEnum.beginner,
            duration_minutes=30,
            passing_score=80
        )
        m2 = TrainingModule(
            title="Gas Leak Protocols",
            description="Emergency protocols for gas leaks.",
            module_type=ModuleTypeEnum.gas_leak,
            difficulty=DifficultyEnum.intermediate,
            duration_minutes=45,
            passing_score=85
        )
        session.add(m1)
        session.add(m2)
        
        await session.commit()
        print("Database seeded successfully.")

if __name__ == "__main__":
    asyncio.run(seed())
