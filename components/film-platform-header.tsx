"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Upload, User } from "lucide-react"

export default function FilmPlatformHeader() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b border-white/10">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <img src="/images/quiflix-logo.png" alt="Quiflix Logo" className="h-10 w-auto" />
        </div>

        <div className="flex-1 max-w-md mx-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search films..."
              className="pl-10 bg-white/10 border-white/20 text-white placeholder-gray-400"
            />
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <Button
            variant="outline"
            className="border-purple-400 text-purple-400 hover:bg-purple-400 hover:text-black bg-transparent"
          >
            <Upload className="h-4 w-4 mr-2" />
            Upload Film
          </Button>
          <Button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600">
            Subscribe $9.99/mo
          </Button>
          <Button variant="ghost" size="icon" className="text-white hover:bg-white/10">
            <User className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </header>
  )
}
