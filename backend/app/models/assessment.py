from sqlalchemy import Column, Integer, String, Boolean, ForeignKey
from app.database import Base

class AssessmentResult(Base):
    __tablename__ = "assessment_results"
    id = Column(Integer, primary_key=True, index=True)
    session_id = Column(Integer, ForeignKey("training_sessions.id"), nullable=False)
    task_name = Column(String, nullable=False)
    task_description = Column(String)
    is_correct = Column(Boolean, nullable=False)
    time_taken_seconds = Column(Integer)
    order_index = Column(Integer, nullable=False)
