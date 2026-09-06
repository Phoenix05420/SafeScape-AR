import uuid
import base64
from app.utils.qr_generator import generate_qr

def generate_certificate_number() -> str:
    return str(uuid.uuid4().hex[:12].upper())

def generate_qr_base64(cert_number: str) -> str:
    img = generate_qr(f"cert:{cert_number}")
    import io
    buffered = io.BytesIO()
    img.save(buffered, format="PNG")
    return base64.b64encode(buffered.getvalue()).decode("utf-8")
