from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from typing import List
from app.database import get_db
from app.models.assessment import AssessmentResult
from app.models.training_session import TrainingSession
from app.models.user import User
from app.schemas.assessment import AssessmentSubmission, AssessmentResultResponse
from app.auth.jwt import get_current_user

router = APIRouter()

@router.post("/submit")
async def submit_assessment(submission: AssessmentSubmission, db: AsyncSession = Depends(get_db), current_user: User = Depends(get_current_user)):
    result = await db.execute(select(TrainingSession).where(TrainingSession.id == submission.session_id, TrainingSession.worker_id == current_user.id))
    session = result.scalars().first()
    if not session:
        raise HTTPException(status_code=404, detail="Session not found")
    
    for task in submission.results:
        ar = AssessmentResult(
            session_id=session.id,
            **task.model_dump()
        )
        db.add(ar)
    
    await db.commit()
    return {"message": "Assessments submitted successfully"}

@router.get("/session/{session_id}", response_model=List[AssessmentResultResponse])
async def get_session_assessments(session_id: int, db: AsyncSession = Depends(get_db), current_user: User = Depends(get_current_user)):
    result = await db.execute(select(AssessmentResult).where(AssessmentResult.session_id == session_id))
    return result.scalars().all()
