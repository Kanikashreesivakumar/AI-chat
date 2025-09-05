export interface ChatMessage {
  id: string
  content: string
  role: "user" | "assistant"
  timestamp: Date
  isStreaming?: boolean
}

export interface ChatOptions {
  useRAG?: boolean
  temperature?: number
  maxTokens?: number
}

export class ChatService {
  private static instance: ChatService
  private messages: ChatMessage[] = []

  static getInstance(): ChatService {
    if (!ChatService.instance) {
      ChatService.instance = new ChatService()
    }
    return ChatService.instance
  }

  async sendMessage(content: string, options: ChatOptions = {}): Promise<ReadableStream> {
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      content,
      role: "user",
      timestamp: new Date(),
    }

    this.messages.push(userMessage)

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: this.messages.map((msg) => ({
            role: msg.role,
            content: msg.content,
          })),
          useRAG: options.useRAG || false,
          temperature: options.temperature || 0.7,
          maxTokens: options.maxTokens || 1000,
        }),
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      return response.body!
    } catch (error) {
      console.error("[v0] Chat service error:", error)
      throw error
    }
  }

  getMessages(): ChatMessage[] {
    return [...this.messages]
  }

  addMessage(message: ChatMessage): void {
    this.messages.push(message)
  }

  clearMessages(): void {
    this.messages = []
  }
}

export const chatService = ChatService.getInstance()
