from sqlalchemy import Column, Integer, String, Enum, Boolean, DateTime
from sqlalchemy.sql import func
from app.database import Base
import enum

class ModuleTypeEnum(str, enum.Enum):
    fire_safety = "fire_safety"
    gas_leak = "gas_leak"
    confined_space = "confined_space"
    electrical = "electrical"

class DifficultyEnum(str, enum.Enum):
    beginner = "beginner"
    intermediate = "intermediate"
    advanced = "advanced"

class TrainingModule(Base):
    __tablename__ = "training_modules"
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, nullable=False)
    description = Column(String)
    module_type = Column(Enum(ModuleTypeEnum), nullable=False)
    difficulty = Column(Enum(DifficultyEnum), nullable=False)
    duration_minutes = Column(Integer, nullable=False)
    passing_score = Column(Integer, default=80)
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
