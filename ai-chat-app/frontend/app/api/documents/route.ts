import { type NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData()
    const file = formData.get("file") as File

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 })
    }

    // Validate file type
    const allowedTypes = ["text/plain", "application/pdf", "text/markdown"]
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        { error: "Unsupported file type. Please upload .txt, .pdf, or .md files." },
        { status: 400 },
      )
    }

    // Process document (simulated)
    const processedDoc = await processDocument(file)

    return NextResponse.json({
      success: true,
      document: processedDoc,
      message: "Document processed and added to knowledge base",
    })
  } catch (error) {
    console.error("[v0] Document upload error:", error)
    return NextResponse.json({ error: "Failed to process document" }, { status: 500 })
  }
}

export async function GET() {
  try {
    const documents = await getDocuments()
    return NextResponse.json({ documents })
  } catch (error) {
    console.error("[v0] Get documents error:", error)
    return NextResponse.json({ error: "Failed to retrieve documents" }, { status: 500 })
  }
}

async function processDocument(file: File) {
  console.log("[v0] Processing document:", file.name)

  const content = await file.text()

  // Simulate document processing:
  // 1. Extract text content
  // 2. Split into chunks
  // 3. Generate embeddings
  // 4. Store in vector database

  const chunks = content.split(/\n\s*\n/).filter((chunk) => chunk.trim().length > 0)

  return {
    id: Date.now().toString(),
    name: file.name,
    type: file.type,
    size: file.size,
    chunks: chunks.length,
    processed_at: new Date().toISOString(),
    status: "processed",
  }
}

async function getDocuments() {
  // Simulate retrieving documents from database
  return [
    {
      id: "1",
      name: "sample-document.txt",
      type: "text/plain",
      size: 1024,
      chunks: 5,
      processed_at: new Date().toISOString(),
      status: "processed",
    },
  ]
}
