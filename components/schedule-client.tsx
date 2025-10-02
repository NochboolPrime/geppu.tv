"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"

interface Release {
  id: number
  title: string
  title_ru: string
  cover_image_url: string
  season: string
  year: number
  release_day: number | null
  genres: string[]
  rating: string
  total_episodes: number
}

interface ScheduleClientProps {
  releases: Release[]
}

export function ScheduleClient({ releases }: ScheduleClientProps) {
  const [selectedDay, setSelectedDay] = useState<number | null>(null)
  const [searchQuery, setSearchQuery] = useState("")

  const weekdays = [
    { day: null, name: "Все" },
    { day: 1, name: "Понедельник" },
    { day: 2, name: "Вторник" },
    { day: 3, name: "Среда" },
    { day: 4, name: "Четверг" },
    { day: 5, name: "Пятница" },
    { day: 6, name: "Суббота" },
    { day: 0, name: "Воскресенье" },
  ]

  const currentDay = new Date().getDay()

  // Filter releases by selected day and search query
  const filteredReleases = releases.filter((release) => {
    const matchesDay = selectedDay === null || release.release_day === selectedDay
    const matchesSearch =
      searchQuery === "" ||
      release.title_ru.toLowerCase().includes(searchQuery.toLowerCase()) ||
      release.title.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesDay && matchesSearch
  })

  // Group releases by day
  const releasesByDay = weekdays
    .filter((w) => w.day !== null)
    .map((weekday) => ({
      ...weekday,
      releases: filteredReleases.filter((release) => release.release_day === weekday.day),
    }))

  return (
    <main className="min-h-screen bg-background">
      <div className="mx-auto max-w-7xl px-4 py-6 md:py-8 space-y-6">
        {/* Header */}
        <div className="space-y-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-balance">Расписание выхода новых эпизодов</h1>
            <p className="text-sm md:text-base text-muted-foreground mt-2">
              Следите за расписанием выхода новых эпизодов на нашем сайте
            </p>
          </div>

          {/* Search */}
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Поиск..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Day Tabs */}
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          {weekdays.map((weekday) => (
            <Button
              key={weekday.day ?? "all"}
              variant={selectedDay === weekday.day ? "default" : "secondary"}
              size="sm"
              onClick={() => setSelectedDay(weekday.day)}
              className="whitespace-nowrap flex-shrink-0"
            >
              {weekday.name}
            </Button>
          ))}
        </div>

        {/* Content */}
        {selectedDay === null ? (
          // Show all days grouped
          <div className="space-y-8">
            {releasesByDay.map((weekday) => (
              <section key={weekday.day} className="space-y-4">
                <div className="flex items-center gap-3">
                  <h2 className="text-xl md:text-2xl font-bold">{weekday.name}</h2>
                  {currentDay === weekday.day && (
                    <Badge variant="default" className="text-xs">
                      Сегодня
                    </Badge>
                  )}
                  <span className="text-sm text-muted-foreground">
                    {weekday.releases.length} {weekday.releases.length === 1 ? "релиз" : "релизов"}
                  </span>
                </div>

                {weekday.releases.length > 0 ? (
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 md:gap-4">
                    {weekday.releases.map((release) => (
                      <ReleaseCard key={release.id} release={release} />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 text-muted-foreground bg-card rounded-lg border border-border">
                    <p className="text-sm">В этот день релизов нет</p>
                  </div>
                )}
              </section>
            ))}
          </div>
        ) : (
          // Show selected day only
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <h2 className="text-xl md:text-2xl font-bold">{weekdays.find((w) => w.day === selectedDay)?.name}</h2>
              {currentDay === selectedDay && (
                <Badge variant="default" className="text-xs">
                  Сегодня
                </Badge>
              )}
              <span className="text-sm text-muted-foreground">
                {filteredReleases.length} {filteredReleases.length === 1 ? "релиз" : "релизов"}
              </span>
            </div>

            {filteredReleases.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 md:gap-4">
                {filteredReleases.map((release) => (
                  <ReleaseCard key={release.id} release={release} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12 text-muted-foreground bg-card rounded-lg border border-border">
                <p>Релизов не найдено</p>
              </div>
            )}
          </div>
        )}
      </div>
    </main>
  )
}

function ReleaseCard({ release }: { release: Release }) {
  return (
    <Link href={`/release/${release.id}`} className="group block">
      <div className="space-y-2">
        {/* Image */}
        <div className="aspect-[2/3] relative overflow-hidden rounded-lg bg-muted">
          <Image
            src={release.cover_image_url || "/placeholder.svg"}
            alt={release.title_ru}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

          {/* Rating Badge */}
          <div className="absolute top-2 right-2">
            <Badge variant="secondary" className="text-xs font-semibold bg-black/70 text-white border-0">
              {release.rating}
            </Badge>
          </div>
        </div>

        {/* Info */}
        <div className="space-y-1">
          <h3 className="font-medium text-sm line-clamp-2 leading-tight group-hover:text-primary transition-colors">
            {release.title_ru}
          </h3>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <span>
              {release.season} {release.year}
            </span>
            <span>•</span>
            <span>{release.total_episodes} эп.</span>
          </div>
          {release.genres && release.genres.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {release.genres.slice(0, 2).map((genre, idx) => (
                <Badge key={idx} variant="outline" className="text-xs px-1.5 py-0">
                  {genre}
                </Badge>
              ))}
            </div>
          )}
        </div>
      </div>
    </Link>
  )
}
