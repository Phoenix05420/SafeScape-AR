from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from datetime import datetime
from app.database import get_db
from app.models.user import User
from app.schemas.sync import SyncRequest, SyncResponse
from app.auth.jwt import get_current_user
from app.models.training_session import TrainingSession
from app.models.assessment import AssessmentResult

router = APIRouter()

@router.post("/sessions", response_model=SyncResponse)
async def sync_offline_sessions(request: SyncRequest, db: AsyncSession = Depends(get_db), current_user: User = Depends(get_current_user)):
    count = 0
    for offline_session in request.sessions:
        new_session = TrainingSession(
            worker_id=current_user.id,
            module_id=offline_session.module_id,
            status=offline_session.session_update.status,
            score=offline_session.session_update.score,
            time_taken_seconds=offline_session.session_update.time_taken_seconds,
            is_offline=True,
            synced_at=datetime.utcnow()
        )
        db.add(new_session)
        await db.flush()
        
        for task in offline_session.assessments:
            ar = AssessmentResult(
                session_id=new_session.id,
                **task.model_dump()
            )
            db.add(ar)
        count += 1
    await db.commit()
    return SyncResponse(status="success", synced_count=count)
