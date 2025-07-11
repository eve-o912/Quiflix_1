"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Bot, X, Send, Sparkles } from "lucide-react"

interface AIAssistantProps {
  isOpen: boolean
  onClose: () => void
}

const moodSuggestions = [
  "I want something romantic and heartwarming",
  "Show me thrilling action movies",
  "I'm in the mood for something scary",
  "I want to laugh tonight",
  "Something deep and thought-provoking",
  "I need an inspiring story",
  "Show me sci-fi adventures",
  "I want to learn something new",
]

const aiResponses = {
  romantic: {
    message:
      "Perfect! For a romantic evening, I recommend 'Love in Tokyo' - a beautiful cross-cultural love story that will warm your heart. It's got stunning visuals and a touching narrative about finding love across boundaries.",
    films: ["Love in Tokyo"],
  },
  action: {
    message:
      "Ready for some adrenaline? 'The Last Heist' and 'Cyber Hunt' are perfect for you! Both feature intense action sequences with emotional depth. 'The Last Heist' has that father-daughter bond, while 'Cyber Hunt' brings cutting-edge tech thrills.",
    films: ["The Last Heist", "Cyber Hunt"],
  },
  scary: {
    message:
      "Time to get spooked! 'Urban Legends' is exactly what you need - it's a chilling horror that investigates local folklore with terrifying consequences. Perfect for a scary movie night!",
    films: ["Urban Legends"],
  },
  funny: {
    message:
      "Let's brighten your mood! 'Midnight Café' is a delightful comedy about quirky late-night encounters at a 24-hour café. It's funny, heartwarming, and full of unexpected moments that'll make you smile.",
    films: ["Midnight Café"],
  },
  deep: {
    message:
      "For something profound, I suggest 'Desert Storm' and 'The Artist's Journey'. Both explore deep human experiences - one about war photography and witnessing history, the other about artistic struggle and triumph.",
    films: ["Desert Storm", "The Artist's Journey"],
  },
  inspiring: {
    message:
      "Need some motivation? 'Ocean's Echo' and 'The Artist's Journey' will inspire you! One showcases the beauty of our oceans and environmental protection, while the other follows an artist's journey to greatness.",
    films: ["Ocean's Echo", "The Artist's Journey"],
  },
  scifi: {
    message:
      "Blast off into the future! 'Neon Dreams', 'Quantum Paradox', and 'Space Odyssey 2024' will take you on incredible sci-fi journeys. From dream harvesting to quantum physics to Mars exploration!",
    films: ["Neon Dreams", "Quantum Paradox", "Space Odyssey 2024"],
  },
  educational: {
    message:
      "Ready to learn? 'Ocean's Echo' is an incredible documentary about deep-sea life and ocean conservation. It's both educational and visually stunning - you'll learn while being amazed!",
    films: ["Ocean's Echo"],
  },
}

export default function AIAssistant({ isOpen, onClose }: AIAssistantProps) {
  const [messages, setMessages] = useState<Array<{ type: "user" | "ai"; content: string; films?: string[] }>>([
    {
      type: "ai",
      content:
        "Hi! I'm your Quifix AI assistant! 🎬 Tell me how you're feeling or what kind of movie experience you want, and I'll recommend the perfect films for you. Try asking about genres, moods, or just describe what you're in the mood for!",
    },
  ])
  const [inputValue, setInputValue] = useState("")

  if (!isOpen) return null

  const handleSend = () => {
    if (!inputValue.trim()) return

    const userMessage = inputValue.trim()
    setMessages((prev) => [...prev, { type: "user", content: userMessage }])

    // Simple AI response logic based on keywords
    setTimeout(() => {
      let response = aiResponses.deep // default

      if (
        userMessage.toLowerCase().includes("romantic") ||
        userMessage.toLowerCase().includes("love") ||
        userMessage.toLowerCase().includes("heartwarming")
      ) {
        response = aiResponses.romantic
      } else if (
        userMessage.toLowerCase().includes("action") ||
        userMessage.toLowerCase().includes("exciting") ||
        userMessage.toLowerCase().includes("thrilling")
      ) {
        response = aiResponses.action
      } else if (
        userMessage.toLowerCase().includes("scary") ||
        userMessage.toLowerCase().includes("horror") ||
        userMessage.toLowerCase().includes("frightening")
      ) {
        response = aiResponses.scary
      } else if (
        userMessage.toLowerCase().includes("funny") ||
        userMessage.toLowerCase().includes("comedy") ||
        userMessage.toLowerCase().includes("laugh")
      ) {
        response = aiResponses.funny
      } else if (
        userMessage.toLowerCase().includes("inspiring") ||
        userMessage.toLowerCase().includes("motivational") ||
        userMessage.toLowerCase().includes("uplifting")
      ) {
        response = aiResponses.inspiring
      } else if (
        userMessage.toLowerCase().includes("sci-fi") ||
        userMessage.toLowerCase().includes("science fiction") ||
        userMessage.toLowerCase().includes("futuristic")
      ) {
        response = aiResponses.scifi
      } else if (
        userMessage.toLowerCase().includes("educational") ||
        userMessage.toLowerCase().includes("documentary") ||
        userMessage.toLowerCase().includes("learn")
      ) {
        response = aiResponses.educational
      }

      setMessages((prev) => [
        ...prev,
        {
          type: "ai",
          content: response.message,
          films: response.films,
        },
      ])
    }, 1000)

    setInputValue("")
  }

  const handleSuggestionClick = (suggestion: string) => {
    setInputValue(suggestion)
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl h-[600px] bg-gray-900 border-gray-700 flex flex-col">
        <CardHeader className="flex flex-row items-center justify-between pb-4">
          <CardTitle className="text-white flex items-center">
            <Bot className="h-5 w-5 mr-2 text-purple-400" />
            Quifix AI Assistant
            <Sparkles className="h-4 w-4 ml-2 text-yellow-400" />
          </CardTitle>
          <Button variant="ghost" size="icon" onClick={onClose} className="text-gray-400 hover:text-white">
            <X className="h-5 w-5" />
          </Button>
        </CardHeader>

        <CardContent className="flex-1 flex flex-col">
          {/* Messages */}
          <div className="flex-1 overflow-y-auto space-y-4 mb-4">
            {messages.map((message, index) => (
              <div key={index} className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-[80%] p-3 rounded-lg ${
                    message.type === "user"
                      ? "bg-purple-500 text-white"
                      : "bg-gray-800 text-gray-100 border border-gray-700"
                  }`}
                >
                  <p className="text-sm">{message.content}</p>
                  {message.films && (
                    <div className="mt-2 flex flex-wrap gap-1">
                      {message.films.map((film, filmIndex) => (
                        <Badge key={filmIndex} variant="secondary" className="bg-purple-500/20 text-purple-300 text-xs">
                          {film}
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Mood Suggestions */}
          {messages.length === 1 && (
            <div className="mb-4">
              <p className="text-gray-400 text-sm mb-2">Try these suggestions:</p>
              <div className="grid grid-cols-2 gap-2">
                {moodSuggestions.map((suggestion, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    size="sm"
                    onClick={() => handleSuggestionClick(suggestion)}
                    className="text-xs border-gray-600 text-gray-300 hover:bg-gray-800 bg-transparent justify-start h-auto py-2 px-3"
                  >
                    {suggestion}
                  </Button>
                ))}
              </div>
            </div>
          )}

          {/* Input */}
          <div className="flex gap-2">
            <Input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSend()}
              placeholder="Tell me what you're in the mood for..."
              className="bg-gray-800 border-gray-600 text-white placeholder-gray-400"
            />
            <Button
              onClick={handleSend}
              className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
