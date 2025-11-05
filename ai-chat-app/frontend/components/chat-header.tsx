import { Wifi } from "lucide-react"
import Image from "next/image"

export function ChatHeader() {
  return (
    <header className="backdrop-blur-xl bg-white/5 border-b border-white/10 p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center p-1">
            <Image
              src="/placeholder-logo.svg"
              alt="Company Logo"
              width={32}
              height={32}
              className="w-full h-full object-contain"
            />
          </div>
          <div>
            <h1 className="text-xl font-semibold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              AI Chat Assistant!!
            </h1>
            <p className="text-sm text-gray-400">Powered by RAG Technology</p>
          </div>
        </div>

        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/60 border border-gray-600">
          <Wifi className="w-4 h-4 text-white" />
          <span className="text-sm text-white font-medium">Online..</span>
        </div>
      </div>
    </header>
  )
}
