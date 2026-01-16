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
                                    str(Path(__file__).parent.parent.parent / 