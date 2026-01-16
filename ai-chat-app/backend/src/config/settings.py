import os
from dotenv import load_dotenv
from pathlib import Path

load_dotenv()

class Settings:
    # API Keys
    OPENAI_API_KEY: str = os.getenv("OPENAI_API_KEY")
    
    # Database settings
    REDIS_URL: str = os.getenv("REDIS_URL", "redis://localhost:6379")
    
    # Vector store settings
    EMBEDDING_MODEL: str = os.getenv("EMBEDDING_MODEL", "text-embedding-ada-002")
    CHROMA_DB_URL: str = os.getenv("CHROMA_DB_URL")
    VECTOR_DB_PATH: str = os.getenv("VECTOR_DB_PATH", 
                                    str(Path(__file__).parent.parent.parent / "data" / "vector_db"))
    
   
    WHISPER_API_URL: str = os.getenv("WHISPER_API_URL", "https://api.oi.com/v1/audio/transcriptions")
    TTS_API_URL: str = os.getenv("TTS_API_URL")

    def __post_init__(self):
       
        Path(self.VECTOR_DB_PATH).parent.mkdir(parents=True, exist_ok=True)

        if not self.OPENAI_API_KEY:
            print("Warning: OPENAI_API_KEY not found in environment variables. Some features may not work.")

settings = Settings()