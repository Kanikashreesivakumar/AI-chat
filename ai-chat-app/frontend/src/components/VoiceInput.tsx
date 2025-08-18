'use client';

import { useState, useRef, useCallback, useEffect } from 'react';
import { Mic, Square } from 'lucide-react';

interface VoiceInputProps {
  onVoiceMessage: (audioBlob: Blob) => void;
}

export default function VoiceInput({ onVoiceMessage }: VoiceInputProps) {
  const [isRecording, setIsRecording] = useState(false);
  const [audioLevel, setAudioLevel] = useState(0);
  const [recordingTime, setRecordingTime] = useState(0);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Audio level monitoring
  useEffect(() => {
    if (isRecording && analyserRef.current) {
      const dataArray = new Uint8Array(analyserRef.current.frequencyBinCount);
      
      const updateAudioLevel = () => {
        if (analyserRef.current) {
          analyserRef.current.getByteFrequencyData(dataArray);
          const average = dataArray.reduce((sum, value) => sum + value, 0) / dataArray.length;
          setAudioLevel(average / 255 * 100);
        }
        
        if (isRecording) {
          requestAnimationFrame(updateAudioLevel);
        }
      };
      
      updateAudioLevel();
    }
  }, [isRecording]);

  // Recording timer
  useEffect(() => {
    if (isRecording) {
      timerRef.current = setInterval(() => {
        setRecordingTime(prev => prev + 1);
      }, 1000);
    } else {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
      setRecordingTime(0);
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [isRecording]);

  const handleVoiceMessage = useCallback((audioBlob: Blob) => {
    if (onVoiceMessage) {
      onVoiceMessage(audioBlob);
    }
  }, [onVoiceMessage]);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          sampleRate: 44100
        }
      });
      
      // Setup audio analysis
      audioContextRef.current = new AudioContext();
      const source = audioContextRef.current.createMediaStreamSource(stream);
      analyserRef.current = audioContextRef.current.createAnalyser();
      analyserRef.current.fftSize = 256;
      source.connect(analyserRef.current);
      
      const mediaRecorder = new MediaRecorder(stream, {
        mimeType: 'audio/webm;codecs=opus'
      });
      
      mediaRecorderRef.current = mediaRecorder;
      chunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          chunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(chunksRef.current, { type: 'audio/webm' });
        handleVoiceMessage(audioBlob);
        stream.getTracks().forEach(track => track.stop());
        
        if (audioContextRef.current) {
          audioContextRef.current.close();
        }
      };

      mediaRecorder.start();
      setIsRecording(true);
    } catch (error) {
      console.error('Error starting recording:', error);
      alert('Unable to access microphone. Please check permissions.');
    }
  };

  const stopRecording = useCallback(() => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      setAudioLevel(0);
    }
  }, [isRecording]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="glass-effect rounded-2xl p-6 shadow-lg">
      <div className="flex items-center justify-center space-x-6">
        {/* Recording Button */}
        <button
          onClick={isRecording ? stopRecording : startRecording}
          className={`p-6 rounded-full transition-all duration-300 ${
            isRecording
              ? 'bg-red-500 text-white animate-pulse-glow scale-110'
              : 'button-primary hover:scale-110'
          }`}
          disabled={!onVoiceMessage}
        >
          {isRecording ? <Square size={32} /> : <Mic size={32} />}
        </button>
        
        {/* Audio Visualization */}
        {isRecording && (
          <div className="flex flex-col items-center space-y-2">
            <div className="flex items-center space-x-1">
              {[...Array(10)].map((_, i) => (
                <div
                  key={i}
                  className="w-1 bg-blue-400 rounded-full transition-all duration-100"
                  style={{
                    height: `${Math.max(4, (audioLevel * (i + 1)) / 10)}px`,
                    opacity: audioLevel > (i * 10) ? 1 : 0.3
                  }}
                />
              ))}
            </div>
            <div className="text-sm text-gray-300 font-mono">
              {formatTime(recordingTime)}
            </div>
          </div>
        )}
      </div>
      
      <div className="text-center mt-4">
        <p className="text-sm font-medium text-gray-200">
          {isRecording ? 'Recording... Click to stop' : 'Click to start recording'}
        </p>
        {!onVoiceMessage && (
          <p className="text-xs text-red-400 mt-1">Voice handler not available</p>
        )}
        {isRecording && (
          <p className="text-xs text-gray-400 mt-1">
            Speak clearly into your microphone
          </p>
        )}
      </div>
    </div>
  );
}