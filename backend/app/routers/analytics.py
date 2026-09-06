from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from sqlalchemy import func
from app.database import get_db
from app.models.user import User, RoleEnum
from app.models.training_session import TrainingSession, SessionStatusEnum
from app.schemas.analytics import DashboardStats
from app.auth.jwt import require_admin

router = APIRouter()

@router.get("/dashboard", response_model=DashboardStats)
async def get_dashboard_stats(db: AsyncSession = Depends(get_db), current_user: User = Depends(require_admin)):
    workers_count = (await db.execute(select(func.count(User.id)).where(User.role == RoleEnum.worker))).scalar()
    sessions_count = (await db.execute(select(func.count(TrainingSession.id)))).scalar()
    completed_sessions = (await db.execute(select(func.count(TrainingSession.id)).where(TrainingSession.status == SessionStatusEnum.completed))).scalar()
    avg_score = (await db.execute(select(func.avg(TrainingSession.score)).where(TrainingSession.score.isnot(None)))).scalar() or 0.0
    
    return DashboardStats(
        total_workers=workers_count,
        total_sessions=sessions_count,
        completed_sessions=completed_sessions,
        average_score=float(avg_score)
    )
