from pydantic import BaseModel
from typing import Optional
from datetime import datetime
from app.models.training_module import ModuleTypeEnum, DifficultyEnum
from app.models.training_session import SessionStatusEnum

class TrainingModuleCreate(BaseModel):
    title: str
    description: Optional[str] = None
    module_type: ModuleTypeEnum
    difficulty: DifficultyEnum
    duration_minutes: int
    passing_score: int = 80

class TrainingModuleResponse(TrainingModuleCreate):
    id: int
    is_active: bool
    created_at: datetime
    class Config:
        from_attributes = True

class TrainingSessionCreate(BaseModel):
    module_id: int
    is_offline: bool = False

class TrainingSessionUpdate(BaseModel):
    status: SessionStatusEnum
    score: Optional[float] = None
    time_taken_seconds: Optional[int] = None

class TrainingSessionResponse(BaseModel):
    id: int
    worker_id: int
    module_id: int
    status: SessionStatusEnum
    started_at: Optional[datetime] = None
    completed_at: Optional[datetime] = None
    score: Optional[float] = None
    time_taken_seconds: Optional[int] = None
    is_offline: bool
    synced_at: Optional[datetime] = None
    class Config:
        from_attributes = True
