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

    def __post_init__(self):
       
        Path(self.VECTOR_DB_PATH).parent.mkdir(parents=True, exist_ok=True)

        if not self.OPENAI_API_KEY:
            print("Warning: OPENAI_API_KEY not found in environment variables. Some features may not work.")

settings = Settings()