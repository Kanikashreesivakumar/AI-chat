from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import List

from services.ai_service import generate_response
from models.chat_models import ChatMessage

router = APIRouter()

class ChatRequest(BaseModel):
    user_input: str

class ChatResponse(BaseModel):
    response: str

@router.post("/", response_model=ChatResponse)
async def chat_endpoint(chat_request: ChatRequest):
    return ChatResponse(response="Hello from backend!")

@router.get("/history/{user_id}", response_model=List[ChatMessage])
async def get_chat_history(user_id: str):
  

    history = []  
    return history

class UpdateChatRequest(BaseModel):
    message_id: str
    new_content: str

@router.put("/chat", response_model=ChatResponse)
async def update_chat_message(update_request: UpdateChatRequest):
    # TODO: Update the message in your database/vector DB
   
   
    success = True  # Replace with actual update logic
    if not success:
        raise HTTPException(status_code=404, detail="input not found")
    return ChatResponse(response=" updated successfully ")