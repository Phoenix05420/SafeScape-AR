from sqlalchemy import Column, Integer, String, Enum, Boolean, DateTime, Float, ForeignKey
from sqlalchemy.sql import func
from app.database import Base
import enum

class SessionStatusEnum(str, enum.Enum):
    not_started = "not_started"
    in_progress = "in_progress"
    completed = "completed"
    failed = "failed"

class TrainingSession(Base):
    __tablename__ = "training_sessions"
    id = Column(Integer, primary_key=True, index=True)
    worker_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    module_id = Column(Integer, ForeignKey("training_modules.id"), nullable=False)
    status = Column(Enum(SessionStatusEnum), default=SessionStatusEnum.not_started)
    started_at = Column(DateTime(timezone=True))
    completed_at = Column(DateTime(timezone=True))
    score = Column(Float)
    time_taken_seconds = Column(Integer)
    is_offline = Column(Boolean, default=False)
    synced_at = Column(DateTime(timezone=True))
