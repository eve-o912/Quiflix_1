"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Upload, X, Film } from "lucide-react"

interface UploadModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function UploadModal({ isOpen, onClose }: UploadModalProps) {
  const [dragActive, setDragActive] = useState(false)

  if (!isOpen) return null

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    // Handle file drop logic here
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl bg-gray-900 border-gray-700">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-white flex items-center">
            <Film className="h-5 w-5 mr-2 text-purple-400" />
            Upload Your Film
          </CardTitle>
          <Button variant="ghost" size="icon" onClick={onClose} className="text-gray-400 hover:text-white">
            <X className="h-5 w-5" />
          </Button>
        </CardHeader>
        <CardContent className="space-y-6">
          <div
            className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
              dragActive ? "border-purple-400 bg-purple-400/10" : "border-gray-600 hover:border-gray-500"
            }`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-white mb-2">Drag and drop your film file here</p>
            <p className="text-gray-400 text-sm mb-4">or</p>
            <Button className="bg-purple-500 hover:bg-purple-600">Choose File</Button>
            <p className="text-gray-500 text-xs mt-2">Supported formats: MP4, MOV, AVI (Max 5GB)</p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="title" className="text-white">
                Film Title
              </Label>
              <Input id="title" placeholder="Enter film title" className="bg-gray-800 border-gray-600 text-white" />
            </div>
            <div>
              <Label htmlFor="genre" className="text-white">
                Genre
              </Label>
              <Input id="genre" placeholder="e.g., Drama, Action" className="bg-gray-800 border-gray-600 text-white" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="price" className="text-white">
                Price ($)
              </Label>
              <Input
                id="price"
                type="number"
                step="0.01"
                placeholder="2.99"
                className="bg-gray-800 border-gray-600 text-white"
              />
            </div>
            <div>
              <Label htmlFor="duration" className="text-white">
                Duration
              </Label>
              <Input id="duration" placeholder="e.g., 1h 45m" className="bg-gray-800 border-gray-600 text-white" />
            </div>
          </div>

          <div>
            <Label htmlFor="description" className="text-white">
              Description
            </Label>
            <Textarea
              id="description"
              placeholder="Tell viewers about your film..."
              className="bg-gray-800 border-gray-600 text-white min-h-[100px]"
            />
          </div>

          <div className="flex justify-end space-x-4">
            <Button
              variant="outline"
              onClick={onClose}
              className="border-gray-600 text-gray-300 hover:bg-gray-800 bg-transparent"
            >
              Cancel
            </Button>
            <Button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600">
              Upload Film
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
