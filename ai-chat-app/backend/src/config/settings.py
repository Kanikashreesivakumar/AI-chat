import os
from dotenv import load_dotenv
from pathlib import Path

load_dotenv()

class Settings:
    # API Keys
    OPENAI_API_KEY
            print("Warning: OPENAI_API_KEY not found in environment variables. Some features may not work.")

settings = Settings()