"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Send, Mic, MicOff, Square } from "lucide-react"
import { cn } from "@/lib/utils"

interface ChatInputProps {
  onSendMessage: (message: string) => void
}

export function ChatInput({ onSendMessage }: ChatInputProps) {
  const [message, setMessage] = useState("")
  const [isRecording, setIsRecording] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const [recordingTime, setRecordingTime] = useState(0)
  const mediaRecorderRef = useRef<MediaRecorder | null>(null)
  const audioChunksRef = useRef<Blob[]>([])
  const timerRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current)
      }
    }
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (message.trim()) {
      onSendMessage(message.trim())
      setMessage("")
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSubmit(e)
    }
  }

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      const mediaRecorder = new MediaRecorder(stream)
      mediaRecorderRef.current = mediaRecorder
      audioChunksRef.current = []

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data)
        }
      }

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: "audio/wav" })
        processAudioToText(audioBlob)
        stream.getTracks().forEach((track) => track.stop())
      }

      mediaRecorder.start()
      setIsRecording(true)
      setRecordingTime(0)

      timerRef.current = setInterval(() => {
        setRecordingTime((prev) => prev + 1)
      }, 1000)

      console.log("[v0] Voice recording started")
    } catch (error) {
      console.error("[v0] Error accessing microphone:", error)
      alert("Unable to access microphone. Please check your permissions.")
    }
  }

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop()
      setIsRecording(false)
      setIsProcessing(true)

      if (timerRef.current) {
        clearInterval(timerRef.current)
        timerRef.current = null
      }

      console.log("[v0] Voice recording stopped")
    }
  }

  const processAudioToText = async (audioBlob: Blob) => {
    console.log("[v0] Processing audio to text...", audioBlob.size, "bytes")

    setTimeout(() => {
      const simulatedText =
        "This is a simulated transcription of your voice message. In a real implementation, this would use a speech-to-text service."
      setMessage(simulatedText)
      setIsProcessing(false)
      setRecordingTime(0)
      console.log("[v0] Audio processed to text:", simulatedText)
    }, 2000)
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  return (
    <div className="p-4 backdrop-blur-xl bg-white/5 border-t border-white/10">
      <form onSubmit={handleSubmit} className="max-w-3xl mx-auto">
        {(isRecording || isProcessing) && (
          <div className="mb-3 flex items-center justify-center gap-2 text-sm">
            {isRecording && (
              <>
                <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                <span className="text-white">Recordings\: {formatTime(recordingTime)}</span>
              </>
            )}
            {isProcessing && (
              <>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse" />
                <span className="text-gray-400">Processing audio...</span>
              </>
            )}
          </div>
        )}

        <div className="flex gap-2 items-end">
          <div className="flex-1 relative">
            <Textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={
                isProcessing
                  ? "Processing your voice message..."
                  : "Type your message here... (Press Enter to send, Shift+Enter for new line)"
              }
              className="min-h-[60px] max-h-32 backdrop-blur-xl bg-white/10 border-white/20 text-white placeholder:text-gray-400 resize-none pr-12"
              rows={1}
              disabled={isProcessing}
            />
            <Button
              type="button"
              size="sm"
              variant="ghost"
              className={cn(
                "absolute right-2 bottom-2 w-8 h-8 p-0 transition-all duration-200",
                isRecording
                  ? "text-white hover:text-gray-300 bg-white/20 hover:bg-white/30"
                  : isProcessing
                    ? "text-gray-400 hover:text-gray-300 bg-gray-500/20"
                    : "text-gray-400 hover:text-white hover:bg-white/10",
              )}
              onClick={isRecording ? stopRecording : startRecording}
              disabled={isProcessing}
            >
              {isRecording ? (
                <Square className="w-4 h-4" />
              ) : isProcessing ? (
                <MicOff className="w-4 h-4 animate-pulse" />
              ) : (
                <Mic className="w-4 h-4" />
              )}
            </Button>
          </div>

          <Button
            type="submit"
            disabled={!message.trim() || isProcessing}
            className="bg-gradient-to-r from-gray-600 to-black hover:from-gray-700 hover:to-gray-900 text-white border-0 h-[60px] px-6 disabled:opacity-50"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </form>
    </div>
  )
}
