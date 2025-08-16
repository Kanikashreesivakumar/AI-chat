from pydantic import BaseModel
from typing import Optional, List

class ChatMessage(BaseModel):
    user_id: str
    message: str
    timestamp: str

class UserPreferences(BaseModel):
    user_id: str
    preferred_language: Optional[str] = "en"
    chat_history: List[ChatMessage] = []