import os
from dotenv import load_dotenv

load_dotenv()

class Settings:
    API_KEY: str = os.getenv("API_KEY")
    REDIS_URL: str = os.getenv("REDIS_URL")
    CHROMA_DB_URL: str = os.getenv("CHROMA_DB_URL")
    WHISPER_API_URL: str = os.getenv("WHISPER_API_URL")
    TTS_API_URL: str = os.getenv("TTS_API_URL")

settings = Settings()