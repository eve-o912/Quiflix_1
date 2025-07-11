"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Play, Heart, Star, Search, Filter, Bot } from "lucide-react"

const allFilms = [
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
      "In a dystopian future where dreams are harvested for energy, a young hacker discovers the truth behind the neon-lit facade of New Tokyo.",
    mood: ["futuristic", "dark", "thought-provoking"],
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
      "When college students investigate local urban legends for a documentary project, they uncover terrifying truths that some secrets should remain buried.",
    mood: ["scary", "suspenseful", "thrilling"],
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
      "An American architect and a Japanese tea ceremony master find love across cultural boundaries in modern Tokyo.",
    mood: ["romantic", "heartwarming", "cultural"],
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
      "A veteran thief plans one final score to secure his daughter's future, but when the job goes wrong, he must use all his skills to survive.",
    mood: ["exciting", "intense", "emotional"],
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
      "A quantum physicist discovers her research is being used to manipulate reality itself. Racing against time, she must prevent a catastrophic paradox.",
    mood: ["mind-bending", "suspenseful", "scientific"],
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
      "A war photographer returns to his homeland to document the aftermath of conflict, confronting his past and the cost of bearing witness.",
    mood: ["emotional", "deep", "reflective"],
    image: "/placeholder.svg?height=400&width=300",
  },
  {
    id: 7,
    title: "Midnight Café",
    genre: "Comedy",
    year: 2024,
    price: 2.29,
    rating: 4.1,
    duration: "1h 35m",
    director: "Sophie Laurent",
    synopsis:
      "A quirky night shift worker at a 24-hour café encounters the strangest customers in the city, leading to hilarious and heartwarming adventures.",
    mood: ["funny", "lighthearted", "quirky"],
    image: "/placeholder.svg?height=400&width=300",
  },
  {
    id: 8,
    title: "Ocean's Echo",
    genre: "Documentary",
    year: 2024,
    price: 1.79,
    rating: 4.9,
    duration: "1h 50m",
    director: "Dr. Marine Blue",
    synopsis:
      "An underwater exploration revealing the hidden world of deep-sea creatures and the urgent need to protect our oceans.",
    mood: ["educational", "beautiful", "inspiring"],
    image: "/placeholder.svg?height=400&width=300",
  },
  {
    id: 9,
    title: "The Artist's Journey",
    genre: "Biography",
    year: 2024,
    price: 3.19,
    rating: 4.5,
    duration: "2h 30m",
    director: "Elena Rodriguez",
    synopsis:
      "Following the life of a struggling painter who becomes one of the most influential artists of the 21st century.",
    mood: ["inspiring", "artistic", "emotional"],
    image: "/placeholder.svg?height=400&width=300",
  },
  {
    id: 10,
    title: "Space Odyssey 2024",
    genre: "Sci-Fi",
    year: 2024,
    price: 4.99,
    rating: 4.8,
    duration: "2h 45m",
    director: "Commander Rex",
    synopsis:
      "Humanity's first mission to Mars faces unexpected challenges when they discover they're not alone in the universe.",
    mood: ["epic", "adventurous", "mind-blowing"],
    image: "/placeholder.svg?height=400&width=300",
  },
  {
    id: 11,
    title: "Family Reunion",
    genre: "Drama",
    year: 2024,
    price: 2.79,
    rating: 4.0,
    duration: "1h 55m",
    director: "Michael Thompson",
    synopsis:
      "Three estranged siblings reunite for their father's funeral, uncovering family secrets that change everything they thought they knew.",
    mood: ["emotional", "family", "dramatic"],
    image: "/placeholder.svg?height=400&width=300",
  },
  {
    id: 12,
    title: "Cyber Hunt",
    genre: "Action",
    year: 2024,
    price: 3.29,
    rating: 4.3,
    duration: "2h 10m",
    director: "Zara Khan",
    synopsis:
      "A cybersecurity expert must track down a dangerous hacker who's threatening to crash the global financial system.",
    mood: ["intense", "tech-savvy", "fast-paced"],
    image: "/placeholder.svg?height=400&width=300",
  },
]

const genres = [
  "All",
  "Sci-Fi",
  "Horror",
  "Romance",
  "Action",
  "Thriller",
  "Drama",
  "Comedy",
  "Documentary",
  "Biography",
]

interface FilmLibraryProps {
  onOpenAI: () => void
}

export default function FilmLibrary({ onOpenAI }: FilmLibraryProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedGenre, setSelectedGenre] = useState("All")
  const [filteredFilms, setFilteredFilms] = useState(allFilms)

  const handleSearch = () => {
    let filtered = allFilms

    if (searchTerm) {
      filtered = filtered.filter(
        (film) =>
          film.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          film.director.toLowerCase().includes(searchTerm.toLowerCase()) ||
          film.synopsis.toLowerCase().includes(searchTerm.toLowerCase()) ||
          film.mood.some((mood) => mood.toLowerCase().includes(searchTerm.toLowerCase())),
      )
    }

    if (selectedGenre !== "All") {
      filtered = filtered.filter((film) => film.genre === selectedGenre)
    }

    setFilteredFilms(filtered)
  }

  const handleGenreFilter = (genre: string) => {
    setSelectedGenre(genre)
    let filtered = allFilms

    if (genre !== "All") {
      filtered = filtered.filter((film) => film.genre === genre)
    }

    if (searchTerm) {
      filtered = filtered.filter(
        (film) =>
          film.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          film.director.toLowerCase().includes(searchTerm.toLowerCase()) ||
          film.synopsis.toLowerCase().includes(searchTerm.toLowerCase()) ||
          film.mood.some((mood) => mood.toLowerCase().includes(searchTerm.toLowerCase())),
      )
    }

    setFilteredFilms(filtered)
  }

  return (
    <div className="relative z-10 container mx-auto px-4 py-12 bg-black">
      <div className="mb-8">
        <h2 className="text-4xl font-bold text-white mb-4">Complete Film Library</h2>
        <p className="text-gray-300 mb-6">Explore our entire collection of independent films</p>

        {/* Search and AI Assistant */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex-1 flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search by title, director, mood, or keywords..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSearch()}
                className="pl-10 bg-white/10 border-white/20 text-white placeholder-gray-400"
              />
            </div>
            <Button onClick={handleSearch} className="bg-purple-500 hover:bg-purple-600 text-white px-6">
              <Search className="h-4 w-4 mr-2" />
              Search
            </Button>
          </div>
          <Button
            onClick={onOpenAI}
            className="bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white px-6"
          >
            <Bot className="h-4 w-4 mr-2" />
            Ask AI Assistant
          </Button>
        </div>

        {/* Genre Filters */}
        <div className="flex flex-wrap gap-2 mb-6">
          <Filter className="h-5 w-5 text-gray-400 mt-2 mr-2" />
          {genres.map((genre) => (
            <Button
              key={genre}
              variant={selectedGenre === genre ? "default" : "outline"}
              size="sm"
              onClick={() => handleGenreFilter(genre)}
              className={
                selectedGenre === genre
                  ? "bg-purple-500 hover:bg-purple-600 text-white"
                  : "border-white/20 text-gray-300 hover:bg-white/10 bg-transparent"
              }
            >
              {genre}
            </Button>
          ))}
        </div>

        <p className="text-gray-400 text-sm">
          Showing {filteredFilms.length} of {allFilms.length} films
        </p>
      </div>

      {/* Film Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredFilms.map((film) => (
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

      {filteredFilms.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-400 text-lg mb-4">No films found matching your criteria</p>
          <Button
            onClick={onOpenAI}
            className="bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600"
          >
            <Bot className="h-4 w-4 mr-2" />
            Ask AI for Recommendations
          </Button>
        </div>
      )}
    </div>
  )
}
