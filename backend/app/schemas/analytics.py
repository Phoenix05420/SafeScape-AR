from pydantic import BaseModel
from typing import List

class DashboardStats(BaseModel):
    total_workers: int
    total_sessions: int
    completed_sessions: int
    average_score: float

class ModuleCompletionStats(BaseModel):
    module_id: int
    module_name: str
    completion_rate: float
    average_score: float

class WorkerProgress(BaseModel):
    worker_id: int
    modules_completed: int
    average_score: float

class ComplianceReport(BaseModel):
    organization: str
    compliance_rate: float
