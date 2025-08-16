import React, { useState } from 'react';

const VoiceInput = ({ onSend }) => {
    const [isRecording, setIsRecording] = useState(false);
    const [recognition, setRecognition] = useState(null);

    const startRecording = () => {
        if (!('webkitSpeechRecognition' in window)) {
            alert('Your browser does not support speech recognition. Please use Chrome or Firefox.');
            return;
        }

        const SpeechRecognition = window.webkitSpeechRecognition;
        const recognitionInstance = new SpeechRecognition();
        recognitionInstance.interimResults = false;
        recognitionInstance.lang = 'en-US';

        recognitionInstance.onstart = () => {
            setIsRecording(true);
        };

        recognitionInstance.onresult = (event) => {
            const transcript = event.results[0][0].transcript;
            onSend(transcript);
            stopRecording();
        };

        recognitionInstance.onend = () => {
            setIsRecording(false);
        };

        recognitionInstance.onerror = (event) => {
            console.error('Speech recognition error', event.error);
            stopRecording();
        };

        recognitionInstance.start();
        setRecognition(recognitionInstance);
    };

    const stopRecording = () => {
        if (recognition) {
            recognition.stop();
        }
    };

    return (
        <div>
            <button onClick={isRecording ? stopRecording : startRecording}>
                {isRecording ? 'Stop Recording' : 'Start Recording'}
            </button>
        </div>
    );
};

export default VoiceInput;