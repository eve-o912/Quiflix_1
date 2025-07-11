"use client"

import { useState } from "react"
import HalftoneWaves from "@/components/halftone-waves"
import FilmPlatformHeader from "@/components/film-platform-header"
import FilmGrid from "@/components/film-grid"
import FilmLibrary from "@/components/film-library"
import UploadModal from "@/components/upload-modal"
import AIAssistant from "@/components/ai-assistant"

export default function Home() {
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false)
  const [isAIAssistantOpen, setIsAIAssistantOpen] = useState(false)

  return (
    <main className="relative min-h-screen overflow-hidden">
      <HalftoneWaves />
      <FilmPlatformHeader />
      <FilmGrid />
      <FilmLibrary onOpenAI={() => setIsAIAssistantOpen(true)} />
      <UploadModal isOpen={isUploadModalOpen} onClose={() => setIsUploadModalOpen(false)} />
      <AIAssistant isOpen={isAIAssistantOpen} onClose={() => setIsAIAssistantOpen(false)} />
    </main>
  )
}
