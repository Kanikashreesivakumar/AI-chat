from fastapi import APIRouter, HTTPException, BackgroundTasks
from pydantic import BaseModel
from typing import List, Optional, Dict, Any
import uuid
from datetime import datetime

from services.ai_service import generate_response, create_chat_message
from services.vector_store import VectorStore
from models.chat_models import ChatMessage

router = APIRouter()
vector_store = VectorStore()


chat_history: Dict[str, List[ChatMessage]] = {}

class ChatRequest(BaseModel):
    user_input: str
    use_rag: bool = False

class ChatResponse(BaseModel):
    response: str

@router.post("/", response_model=ChatResponse)
async def chat_endpoint(chat_request: ChatRequest):
    """
    Process a chat request and generate a response
    
    If use_rag is True, it will use the vector store to retrieve relevant context
    """
    try:
        context = None
        if chat_request.use_rag:
            context = vector_store.get_relevant_context(chat_request.user_input)
        
    
        response = await generate_response(
            user_input=chat_request.user_input,
            use_rag=chat_request.use_rag,
            context=context
        )
        
        return ChatResponse(response=response)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/history/{user_id}", response_model=List[ChatMessage])
async def get_chat_history(user_id: str):
    """Get chat history for specific user"""
    if user_id not in chat_history:
        return []
    
    return chat_history[user_id]

@router.post("/history/{user_id}", status_code=201)
async def add_to_chat_history(user_id: str, message: ChatMessage):
    """Add a message to a user's chat history"""
    if user_id not in chat_history:
        chat_history[user_id] = []
    
    chat_history[user_id].append(message)
    return {"status": "Message added to history"}

class UpdateChatRequest(BaseModel):
    message_id: str
    new_content: str

@router.put("/chat", response_model=ChatResponse)
async def update_chat_message(update_request: UpdateChatRequest):
    """Update an existing chat message (used for edits)"""
    # In a real implementation, this would update the message in a database
    # For this demo, we'll just return success
    return ChatResponse(response="Message updated successfully")

class DocumentUploadRequest(BaseModel):
    content: str
    title: str
    metadata: Dict[str, Any] = {}

@router.post("/documents", status_code=201)
async def upload_document(doc_request: DocumentUploadRequest, background_tasks: BackgroundTasks):
    """
    Upload a document to the vector store for RAG
    
    Processes the document in the background to avoid blocking the response
    """
    try:
        # Add basic metadata
        metadata = {
            "title": doc_request.title,
            "source": "user_upload",
            "timestamp": datetime.now().isoformat(),
            **doc_request.metadata
        }
        
        # Process in background
        background_tasks.add_task(
            vector_store.add_document,
            text=doc_request.content,
            metadata=metadata
        )
        
        return {"status": "Document queued for processing"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error processing document: {str(e)}")