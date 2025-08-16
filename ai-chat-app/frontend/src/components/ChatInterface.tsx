import React, { useState } from 'react';

const ChatInterface = () => {
    const [input, setInput] = useState('');
    const [messages, setMessages] = useState([]);

    const handleSend = async () => {
        if (!input) return;

        const newMessage = { text: input, sender: 'user' };
        setMessages([...messages, newMessage]);

        // Call the backend API to get the AI response
        const response = await fetch('/api/chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ message: input }),
        });

        const data = await response.json();
        const aiMessage = { text: data.response, sender: 'ai' };
        setMessages((prevMessages) => [...prevMessages, aiMessage]);
        setInput('');
    };

    return (
        <div className="chat-interface">
            <div className="message-list">
                {messages.map((msg, index) => (
                    <div key={index} className={msg.sender}>
                        {msg.text}
                    </div>
                ))}
            </div>
            <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Type your message..."
            />
            <button onClick={handleSend}>Send</button>
        </div>
    );
};

export default ChatInterface;