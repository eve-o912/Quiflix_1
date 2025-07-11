"use client"

import { useEffect, useRef } from "react"

export default function Component() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let animationFrameId: number
    let time = 0

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    const drawHalftoneWave = () => {
      const gridSize = 20
      const rows = Math.ceil(canvas.height / gridSize)
      const cols = Math.ceil(canvas.width / gridSize)

      for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
          const centerX = x * gridSize
          const centerY = y * gridSize
          const distanceFromCenter = Math.sqrt(
            Math.pow(centerX - canvas.width / 2, 2) + Math.pow(centerY - canvas.height / 2, 2),
          )
          const maxDistance = Math.sqrt(Math.pow(canvas.width / 2, 2) + Math.pow(canvas.height / 2, 2))
          const normalizedDistance = distanceFromCenter / maxDistance

          const waveOffset = Math.sin(normalizedDistance * 10 - time) * 0.5 + 0.5
          const size = gridSize * waveOffset * 0.8

          // Create dynamic colors based on position and time
          const hue = (normalizedDistance * 360 + time * 50) % 360
          const saturation = 70 + Math.sin(time * 0.5) * 30
          const lightness = 50 + waveOffset * 30

          ctx.beginPath()
          ctx.arc(centerX, centerY, size / 2, 0, Math.PI * 2)
          ctx.fillStyle = `hsla(${hue}, ${saturation}%, ${lightness}%, ${waveOffset * 0.7})`
          ctx.fill()
        }
      }
    }

    const moviePosters = [
      { x: -200, y: 100, speed: 0.8, image: "/placeholder.svg?height=300&width=200" },
      { x: -200, y: 300, speed: 0.6, image: "/placeholder.svg?height=300&width=200" },
      { x: -200, y: 150, speed: 1.0, image: "/placeholder.svg?height=300&width=200" },
    ]

    const createVideoElements = () => {
      const videoContainer = document.getElementById("video-container")
      if (videoContainer) return // Already created

      const container = document.createElement("div")
      container.id = "video-container"
      container.style.position = "absolute"
      container.style.top = "0"
      container.style.left = "0"
      container.style.width = "100%"
      container.style.height = "100%"
      container.style.pointerEvents = "none"
      container.style.zIndex = "5"

      moviePosters.forEach((poster, index) => {
        const videoWrapper = document.createElement("div")
        videoWrapper.className = `video-poster-${index}`
        videoWrapper.style.position = "absolute"
        videoWrapper.style.width = "200px"
        videoWrapper.style.height = "300px"
        videoWrapper.style.borderRadius = "8px"
        videoWrapper.style.overflow = "hidden"
        videoWrapper.style.boxShadow = "0 8px 32px rgba(0,0,0,0.5)"
        videoWrapper.style.border = "2px solid rgba(147, 51, 234, 0.5)"

        const video = document.createElement("video")
        video.src = `https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4`
        video.autoplay = true
        video.muted = true
        video.loop = true
        video.style.width = "100%"
        video.style.height = "100%"
        video.style.objectFit = "cover"

        const overlay = document.createElement("div")
        overlay.style.position = "absolute"
        overlay.style.bottom = "0"
        overlay.style.left = "0"
        overlay.style.right = "0"
        overlay.style.background = "linear-gradient(transparent, rgba(0,0,0,0.8))"
        overlay.style.color = "white"
        overlay.style.padding = "10px"
        overlay.style.fontSize = "14px"
        overlay.innerHTML = `
          <div style="font-weight: bold;">Film ${index + 1}</div>
          <div style="font-size: 12px; opacity: 0.8;">Action • 2024</div>
          <div style="font-size: 12px; color: #10b981;">$2.99</div>
        `

        videoWrapper.appendChild(video)
        videoWrapper.appendChild(overlay)
        container.appendChild(videoWrapper)
      })

      canvas.parentElement?.appendChild(container)
    }

    const updateVideoPositions = () => {
      moviePosters.forEach((poster, index) => {
        const videoElement = document.querySelector(`.video-poster-${index}`)
        if (videoElement) {
          const floatY = poster.y + Math.sin(time + index) * 10
          videoElement.style.left = `${poster.x}px`
          videoElement.style.top = `${floatY}px`
        }
      })
    }

    const animate = () => {
      ctx.fillStyle = "rgba(0, 0, 0, 0.1)"
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      drawHalftoneWave()

      // Update poster positions
      moviePosters.forEach((poster, index) => {
        poster.x += poster.speed
        if (poster.x > canvas.width + 200) {
          poster.x = -200
          // Keep film 3 (index 2) in the upper area
          if (index === 2) {
            poster.y = Math.random() * 200 + 50 // Between 50-250px from top
          } else {
            poster.y = Math.random() * (canvas.height - 300)
          }
        }
      })

      updateVideoPositions()

      time += 0.05
      animationFrameId = requestAnimationFrame(animate)
    }

    resizeCanvas()
    createVideoElements()
    window.addEventListener("resize", resizeCanvas)

    animate()

    return () => {
      cancelAnimationFrame(animationFrameId)
      window.removeEventListener("resize", resizeCanvas)

      const videoContainer = document.getElementById("video-container")
      if (videoContainer) {
        videoContainer.remove()
      }
    }
  }, [])

  return <canvas ref={canvasRef} className="w-full h-screen bg-black" />
}
