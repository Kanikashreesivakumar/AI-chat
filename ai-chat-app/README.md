# AI Chat Application

This project implements a voice and text AI chat application using Python, FastAPI, LangChain, Redis/ChromaDB, and Next.js. The application allows users to interact with an AI model through both text and voice inputs.

## Project Structure

```
ai-chat-app
├── backend
│   ├── src
│   │   ├── main.py                # Entry point for the FastAPI application
│   │   ├── api                    # API routes
│   │   │   ├── __init__.py
│   │   │   ├── chat.py            # /chat endpoint for text input
│   │   │   └── voice.py           # /voice endpoint for audio input
│   │   ├── services                # Business logic services
│   │   │   ├── __init__.py
│   │   │   ├── ai_service.py       # Interacts with OpenAI API
│   │   │   ├── voice_service.py    # Handles voice processing
│   │   │   └── vector_store.py     # Manages Redis/ChromaDB interactions
│   │   ├── models                  # Data models
│   │   │   ├── __init__.py
│   │   │   └── chat_models.py      # Defines chat message models
│   │   └── config                  # Configuration settings
│   │       ├── __init__.py
│   │       └── settings.py         # Loads environment variables and API keys
│   ├── notebooks                   # Jupyter Notebooks for prototyping
│   │   ├── langchain_prototype.ipynb
│   │   ├── voice_processing.ipynb
│   │   └── vector_store_experiments.ipynb
│   ├── requirements.txt            # Python dependencies
│   └── Dockerfile                  # Docker image instructions
├── frontend                        # Next.js frontend application
│   ├── src
│   │   ├── app
│   │   │   ├── page.tsx            # Main page component
│   │   │   ├── layout.tsx          # Layout structure
│   │   │   └── globals.css         # Global CSS styles
│   │   ├── components              # UI components
│   │   │   ├── ChatInterface.tsx
│   │   │   ├── VoiceInput.tsx
│   │   │   └── MessageList.tsx
│   │   ├── hooks                   # Custom hooks
│   │   │   └── useChat.ts
│   │   └── utils                   # Utility functions
│   │       └── api.ts
│   ├── package.json                # npm configuration
│   ├── next.config.js              # Next.js configuration
│   └── tailwind.config.js          # Tailwind CSS configuration
├── docker-compose.yml              # Docker Compose configurations
└── README.md                       # Project documentation
```

## Installation

1. Clone the repository:
   ```
   git clone <repository-url>
   cd ai-chat-app
   ```

2. Navigate to the backend directory and install the dependencies:
   ```
   cd backend
   pip install -r requirements.txt
   ```

3. For the frontend, navigate to the frontend directory and install the dependencies:
   ```
   cd frontend
   npm install
   ```

## Running the Application

1. Start the backend server:
   ```
   cd backend
   uvicorn src.main:app --reload
   ```

2. Start the frontend application:
   ```
   cd frontend
   npm run dev
   ```

3. Access the application in your browser at `http://localhost:3000`.

## Usage

- Use the text input field to send messages to the AI.
- Use the voice input feature to speak your messages, which will be processed and responded to by the AI.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any enhancements or bug fixes.

## License

This project is licensed under the MIT License. See the LICENSE file for details.