from fastapi import HTTPException
import openai
from pydantic import BaseModel
import os

# Load environment variables
openai.api_key = os.getenv("OPENAI_API_KEY")

class ChatRequest(BaseModel):
    message: str

class ChatResponse(BaseModel):
    response: str

async def generate_response(chat_request: ChatRequest) -> ChatResponse:
    try:
        completion = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",
            messages=[{"role": "user", "content": chat_request.message}]
        )
        response_text = completion.choices[0].message['content']
        return ChatResponse(response=response_text)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))