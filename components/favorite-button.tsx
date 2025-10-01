"use client"

import { useState, useEffect } from "react"
import { Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

interface FavoriteButtonProps {
  releaseId: number
  userId: number | null
}

export function FavoriteButton({ releaseId, userId }: FavoriteButtonProps) {
  const [isFavorite, setIsFavorite] = useState(false)
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  useEffect(() => {
    if (!userId) return

    const checkFavorite = async () => {
      try {
        const response = await fetch(`/api/favorites?releaseId=${releaseId}`)
        const data = await response.json()
        setIsFavorite(data.isFavorite)
      } catch (error) {
        console.error("Failed to check favorite:", error)
      }
    }

    checkFavorite()
  }, [releaseId, userId])

  const toggleFavorite = async () => {
    if (!userId) {
      router.push("/login")
      return
    }

    setLoading(true)
    try {
      if (isFavorite) {
        await fetch(`/api/favorites?releaseId=${releaseId}`, {
          method: "DELETE",
        })
        setIsFavorite(false)
      } else {
        await fetch("/api/favorites", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ releaseId }),
        })
        setIsFavorite(true)
      }
    } catch (error) {
      console.error("Failed to toggle favorite:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Button size="lg" variant="outline" className="gap-2 bg-transparent" onClick={toggleFavorite} disabled={loading}>
      <Heart className={`h-5 w-5 ${isFavorite ? "fill-primary text-primary" : ""}`} />
      {isFavorite ? "В избранном" : "В избранное"}
    </Button>
  )
}
