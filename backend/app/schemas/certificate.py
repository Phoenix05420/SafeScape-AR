from pydantic import BaseModel
from datetime import datetime
from typing import Optional

class CertificateResponse(BaseModel):
    id: int
    worker_id: int
    session_id: int
    certificate_number: str
    issued_at: datetime
    qr_code_data: Optional[str] = None
    is_valid: bool
    class Config:
        from_attributes = True

class CertificateVerifyResponse(BaseModel):
    is_valid: bool
    worker_name: str
    module_name: str
    issued_at: datetime
