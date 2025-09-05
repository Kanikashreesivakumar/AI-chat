import { ScrollArea } from "@/components/ui/scroll-area"
import { MessageBubble } from "@/components/message-bubble"
import { TypingIndicator } from "@/components/typing-indicator"

interface Message {
  id: string
  content: string
  role: "user" | "assistant"
  timestamp: Date
  isStreaming?: boolean
}

interface ChatMessagesProps {
  messages: Message[]
  isTyping: boolean
  streamingMessageId?: string | null
}

export function ChatMessages({ messages, isTyping, streamingMessageId }: ChatMessagesProps) {
  return (
    <ScrollArea className="flex-1 p-4">
      <div className="space-y-4 max-w-3xl mx-auto">
        {messages.map((message, index) => (
          <MessageBubble
            key={message.id}
            message={message}
            isStreaming={message.isStreaming}
            animationDelay={index * 100}
          />
        ))}
        {isTyping && <TypingIndicator />}
      </div>
    </ScrollArea>
  )
}
