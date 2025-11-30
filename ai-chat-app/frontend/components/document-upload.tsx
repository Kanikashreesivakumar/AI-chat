"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Upload, File, CheckCircle, AlertCircle } from "lucide-react"
import { cn } from "@/lib/utils"

interface Document {
  id: string
  name: string
  type: string
  size: number
  chunks: number
  processed_at: string
  status: string
}

export function DocumentUpload() {
  const [documents, setDocuments] = useState<Document[]>([])
  const [isUploading, setIsUploading] = useState(false)
  const [dragActive, setDragActive] = useState(false)

  const handleFileUpload = async (file: File) => {
    setIsUploading(true)

    try {
      const formData = new FormData()
      formData.append("file", file)

      const response = await fetch("/api/documents", {
        method: "POST",
        body: formData,
      })

      const result = await response.json()

      if (response.ok) {
        setDocuments((prev) => [...prev, result.document])
        console.log("Document uploaded successfully:", result.document.name)
      } else {
        console.error("Upload failed:", result.error)
        alert(result.error || "Failed to upload document")
      }
    } catch (error) {
      console.error("Upload error:", error)
      alert("")
    } finally {
      setIsUploading(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setDragActive(false)

    const files = Array.from(e.dataTransfer.files)
    if (files.length > 0) {
      handleFileUpload(files[0])
    }
  }

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files && files.length > 0) {
      handleFileUpload(files[0])
    }
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes"
    const k = 1024
    const sizes = ["Bytes", "KB", "MB", "GB"]
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
  }

  return (
    <Card className="backdrop-blur-xl bg-white/5 border-white/20">
      <CardHeader>
        <CardTitle className="text-white">Knowledge Bases</CardTitle>
        <p className="text-sm text-gray-400">Upload documents to enhance the AI responses with your content</p>
      </CardHeader>
      <CardContent className="space-y-4">
        <div
          className={cn(
            "border-2 border-dashed rounded-lg p-6 text-center transition-colors",
            dragActive ? "border-white bg-white/10" : "border-white/20",
            isUploading ? "opacity-50 pointer-events-none" : "cursor-pointer hover:border-white/40",
          )}
          onDrop={handleDrop}
          onDragOver={(e) => e.preventDefault()}
          onDragEnter={() => setDragActive(true)}
          onDragLeave={() => setDragActive(false)}
          onClick={() => document.getElementById("file-input")?.click()}
        >
          <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
          <p className="text-sm text-gray-300 mb-1">
            {isUploading ? "Processing..." : "Drop files here or click to upload"}
          </p>
          <p className="text-xs text-gray-500">Supports .txt, .pdf, .md files</p>
          <input id="file-input" type="file" accept=".txt,.pdf,.md" onChange={handleFileSelect} className="hidden" />
        </div>

        {documents.length > 0 && (
          <div className="space-y-2">
            <h4 className="text-sm font-medium text-white">Uploaded documents</h4>
            {documents.map((doc) => (
              <div key={doc.id} className="flex items-center gap-3 p-3 rounded-lg bg-white/5 border border-white/10">
                <File className="w-4 h-4 text-white" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-white truncate">{doc.name}</p>
                  <p className="text-xs text-gray-400">
                    {formatFileSize(doc.size)} • {doc.chunks} chunks
                  </p>
                </div>
                {doc.status === "processed" ? (
                  <CheckCircle className="w-4 h-4 text-white" />
                ) : (
                  <AlertCircle className="w-4 h-4 text-gray-400" />
                )}
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
