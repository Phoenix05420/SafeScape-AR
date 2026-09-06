from pydantic import BaseModel
from typing import List
from app.schemas.training import TrainingSessionUpdate
from app.schemas.assessment import AssessmentResultCreate

class OfflineSession(BaseModel):
    module_id: int
    session_update: TrainingSessionUpdate
    assessments: List[AssessmentResultCreate]

class SyncRequest(BaseModel):
    sessions: List[OfflineSession]

class SyncResponse(BaseModel):
    status: str
    synced_count: int
