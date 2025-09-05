import { Bot, User } from "lucide-react"
import { cn } from "@/lib/utils"

interface Message {
  id: string
  content: string
  role: "user" | "assistant"
  timestamp: Date
  isStreaming?: boolean
}

interface MessageBubbleProps {
  message: Message
  isStreaming?: boolean
  animationDelay?: number
}

function formatTime(date: Date) {
  const hours = date.getHours() % 12 || 12
  const minutes = date.getMinutes().toString().padStart(2, "0")
  const ampm = date.getHours() < 12 ? "AM" : "PM"
  return `${hours}:${minutes} ${ampm}`
}

export function MessageBubble({ message, isStreaming, animationDelay = 0 }: MessageBubbleProps) {
  const isUser = message.role === "user"

  return (
    <div
      className={cn(
        "flex gap-3 max-w-[80%] opacity-0 animate-in slide-in-from-bottom-4 fade-in duration-500",
        isUser ? "ml-auto flex-row-reverse" : "mr-auto",
      )}
      style={{ animationDelay: `${animationDelay}ms` }}
    >
      <div
        className={cn(
          "w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-300",
          isUser ? "bg-gradient-to-r from-gray-600 to-gray-800" : "bg-gradient-to-r from-white to-gray-400",
        )}
      >
        {isUser ? <User className="w-4 h-4 text-white" /> : <Bot className="w-4 h-4 text-black" />}
      </div>

      <div
        className={cn(
          "backdrop-blur-xl border rounded-2xl p-4 shadow-lg transition-all duration-300 hover:shadow-xl",
          isUser
            ? "bg-gradient-to-r from-gray-600/20 to-gray-800/20 border-gray-500/30 text-white hover:from-gray-600/30 hover:to-gray-800/30"
            : "bg-black/40 border-gray-600/50 text-white hover:bg-black/50",
        )}
      >
        <p className="text-sm leading-relaxed">
          {message.content}
          {isStreaming && <span className="inline-block w-2 h-4 bg-white ml-1 animate-pulse" />}
        </p>
        <p className="text-xs text-gray-300 mt-2 transition-opacity duration-300">
          {formatTime(message.timestamp)}
        </p>
      </div>
    </div>
  )
}
