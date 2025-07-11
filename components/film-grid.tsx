"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Play, Heart, Star } from "lucide-react"

const films = [
  {
    id: 1,
    title: "Neon Dreams",
    genre: "Sci-Fi",
    year: 2024,
    price: 2.99,
    rating: 4.8,
    duration: "2h 15m",
    director: "Alex Chen",
    synopsis:
      "In a dystopian future where dreams are harvested for energy, a young hacker discovers the truth behind the neon-lit facade of New Tokyo. A mind-bending journey through virtual reality and human consciousness.",
    image: "/placeholder.svg?height=400&width=300",
  },
  {
    id: 2,
    title: "Urban Legends",
    genre: "Horror",
    year: 2024,
    price: 1.99,
    rating: 4.2,
    duration: "1h 45m",
    director: "Maria Santos",
    synopsis:
      "When college students investigate local urban legends for a documentary project, they uncover terrifying truths that some secrets should remain buried. A chilling tale of folklore come to life.",
    image: "/placeholder.svg?height=400&width=300",
  },
  {
    id: 3,
    title: "Love in Tokyo",
    genre: "Romance",
    year: 2024,
    price: 3.99,
    rating: 4.6,
    duration: "2h 5m",
    director: "Hiroshi Tanaka",
    synopsis:
      "An American architect and a Japanese tea ceremony master find love across cultural boundaries in modern Tokyo. A beautiful exploration of tradition, modernity, and the universal language of love.",
    image: "/placeholder.svg?height=400&width=300",
  },
  {
    id: 4,
    title: "The Last Heist",
    genre: "Action",
    year: 2024,
    price: 2.49,
    rating: 4.4,
    duration: "1h 55m",
    director: "Jake Morrison",
    synopsis:
      "A veteran thief plans one final score to secure his daughter's future, but when the job goes wrong, he must use all his skills to survive. High-octane action meets emotional depth.",
    image: "/placeholder.svg?height=400&width=300",
  },
  {
    id: 5,
    title: "Quantum Paradox",
    genre: "Thriller",
    year: 2024,
    price: 3.49,
    rating: 4.7,
    duration: "2h 20m",
    director: "Dr. Sarah Kim",
    synopsis:
      "A quantum physicist discovers her research is being used to manipulate reality itself. Racing against time, she must prevent a catastrophic paradox that could unravel existence.",
    image: "/placeholder.svg?height=400&width=300",
  },
  {
    id: 6,
    title: "Desert Storm",
    genre: "Drama",
    year: 2024,
    price: 2.99,
    rating: 4.3,
    duration: "2h 10m",
    director: "Ahmed Hassan",
    synopsis:
      "A war photographer returns to his homeland to document the aftermath of conflict, confronting his past and the cost of bearing witness to human suffering. A powerful meditation on war and peace.",
    image: "/placeholder.svg?height=400&width=300",
  },
]

export default function FilmGrid() {
  return (
    <div className="relative z-10 container mx-auto px-4 py-8 mt-20 bg-black">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-white mb-2">Featured Films</h2>
        <p className="text-gray-300">Discover amazing independent films from creators worldwide</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {films.map((film) => (
          <Card
            key={film.id}
            className="bg-black/40 backdrop-blur-sm border-white/10 hover:border-purple-400/50 transition-all duration-300 group"
          >
            <CardContent className="p-0">
              <div className="relative overflow-hidden rounded-t-lg">
                <img
                  src={film.image || "/placeholder.svg"}
                  alt={film.title}
                  className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <Button
                  size="icon"
                  className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-purple-500 hover:bg-purple-600"
                >
                  <Play className="h-5 w-5" />
                </Button>
                <Button size="icon" variant="ghost" className="absolute top-2 right-2 text-white hover:bg-white/20">
                  <Heart className="h-4 w-4" />
                </Button>

                {/* Genre badge on image */}
                <Badge
                  variant="secondary"
                  className="absolute bottom-2 left-2 bg-purple-500/90 text-white backdrop-blur-sm"
                >
                  {film.genre}
                </Badge>
              </div>

              <div className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center text-yellow-400">
                    <Star className="h-4 w-4 fill-current mr-1" />
                    <span className="text-sm font-medium">{film.rating}</span>
                  </div>
                  <span className="text-gray-400 text-sm">{film.year}</span>
                </div>

                <h3 className="text-white font-bold text-lg mb-1 line-clamp-1">{film.title}</h3>
                <p className="text-purple-300 text-sm mb-2">Directed by {film.director}</p>
                <p className="text-gray-400 text-sm mb-3">{film.duration}</p>

                {/* Synopsis */}
                <p className="text-gray-300 text-sm mb-4 line-clamp-3 leading-relaxed">{film.synopsis}</p>

                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-green-400">${film.price}</span>
                  <Button
                    size="sm"
                    className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 font-medium"
                  >
                    Buy Now
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
