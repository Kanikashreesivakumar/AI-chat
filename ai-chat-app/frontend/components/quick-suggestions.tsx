"use client"

import { Button } from "@/components/ui/button"

interface QuickSuggestionsProps {
  onSuggestionClick: (suggestion: string) => void
}

const suggestions = [
  "What can you help me with?",
  "Explain quantum computing",

  "Help me brainstorm ideas",
]

export function QuickSuggestions({ onSuggestionClick }: QuickSuggestionsProps) {
  return (
    <div className="p-4 max-w-3xl mx-auto opacity-0 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <p className="text-sm text-gray-400 mb-3 text-center">Quick suggestions to get started:</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
        {suggestions.map((suggestion, index) => (
          <Button
            key={index}
            variant="outline"
            className="backdrop-blur-xl bg-white/5 border-white/20 text-gray-300 hover:bg-white/10 hover:text-white transition-all duration-300 hover:scale-105 text-left justify-start h-auto p-3 opacity-0 animate-in slide-in-from-bottom-2 fade-in"
            style={{
              animationDelay: `${index * 100 + 200}ms`,
              animationDuration: "500ms",
              animationFillMode: "forwards",
            }}
            onClick={() => onSuggestionClick(suggestion)}
          >
            {suggestion}
          </Button>
        ))}
      </div>
    </div>
  )
}
