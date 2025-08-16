import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000'; // Adjust the base URL as needed

export const sendMessage = async (message) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/chat`, { message });
        return response.data;
    } catch (error) {
        console.error('Error sending message:', error);
        throw error;
    }
};

export const sendVoiceInput = async (audioBlob) => {
    const formData = new FormData();
    formData.append('audio', audioBlob);

    try {
        const response = await axios.post(`${API_BASE_URL}/voice`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error sending voice input:', error);
        throw error;
    }
};