from fastapi import HTTPException
import openai
from typing import Optional, Dict, Any
import os
from datetime import datetime
import uuid

from config.settings import settings

# Configure OpenAI
openai.api_key = settings.OPENAI_API_KEY

async def generate_response(user_input: str, use_rag: bool = False, context: Optional[str] = None) -> str:
    """
    Generate a response using OpenAI's GPT model
    
    Args:
        user_input (str): The user's message
        use_rag (bool): Whether to use RAG for enhanced context
        context (Optional[str]): Additional context from documents if RAG is used
        
    Returns:
        str: The generated response
    """
    try:
        messages = []
        
        # Add system prompt
        system_prompt = "You are a helpful AI assistant."
        if use_rag and context:
            system_prompt += " Use the following context to answer the user's question:\n" + context
        
        messages.append({"role": "system", "content": system_prompt})
        messages.append({"role": "user", "content": user_input})
        
        completion = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",
            messages=messages,
            temperature=0.7,
        )
        
        response_text = completion.choices[0].message['content']
        return response_text
    except Exception as e:
        print(f"Error generating response: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Failed to generate response: {str(e)}")

def create_chat_message(content: str, role: str = "assistant") -> Dict[str, Any]:
    """
    Create a chat message object
    
    Args:
        content (str): The message content
        role (str): The role (user or assistant)
        
    Returns:
        Dict[str, Any]: The chat message object
    """
    return {
        "id": str(uuid.uuid4()),
        "content": content,
        "role": role,
        "timestamp": datetime.now(),
    }