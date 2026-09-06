from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from typing import List
from app.database import get_db
from app.models.certificate import Certificate
from app.models.training_session import TrainingSession, SessionStatusEnum
from app.models.user import User
from app.models.training_module import TrainingModule
from app.schemas.certificate import CertificateResponse, CertificateVerifyResponse
from app.auth.jwt import get_current_user
from app.services.certificate_service import generate_certificate_number, generate_qr_base64

router = APIRouter()

@router.post("/generate", response_model=CertificateResponse)
async def generate_certificate(session_id: int, db: AsyncSession = Depends(get_db), current_user: User = Depends(get_current_user)):
    result = await db.execute(select(TrainingSession).where(TrainingSession.id == session_id, TrainingSession.worker_id == current_user.id))
    session = result.scalars().first()
    
    if not session or session.status != SessionStatusEnum.completed:
        raise HTTPException(status_code=400, detail="Invalid session or session not completed successfully")
    
    cert_num = generate_certificate_number()
    qr_data = generate_qr_base64(cert_num)
    
    cert = Certificate(
        worker_id=current_user.id,
        session_id=session_id,
        certificate_number=cert_num,
        qr_code_data=qr_data
    )
    db.add(cert)
    await db.commit()
    await db.refresh(cert)
    return cert

@router.get("/{cert_number}/verify", response_model=CertificateVerifyResponse)
async def verify_certificate(cert_number: str, db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(Certificate).where(Certificate.certificate_number == cert_number))
    cert = result.scalars().first()
    if not cert or not cert.is_valid:
        raise HTTPException(status_code=404, detail="Invalid certificate")
    
    worker_result = await db.execute(select(User).where(User.id == cert.worker_id))
    worker = worker_result.scalars().first()
    
    session_result = await db.execute(select(TrainingSession).where(TrainingSession.id == cert.session_id))
    session = session_result.scalars().first()
    
    module_result = await db.execute(select(TrainingModule).where(TrainingModule.id == session.module_id))
    module = module_result.scalars().first()
    
    return CertificateVerifyResponse(
        is_valid=True,
        worker_name=worker.full_name,
        module_name=module.title,
        issued_at=cert.issued_at
    )

@router.get("/worker/{worker_id}", response_model=List[CertificateResponse])
async def get_worker_certificates(worker_id: int, db: AsyncSession = Depends(get_db), current_user: User = Depends(get_current_user)):
    if current_user.id != worker_id and current_user.role.value != "admin":
         raise HTTPException(status_code=403, detail="Not authorized")
    result = await db.execute(select(Certificate).where(Certificate.worker_id == worker_id))
    return result.scalars().all()
