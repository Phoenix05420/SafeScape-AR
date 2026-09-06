from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from typing import List
from app.database import get_db
from app.models.user import User, RoleEnum
from app.schemas.user import UserResponse, UserUpdate
from app.auth.jwt import get_current_user, require_admin

router = APIRouter()

@router.get("", response_model=List[UserResponse])
async def list_workers(skip: int = 0, limit: int = 100, db: AsyncSession = Depends(get_db), current_user: User = Depends(require_admin)):
    result = await db.execute(select(User).where(User.role == RoleEnum.worker).offset(skip).limit(limit))
    return result.scalars().all()

@router.get("/{id}", response_model=UserResponse)
async def get_worker(id: int, db: AsyncSession = Depends(get_db), current_user: User = Depends(get_current_user)):
    result = await db.execute(select(User).where(User.id == id, User.role == RoleEnum.worker))
    worker = result.scalars().first()
    if not worker:
        raise HTTPException(status_code=404, detail="Worker not found")
    return worker

@router.put("/{id}", response_model=UserResponse)
async def update_worker(id: int, update_data: UserUpdate, db: AsyncSession = Depends(get_db), current_user: User = Depends(require_admin)):
    result = await db.execute(select(User).where(User.id == id))
    worker = result.scalars().first()
    if not worker:
        raise HTTPException(status_code=404, detail="Worker not found")
    
    for key, value in update_data.model_dump(exclude_unset=True).items():
        setattr(worker, key, value)
    
    await db.commit()
    await db.refresh(worker)
    return worker

@router.delete("/{id}")
async def delete_worker(id: int, db: AsyncSession = Depends(get_db), current_user: User = Depends(require_admin)):
    result = await db.execute(select(User).where(User.id == id))
    worker = result.scalars().first()
    if not worker:
        raise HTTPException(status_code=404, detail="Worker not found")
    
    worker.is_active = False
    await db.commit()
    return {"message": "Worker deactivated"}
