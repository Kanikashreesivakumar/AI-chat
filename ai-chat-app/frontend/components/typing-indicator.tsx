import { Bot } from "lucide-react"

export function TypingIndicator() {
  return (
    <div className="flex gap-3 max-w-[80%] mr-auto opacity-0 animate-in slide-in-from-bottom-4 fade-in duration-300">
      <div className="w-8 h-8 rounded-full bg-gradient-to-r from-white to-gray-400 flex items-center justify-center flex-shrink-0">
        <Bot className="w-4 h-4 text-black" />
      </div>

      <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl p-4 shadow-lg">
        <div className="flex items-center gap-1">
          <div className="flex gap-1">
            <div
              className="w-2 h-2 bg-white rounded-full animate-bounce"
              style={{ animationDelay: "0ms", animationDuration: "1s" }}
            />
            <div
              className="w-2 h-2 bg-gray-300 rounded-full animate-bounce"
              style={{ animationDelay: "200ms", animationDuration: "1s" }}
            />
            <div
              className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
              style={{ animationDelay: "400ms", animationDuration: "1s" }}
            />
          </div>
          <span className="text-xs text-gray-400 ml-2 animate-pulse">bot is thinking..</span>
        </div>
      </div>
    </div>
  )
}
