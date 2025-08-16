import React from 'react';

const MessageList = ({ messages }) => {
    return (
        <div className="message-list">
            {messages.map((message, index) => (
                <div key={index} className={`message ${message.isUser ? 'user-message' : 'ai-message'}`}>
                    <p>{message.text}</p>
                </div>
            ))}
        </div>
    );
};

export default MessageList;