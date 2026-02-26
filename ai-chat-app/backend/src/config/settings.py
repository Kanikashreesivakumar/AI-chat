import os
from dotenv import load_dotenv
from pathlib import Path

load_dotenv()

class Settings:
    # API Keys
    OPENAI_API_KEY: str = os.getenv("OPENAI_API
    CHROMA_DB_URL: str = os.getenv("CHROMA_DB_URL")
    VECTOR_DB_PATH: str = os.getenv("VECTOR_DB_PATH", 
                                    str
   
    WHISPER_API_URL: str = os.getenv("WHISPER_API_URL", "https://api.openai.com/v1/audio/transcriptions")
    TTS_API_URL: str = os.getenv("TTS_API_URL")
            print("Warning: OPENAI_API_KEY not found in environment variables. Some features may not work.")

settings = Settings()