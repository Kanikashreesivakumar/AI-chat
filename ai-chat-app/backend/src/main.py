from fastapi import FastAPI
from api.chat import router as chat_router

app = FastAPI()

# Include API routers
app.include_router(chat_router, prefix="/chat")

@app.get("/")
def read_root():
    return {"message": "Welcome to the AI Chat Application!"}