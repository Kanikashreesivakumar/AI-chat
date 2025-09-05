import { type NextRequest, NextResponse } from "next/server"
import { streamText } from "ai"
import { openai } from "@ai-sdk/openai"

export async function POST(req: NextRequest) {
  try {
    const { messages, useRAG = false } = await req.json()

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json({ error: "Invalid messages format" }, { status: 400 })
    }

    const lastMessage = messages[messages.length - 1]

    let systemPrompt = "You are a helpful AI assistant."
    const enhancedPrompt = lastMessage.content

    // RAG Enhancement (simulated)
    if (useRAG) {
      const ragContext = await performRAGSearch(lastMessage.content)
      systemPrompt = `You are a helpful AI assistant with access to relevant context. Use the following context to inform your response, but don't mention that you're using provided context unless directly relevant.

Context:
${ragContext}

Instructions: Provide accurate, helpful responses based on the context when relevant. If the context doesn't contain relevant information, respond normally based on your training.`
    }

    // Use AI SDK for streaming response
    const result = await streamText({
      model: openai("gpt-4o-mini"),
      system: systemPrompt,
      messages: messages.map((msg: any) => ({
        role: msg.role,
        content: msg.content,
      })),
    })

    return Response.json({
      success: true,
      response: result.output ?? result.text ?? result.message ?? "No response",
    })
  } catch (error) {
    console.error("[v0] Chat API error:", error)
    return NextResponse.json({ error: "Failed to process chat request" }, { status: 500 })
  }
}

async function performRAGSearch(query: string): Promise<string> {
  // Simulate vector search and document retrieval
  console.log("[v0] Performing RAG search for:", query)

  // In a real implementation, this would:
  // 1. Convert query to embeddings
  // 2. Search vector database
  // 3. Retrieve relevant documents
  // 4. Return formatted context

  const mockDocuments = [
    {
      content:
        "RAG (Retrieval-Augmented Generation) is a technique that combines information retrieval with text generation to provide more accurate and contextual responses.",
      source: "AI Documentation",
      relevance: 0.95,
    },
    {
      content:
        "Vector databases store high-dimensional vectors that represent semantic meaning of text, enabling similarity search for relevant information.",
      source: "Technical Guide",
      relevance: 0.87,
    },
    {
      content:
        "Modern AI systems can be enhanced with external knowledge bases to provide more accurate and up-to-date information beyond their training data.",
      source: "Research Paper",
      relevance: 0.82,
    },
  ]

  // Simulate processing delay
  await new Promise((resolve) => setTimeout(resolve, 100))

  return mockDocuments
    .filter((doc) => doc.relevance > 0.8)
    .map((doc) => `${doc.content} (Source: ${doc.source})`)
    .join("\n\n")
}
