'use client';

import ChatInterface from '../components/ChatInterface';
import { Bot, Sparkles } from 'lucide-react';

export default function Home() {
  return (
    <main className="container mx-auto max-w-6xl h-screen flex flex-col p-4">
      
      <header className="glass-effect rounded-2xl p-6 mb-4 shadow-2xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl animate-float">
              <Bot size={28} className="text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                AI Chat Assistant
              </h1>
              <p className="text-gray-300 flex items-center space-x-2">
                <Sparkles size={16} className="text-purple-400" />
                <span>Powered by advanced AI • Long-term memory enabled</span>
              </p>
            </div>
          </div>
          
          <div className="hidden md:flex items-center space-x-2">
            <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-sm text-gray-300">Online</span>
          </div>
        </div>
      </header>
      
      {/* Chat Interface */}
      <div className="flex-1 overflow-hidden">
        <ChatInterface />
      </div>
    </main>
  );
}

