"use client"

import { useState, useMemo } from "react"
import Image from "next/image"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

interface Release {
  id: number
  title: string
  title_ru: string
  cover_image_url: string
  year: number
  season: string
  total_episodes: number
  status: string
  genres: string[]
  rating: string
}

interface CatalogClientProps {
  releases: Release[]
}

export function CatalogClient({ releases }: CatalogClientProps) {
  const [selectedGenre, setSelectedGenre] = useState<string | null>(null)

  // Extract all unique genres
  const allGenres = useMemo(() => {
    const genresSet = new Set<string>()
    releases.forEach((release) => {
      release.genres?.forEach((genre) => genresSet.add(genre))
    })
    return Array.from(genresSet).sort()
  }, [releases])

  // Filter releases by selected genre
  const filteredReleases = useMemo(() => {
    if (!selectedGenre) return releases
    return releases.filter((release) => release.genres?.includes(selectedGenre))
  }, [releases, selectedGenre])

  return (
    <div className="space-y-6">
      {/* Genre filters */}
      <div className="flex flex-wrap gap-2">
        <Button
          variant={selectedGenre === null ? "default" : "outline"}
          size="sm"
          onClick={() => setSelectedGenre(null)}
        >
          Все ({releases.length})
        </Button>
        {allGenres.map((genre) => {
          const count = releases.filter((r) => r.genres?.includes(genre)).length
          return (
            <Button
              key={genre}
              variant={selectedGenre === genre ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedGenre(genre)}
            >
              {genre} ({count})
            </Button>
          )
        })}
      </div>

      {/* Results count */}
      <p className="text-sm text-muted-foreground">Найдено релизов: {filteredReleases.length}</p>

      {/* Releases grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
        {filteredReleases.map((release) => (
          <Link key={release.id} href={`/release/${release.id}`} className="group block space-y-2">
            <div className="aspect-[2/3] relative overflow-hidden rounded-lg bg-muted">
              <Image
                src={release.cover_image_url || "/placeholder.svg"}
                alt={release.title_ru}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="absolute top-2 right-2">
                <Badge variant={release.status === "ongoing" ? "default" : "secondary"} className="text-xs">
                  {release.status === "ongoing" ? "Онгоинг" : "Завершён"}
                </Badge>
              </div>
            </div>
            <div className="space-y-1">
              <h3 className="font-medium line-clamp-2 text-sm">{release.title_ru}</h3>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <span>{release.year}</span>
                <span>•</span>
                <span>{release.total_episodes} эп.</span>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {filteredReleases.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">Релизы не найдены</p>
        </div>
      )}
    </div>
  )
}
