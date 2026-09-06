from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from datetime import datetime
from typing import List
from app.database import get_db
from app.models.training_module import TrainingModule
from app.models.training_session import TrainingSession, SessionStatusEnum
from app.models.user import User
from app.schemas.training import TrainingModuleCreate, TrainingModuleResponse, TrainingSessionCreate, TrainingSessionUpdate, TrainingSessionResponse
from app.auth.jwt import get_current_user, require_admin

router = APIRouter()

@router.get("/modules", response_model=List[TrainingModuleResponse])
async def list_modules(db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(TrainingModule).where(TrainingModule.is_active == True))
    return result.scalars().all()

@router.post("/modules", response_model=TrainingModuleResponse)
async def create_module(module: TrainingModuleCreate, db: AsyncSession = Depends(get_db), current_user: User = Depends(require_admin)):
    new_module = TrainingModule(**module.model_dump())
    db.add(new_module)
    await db.commit()
    await db.refresh(new_module)
    return new_module

@router.post("/sessions", response_model=TrainingSessionResponse)
async def start_session(session: TrainingSessionCreate, db: AsyncSession = Depends(get_db), current_user: User = Depends(get_current_user)):
    new_session = TrainingSession(
        worker_id=current_user.id,
        module_id=session.module_id,
        is_offline=session.is_offline,
        status=SessionStatusEnum.in_progress,
        started_at=datetime.utcnow()
    )
    db.add(new_session)
    await db.commit()
    await db.refresh(new_session)
    return new_session

@router.put("/sessions/{id}", response_model=TrainingSessionResponse)
async def update_session(id: int, session_update: TrainingSessionUpdate, db: AsyncSession = Depends(get_db), current_user: User = Depends(get_current_user)):
    result = await db.execute(select(TrainingSession).where(TrainingSession.id == id, TrainingSession.worker_id == current_user.id))
    session = result.scalars().first()
    if not session:
        raise HTTPException(status_code=404, detail="Session not found")
    
    session.status = session_update.status
    if session_update.score is not None:
        session.score = session_update.score
    if session_update.time_taken_seconds is not None:
        session.time_taken_seconds = session_update.time_taken_seconds
    
    if session_update.status in [SessionStatusEnum.completed, SessionStatusEnum.failed]:
        session.completed_at = datetime.utcnow()
        
    await db.commit()
    await db.refresh(session)
    return session

@router.get("/sessions", response_model=List[TrainingSessionResponse])
async def list_my_sessions(db: AsyncSession = Depends(get_db), current_user: User = Depends(get_current_user)):
    result = await db.execute(select(TrainingSession).where(TrainingSession.worker_id == current_user.id))
    return result.scalars().all()
