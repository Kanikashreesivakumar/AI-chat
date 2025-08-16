import React from 'react';
import ChatInterface from '../components/ChatInterface';
import VoiceInput from '../components/VoiceInput';

const HomePage = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <h1 className="text-4xl font-bold mb-4">AI Chat Application</h1>
            <ChatInterface />
            <VoiceInput />
        </div>
    );
};

export default HomePage;