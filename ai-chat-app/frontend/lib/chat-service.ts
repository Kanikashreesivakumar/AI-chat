export type ChatMessage = {
  id: string
  content: string
  role: "user" | "assistant"
  timestamp: Date
  isStreaming?: boolean
}

export const chatService = {
  async sendMessage(content: string, options?: { useRAG?: boolean }) {
    const response = await fetch("http://127.0.0.1:8000/chat/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        user_input: content,
        use_rag: options?.useRAG ?? true,
      }),
    })

   
    if (response.body && typeof response.body.getReader === "function") {
      // Streaming response (if implemented in backend)
      return response.body
    } else {
      // Standard JSON response
      const data = await response.json()
      // Simulate a stream for compatibility with your UI
      return {
        getReader: () => ({
          async read() {
            return { done: true, value: new TextEncoder().encode(`0:${data.response}\n`) }
          },
        }),
      }
    }
  },
}
