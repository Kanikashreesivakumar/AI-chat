'use client';

import { Message } from '../hooks/useChat';
import { Bot, User, Copy, ThumbsUp, ThumbsDown } from 'lucide-react';

interface MessageListProps {
  messages: Message[];
  isLoading: boolean;
}

export default function MessageList({ messages, isLoading }: MessageListProps) {
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="space-y-6">
      {messages.length === 0 && (
        <div className="text-center py-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl mb-4 animate-float">
            <Bot size={32} className="text-white" />
          </div>
          <h3 className="text-xl font-semibold text-gray-200 mb-2">
            Welcome to AI Chat Assistant
          </h3>
          <p className="text-gray-400 max-w-md mx-auto">
            Start a conversation by typing a message or using voice input. I have long-term memory and can help you with various tasks.
          </p>
        </div>
      )}

      {messages.map((message) => (
        <div
          key={message.id}
          className={`flex items-start space-x-4 ${
            message.role === 'user' ? 'flex-row-reverse space-x-reverse' : ''
          } animate-in slide-in-from-bottom duration-300`}
        >
          {/* Enhanced Avatar */}
          <div
            className={`p-3 rounded-xl shadow-lg ${
              message.role === 'user'
                ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white'
                : 'bg-white/10 backdrop-blur-md text-gray-100 border border-white/20'
            }`}
          >
            {message.role === 'user' ? <User size={18} /> : <Bot size={18} />}
          </div>

          {/* Enhanced Message Content */}
          <div className="flex-1 max-w-2xl">
            <div
              className={`px-6 py-4 rounded-2xl shadow-lg ${
                message.role === 'user'
                  ? 'chat-bubble-user'
                  : 'chat-bubble-ai'
              }`}
            >
              <p className="text-sm leading-relaxed whitespace-pre-wrap">
                {message.content}
              </p>
              
              <div className="flex items-center justify-between mt-3 pt-2 border-t border-white/10">
                <span className="text-xs opacity-70">
                  {new Date(message.timestamp).toLocaleTimeString()}
                </span>
                
                {message.role === 'assistant' && (
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => copyToClipboard(message.content)}
                      className="p-1 hover:bg-white/10 rounded transition-colors"
                      title="Copy message"
                    >
                      <Copy size={14} />
                    </button>
                    <button
                      className="p-1 hover:bg-white/10 rounded transition-colors"
                      title="Good response"
                    >
                      <ThumbsUp size={14} />
                    </button>
                    <button
                      className="p-1 hover:bg-white/10 rounded transition-colors"
                      title="Poor response"
                    >
                      <ThumbsDown size={14} />
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Enhanced Loading Indicator */}
      {isLoading && (
        <div className="flex items-start space-x-4 animate-in slide-in-from-bottom duration-300">
          <div className="p-3 rounded-xl bg-white/10 backdrop-blur-md text-gray-100 border border-white/20 shadow-lg">
            <Bot size={18} />
          </div>
          <div className="chat-bubble-ai">
            <div className="flex items-center space-x-2">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              </div>
              <span className="text-sm text-gray-300">Thinking...</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}