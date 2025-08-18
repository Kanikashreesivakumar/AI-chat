from fastapi import APIRouter, UploadFile, File
from fastapi.responses import JSONResponse
from services.voice_service import VoiceService

router = APIRouter()
voice_service = VoiceService()

@router.post("/voice")
async def process_voice(file: UploadFile = File(...)):
    try:
        # Process the audio file and get the text response
        text_response, tts_audio = await voice_service.process_audio(file)
        return JSONResponse(content={"text_response": text_response, "tts_audio": tts_audio})
    except Exception as e:
        return JSONResponse(content={"error": str(e)}, status_code=500)