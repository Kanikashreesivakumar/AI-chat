from fastapi import APIRouter, UploadFile, File
from fastapi.responses import JSONResponse
from config.settings import settings
from services.voice_service import VoiceService

router = APIRouter()
voice_service = VoiceService(settings.WHISPER_API_URL)

@router.post("/voice")
async def process_voice(file: UploadFile = File(...)):
    try:
    
        text_response, tts_audio = await voice_service.process_audio(file)
        return JSONResponse(content={"text_response": text_response, "tts_audio": tts_audio})
    except Exception as e:
        return JSONResponse(content={"error": str(e)}, status_code=500)