import os
from dotenv import load_dotenv
from pathlib import Path

load_dotenv()

class Settings:
    # API Keys
    OPENAI_API_KEY: str = os.getenv("OPENAI_API_KEY")