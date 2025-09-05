"use client"

import { useState, useEffect, useRef } from "react"
import { ChatHeader } from "@/components/chat-header"
import { ChatMessages } from "@/components/chat-messages"
import { ChatInput } from "@/components/chat-input"
import { QuickSuggestions } from "@/components/quick-suggestions"
import { DocumentUpload } from "@/components/document-upload"
import { Button } from "@/components/ui/button"
import { Settings, Database } from "lucide-react"
import { chatService, type ChatMessage } from "@/lib/chat-service"

export default function ChatPage() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "1",
      content:
        "Hello! I'm your AI assistant with RAG capabilities. Upload documents to enhance my knowledge, or ask me anything!",
      role: "assistant",
      timestamp: new Date(),
    },
  ])
  const [isTyping, setIsTyping] = useState(false)
  const [streamingMessageId, setStreamingMessageId] = useState<string | null>(null)
  const [showDocuments, setShowDocuments] = useState(false)
  const [useRAG, setUseRAG] = useState(true)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages, isTyping])

  const handleSendMessage = async (content: string) => {
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      content,
      role: "user",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setIsTyping(true)

    try {
      const stream = await chatService.sendMessage(content, { useRAG })

      setIsTyping(false)
      const assistantMessageId = (Date.now() + 1).toString()
      setStreamingMessageId(assistantMessageId)

      const assistantMessage: ChatMessage = {
        id: assistantMessageId,
        content: "",
        role: "assistant",
        timestamp: new Date(),
        isStreaming: true,
      }

      setMessages((prev) => [...prev, assistantMessage])

      
      const reader = stream.getReader()
      const decoder = new TextDecoder()

      try {
        while (true) {
          const { done, value } = await reader.read()
          if (done) break

          const chunk = decoder.decode(value)
          const lines = chunk.split("\n")

          for (const line of lines) {
            if (line.startsWith("0:")) {
              const content = line.slice(2)
              setMessages((prev) =>
                prev.map((msg) => (msg.id === assistantMessageId ? { ...msg, content: msg.content + content } : msg)),
              )
            }
          }
        }
      } finally {
        setMessages((prev) => prev.map((msg) => (msg.id === assistantMessageId ? { ...msg, isStreaming: false } : msg)))
        setStreamingMessageId(null)
      }
    } catch (error) {
      console.error("[v0] Chat error:", error)
      setIsTyping(false)
      setStreamingMessageId(null)
    }
  }

  const handleSuggestionClick = (suggestion: string) => {
    handleSendMessage(suggestion)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black dark">
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-gray-500/5 to-white/5 animate-pulse" />
      <div
        className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.05),transparent_50%)] animate-pulse"
        style={{ animationDelay: "1s" }}
      />

      <div className="relative z-10 flex h-screen max-w-6xl mx-auto">
       
        <div className="flex-1 flex flex-col">
          <ChatHeader />

          <div className="flex-1 flex flex-col overflow-hidden">
            <div className="flex items-center justify-between p-4 border-b border-white/10">
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setUseRAG(!useRAG)}
                  className={`backdrop-blur-xl border-white/20 text-xs ${
                    useRAG ? "bg-white/20 text-white border-white/30" : "bg-white/5 text-gray-400"
                  }`}
                >
                  <Database className="w-3 h-3 mr-1" />
                  RAG {useRAG ? "ON" : "OFF"}
                </Button>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowDocuments(!showDocuments)}
                className="backdrop-blur-xl bg-white/5 border-white/20 text-gray-300 hover:bg-white/10"
              >
                <Settings className="w-3 h-3 mr-1" />
                Documents
              </Button>
            </div>

            <ChatMessages messages={messages} isTyping={isTyping} streamingMessageId={streamingMessageId} />

            {messages.length === 1 && <QuickSuggestions onSuggestionClick={handleSendMessage} />}

            <ChatInput onSendMessage={handleSendMessage} />
            <div ref={messagesEndRef} />
          </div>
        </div>

        {showDocuments && (
          <div className="w-80 border-l border-white/10 p-4 overflow-y-auto">
            <DocumentUpload />
          </div>
        )}
      </div>
    </div>
  )
}
