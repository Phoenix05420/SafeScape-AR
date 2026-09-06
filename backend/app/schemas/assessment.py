from pydantic import BaseModel
from typing import List

class AssessmentResultCreate(BaseModel):
    task_name: str
    task_description: str = ""
    is_correct: bool
    time_taken_seconds: int = 0
    order_index: int

class AssessmentSubmission(BaseModel):
    session_id: int
    results: List[AssessmentResultCreate]

class AssessmentResultResponse(AssessmentResultCreate):
    id: int
    session_id: int
    class Config:
        from_attributes = True
