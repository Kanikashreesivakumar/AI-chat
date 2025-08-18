'use client';

import { useState, useRef, useEffect } from 'react';
import { Send, Mic, MicOff, Loader2, Paperclip } from 'lucide-react';
import MessageList from './MessageList';
import VoiceInput from './VoiceInput';
import { useChat } from '../hooks/useChat';

interface Message {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: Date;
}

const ChatInterface: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { sendMessage } = useChat();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      role: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      // TODO: Replace with actual API call to your backend
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: input })
      });

      const data = await response.json();

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: data.response || 'I apologize, but I encountered an error. Please try again.',
        role: 'assistant',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Error sending message:', error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: 'Sorry, I encountered an error. Please try again.',
        role: 'assistant',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const toggleRecording = () => {
    // TODO: Implement voice recording
    setIsRecording(!isRecording);
    console.log('Voice recording not implemented yet');
  };

  const handleVoiceMessage = async (audioBlob: Blob): Promise<void> => {
    const formData = new FormData();
    formData.append('audio', audioBlob, 'voice.wav');
    
    try {
      const response = await fetch('/api/voice', {
        method: 'POST',
        body: formData,
      });
      
      const data = await response.json();
      if (data.success) {
        // Voice message handled by backend
        console.log('Voice message processed successfully');
      }
    } catch (error) {
      console.error('Voice message error:', error);
    }
  };

  const handleSuggestionClick = (suggestion: string): void => {
    setInput(suggestion);
  };

  const suggestions = [
    'Tell me a joke', 
    'What can you help me with?', 
    'Summarize my day'
  ];

  return (
    <div className="flex flex-col h-full glass-effect rounded-2xl shadow-2xl overflow-hidden">
      {/* Messages Area with enhanced styling */}
      <div className="flex-1 overflow-y-auto p-6">
        <MessageList messages={messages} isLoading={isLoading} />
      </div>

      {/* Enhanced Input Area */}
      <div className="border-t border-white/10 bg-black/20 backdrop-blur-md p-6">
        <div className="flex items-end space-x-4">
          {/* Enhanced Text Input */}
          <div className="flex-1 relative">
            <textarea
              value={input}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type your message..."
              className="input-field w-full resize-none min-h-[50px] max-h-32 pr-12"
              rows={1}
              disabled={isLoading}
              aria-label="Message input"
            />
            <button 
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-300 transition-colors"
              aria-label="Attach file"
            >
              <Paperclip size={18} />
            </button>
          </div>

          {/* Enhanced Voice Toggle */}
          <button
            onClick={toggleRecording}
            className={`p-3 rounded-xl transition-all duration-200 ${
              isRecording
                ? 'bg-red-500 text-white animate-pulse'
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            }`}
            disabled={isLoading}
            aria-label={isRecording ? 'Stop recording' : 'Start recording'}
          >
            {isRecording ? <MicOff size={20} /> : <Mic size={20} />}
          </button>

          {/* Enhanced Send Button */}
          <button
            onClick={handleSendMessage}
            disabled={!input.trim() || isLoading}
            className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-3 rounded-xl hover:from-blue-600 hover:to-purple-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Send message"
          >
            {isLoading ? (
              <Loader2 size={20} className="animate-spin" />
            ) : (
              <Send size={20} />
            )}
          </button>
        </div>

        {/* Enhanced Voice Input Component */}
        {isRecording && (
          <div className="mt-4 animate-in slide-in-from-bottom duration-300">
            <VoiceInput onVoiceMessage={handleVoiceMessage} />
          </div>
        )}

        {/* Quick Actions */}
        <div className="mt-4 flex flex-wrap gap-2">
          {suggestions.map((suggestion) => (
            <button
              key={suggestion}
              onClick={() => handleSuggestionClick(suggestion)}
              className="px-3 py-1 text-sm bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 transition-colors text-gray-300"
              disabled={isLoading}
            >
              {suggestion}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;