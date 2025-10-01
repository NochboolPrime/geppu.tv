"use client"

import { useState, useEffect } from "react"
import { Search, X } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"

interface Release {
  id: number
  title: string
  title_ru: string
  cover_image_url: string
  year: number
  genres: string[]
}

interface SearchDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function SearchDialog({ open, onOpenChange }: SearchDialogProps) {
  const [query, setQuery] = useState("")
  const [results, setResults] = useState<Release[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!query.trim()) {
      setResults([])
      return
    }

    const timer = setTimeout(async () => {
      setLoading(true)
      try {
        const response = await fetch(`/api/search?q=${encodeURIComponent(query)}`)
        const data = await response.json()
        setResults(data.releases || [])
      } catch (error) {
        console.error("Search error:", error)
      } finally {
        setLoading(false)
      }
    }, 300)

    return () => clearTimeout(timer)
  }, [query])

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle>Поиск аниме</DialogTitle>
        </DialogHeader>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Введите название аниме..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="pl-9 pr-9"
            autoFocus
          />
          {query && (
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7"
              onClick={() => setQuery("")}
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
        <div className="flex-1 overflow-y-auto mt-4">
          {loading && <p className="text-center text-muted-foreground py-8">Поиск...</p>}
          {!loading && query && results.length === 0 && (
            <p className="text-center text-muted-foreground py-8">Ничего не найдено</p>
          )}
          {!loading && results.length > 0 && (
            <div className="space-y-2">
              {results.map((release) => (
                <Link
                  key={release.id}
                  href={`/release/${release.id}`}
                  onClick={() => onOpenChange(false)}
                  className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted transition-colors"
                >
                  <div className="relative w-12 h-16 shrink-0 rounded overflow-hidden bg-muted">
                    <Image
                      src={release.cover_image_url || "/placeholder.svg"}
                      alt={release.title_ru}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium line-clamp-1">{release.title_ru}</h3>
                    <p className="text-sm text-muted-foreground line-clamp-1">{release.title}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs text-muted-foreground">{release.year}</span>
                      {release.genres?.slice(0, 2).map((genre) => (
                        <span key={genre} className="text-xs text-muted-foreground">
                          • {genre}
                        </span>
                      ))}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
