# AI Chat Application

A full-stack AI-powered chat application with Retrieval-Augmented Generation (RAG), voice processing, and vector-based semantic search capabilities. Built with a FastAPI backend and Next.js frontend.

## 🌟 Features

- **Conversational AI Chat**: Real-time chat interface powered by LangChain and OpenAI
- **Retrieval-Augmented Generation (RAG)**: Enhanced context-aware responses using ChromaDB vector store
- **Voice Processing**: 
  - Speech-to-text conversion using SpeechRecognition
  - Text-to-speech synthesis using Google Text-to-Speech
  - Voice input and output support in chat interface
- **Document Upload**: Upload documents for context-aware conversations
- **Vector Store**: Semantic search using ChromaDB with vector embeddings
- **Session Management**: Persistent chat history per session
- **Responsive UI**: Modern, mobile-friendly interface built with Next.js and Radix UI
- **Auto-Caching**: Redis-based caching for optimized performance

## 🏗️ Project Architecture

### Backend (FastAPI)
```
backend/
├── src/
│   ├── main.py              # FastAPI application entry point
│   ├── api/
│   │   ├── chat.py          # Chat endpoints and request handling
│   │   └── voice.py         # Voice processing endpoints
│   ├── config/
│   │   └── settings.py      # Configuration management
│   ├── models/
│   │   └── chat_models.py   # Pydantic models for data validation
│   ├── services/
│   │   ├── ai_service.py    # LangChain AI logic and response generation
│   │   ├── vector_store.py  # ChromaDB vector store management
│   │   └── voice_service.py # Speech recognition and synthesis
│   └── __init__.py
├── requirements.txt         # Python dependencies
├── Dockerfile              # Docker configuration for containerization
├── notebooks/              # Development and experimentation notebooks
│   ├── langchain_prototype.ipynb
│   ├── vector_store_experiments.ipynb
│   └── voice_processing.ipynb
└── tests/                  # Test suite
    ├── api_chat_test.py
    └── selenium_chat_test.py
```

### Frontend (Next.js + TypeScript)
```
frontend/
├── app/
│   ├── page.tsx            # Main chat page
│   ├── layout.tsx          # Root layout
│   ├── globals.css         # Global styles
│   └── api/
│       └── documents/      # Document upload endpoints
├── components/
│   ├── chat-header.tsx     # Chat interface header
│   ├── chat-input.tsx      # User input component with voice support
│   ├── chat-messages.tsx   # Message display component
│   ├── document-upload.tsx # File upload handler
│   ├── message-bubble.tsx  # Individual message display
│   ├── quick-suggestions.tsx   # Suggested prompts
│   ├── typing-indicator.tsx    # AI typing animation
│   ├── voice-visualizer.tsx    # Voice waveform visualization
│   ├── theme-provider.tsx  # Theme configuration
│   └── ui/                 # Radix UI components library
├── hooks/
│   ├── use-mobile.ts       # Mobile detection hook
│   └── use-toast.ts        # Toast notification hook
├── lib/
│   ├── chat-service.ts     # API client for chat endpoint
│   └── utils.ts            # Utility functions
├── package.json            # Dependencies and scripts
├── tsconfig.json           # TypeScript configuration
├── next.config.mjs         # Next.js configuration
└── postcss.config.mjs      # PostCSS configuration
```

## 🚀 Getting Started

### Prerequisites

- **Backend**: Python 3.9+
- **Frontend**: Node.js 18+ and pnpm
- **API Key**: OpenAI API key for LLM capabilities
- **Optional**: Docker for containerization

### Installation

#### 1. Backend Setup

```bash
cd backend

# Create a virtual environment
python -m venv venv

# Activate virtual environment
# On Windows:
venv\Scripts\activate
# On macOS/Linux:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Create .env file with your OpenAI API key
echo OPENAI_API_KEY=your_api_key_here > .env
```

#### 2. Frontend Setup

```bash
cd frontend

# Install dependencies
pnpm install

# Create .env.local file if needed for API configuration
echo NEXT_PUBLIC_API_URL=http://localhost:8000 > .env.local
```

## 🏃 Running the Application

### Backend Server

```bash
cd backend

# Activate virtual environment (if not already activated)
source venv/bin/activate  # or venv\Scripts\activate on Windows

# Start FastAPI server
python -m uvicorn src.main:app --reload --host 0.0.0.0 --port 8000
```

The API will be available at `http://localhost:8000`
- API Documentation: `http://localhost:8000/docs`
- ReDoc Documentation: `http://localhost:8000/redoc`

### Frontend Application

```bash
cd frontend

# Development mode
pnpm dev

# Production build
pnpm build
pnpm start
```

The frontend will be available at `http://localhost:3000`

## 📦 Dependencies

### Backend
- **FastAPI**: Modern web framework for building APIs
- **LangChain**: Framework for developing applications powered by language models
- **OpenAI**: LLM and embeddings API client
- **ChromaDB**: Vector database for semantic search
- **Redis**: Caching layer for performance optimization
- **SpeechRecognition**: Speech-to-text conversion
- **gTTS (Google Text-to-Speech)**: Text-to-speech synthesis
- **Uvicorn**: ASGI server for running FastAPI

### Frontend
- **Next.js**: React framework for production applications
- **React**: UI library
- **TypeScript**: Type-safe JavaScript
- **Radix UI**: Unstyled, accessible UI components
- **Tailwind CSS**: Utility-first CSS framework
- **AI SDK**: Vercel's SDK for AI integration
- **React Hook Form**: Efficient form handling

## 🔗 API Endpoints

### Chat Endpoints

#### POST `/chat/`
Process a chat request and generate a response.

**Request Body:**
```json
{
  "user_input": "Your question or message",
  "use_rag": false
}
```

**Response:**
```json
{
  "response": "AI-generated response"
}
```

**Query Parameters:**
- `use_rag` (boolean, optional): Enable Retrieval-Augmented Generation for context-aware responses

### Voice Endpoints

#### POST `/chat/voice`
Process voice input and return voice output.

**Request:** Audio file (multipart/form-data)

**Response:** Audio file

## 📝 Configuration

### Environment Variables

Create a `.env` file in the backend directory:

```
OPENAI_API_KEY=your_openai_api_key
REDIS_URL=redis://localhost:6379
CHROMADB_PATH=./data/chroma
LOG_LEVEL=INFO
```

### Frontend Configuration

Create a `.env.local` file in the frontend directory:

```
NEXT_PUBLIC_API_URL=http://localhost:8000
NEXT_PUBLIC_APP_NAME=AI Chat
```

## 🧪 Testing

### Backend Tests

```bash
cd backend

# Run chat API tests
python -m pytest tests/api_chat_test.py -v

# Run Selenium integration tests
python -m pytest tests/selenium_chat_test.py -v

# Run all tests
python -m pytest tests/ -v
```

## 🐳 Docker Support

### Build and Run with Docker

```bash
cd backend

# Build Docker image
docker build -t ai-chat-backend .

# Run container
docker run -p 8000:8000 \
  -e OPENAI_API_KEY=your_api_key \
  ai-chat-backend
```

## 📊 Project Structure Highlights

### Key Services

#### AI Service (`services/ai_service.py`)
- Handles LangChain chain configuration
- Generates AI responses using OpenAI
- Manages conversation context and chat history

#### Vector Store (`services/vector_store.py`)
- Manages ChromaDB collections
- Stores and retrieves document embeddings
- Enables semantic search for RAG functionality

#### Voice Service (`services/voice_service.py`)
- Converts speech to text using SpeechRecognition
- Converts text to speech using Google TTS
- Handles audio processing and streaming

### Chat Models (`models/chat_models.py`)
- Defines data structures for messages and conversations
- Provides Pydantic validation for API requests/responses
- Ensures type safety throughout the application

## 🔐 Security Considerations

- API endpoints secured with CORS middleware
- Environment variables used for sensitive configuration
- Input validation using Pydantic models
- HTTPS recommended for production deployment

## 🚀 Deployment

### Production Deployment

1. **Backend**: Deploy FastAPI app using Gunicorn + Uvicorn
2. **Frontend**: Deploy Next.js app to Vercel, Netlify, or container platform
3. **Database**: Use managed Redis and ChromaDB services
4. **API Keys**: Store in environment variables or secret management system

### Recommended Stack
- Backend: Docker on AWS ECS, Google Cloud Run, or Azure Container Instances
- Frontend: Vercel, Netlify, or GitHub Pages
- Vector Store: Pinecone, Weaviate, or self-hosted ChromaDB
- Caching: AWS ElastiCache or similar

## 📚 Notebooks

The `backend/notebooks/` directory contains Jupyter notebooks for experimentation:

- **langchain_prototype.ipynb**: LangChain implementation exploration
- **vector_store_experiments.ipynb**: ChromaDB and embedding experiments
- **voice_processing.ipynb**: Speech recognition and synthesis testing

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Troubleshooting

### Backend Issues

**Port 8000 already in use:**
```bash
# Use a different port
python -m uvicorn src.main:app --port 8001
```

**OpenAI API Key not found:**
- Ensure `.env` file is in the backend root directory
- Verify `OPENAI_API_KEY` is set correctly
- Restart the server after adding the key

### Frontend Issues

**Port 3000 already in use:**
```bash
pnpm dev -- -p 3001
```

**CORS errors:**
- Verify backend CORS settings in `src/main.py`
- Ensure frontend URL is in CORS allowed origins

### Voice Processing Issues

- Check microphone permissions in browser settings
- Ensure SpeechRecognition API is supported
- Test audio input devices in system settings

## 📞 Support

For issues, questions, or suggestions, please open an issue on GitHub or contact the development team.

## 🎯 Roadmap

- [ ] Multi-language support
- [ ] Advanced RAG with multiple document types
- [ ] Real-time collaboration features
- [ ] Custom model fine-tuning
- [ ] Analytics dashboard
- [ ] Mobile native apps (iOS/Android)

---

**Last Updated**: January 2026

**Version**: 0.1.0

**Status**: Active Development
