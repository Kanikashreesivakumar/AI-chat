import { useState, useEffect } from 'react';

const useChat = () => {
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const sendMessage = async (message) => {
        setLoading(true);
        setError(null);

        try {
            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ message }),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            setMessages((prevMessages) => [...prevMessages, { text: message, type: 'user' }]);
            setMessages((prevMessages) => [...prevMessages, { text: data.response, type: 'ai' }]);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return {
        messages,
        loading,
        error,
        sendMessage,
    };
};

export default useChat;