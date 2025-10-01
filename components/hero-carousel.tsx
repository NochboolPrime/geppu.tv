"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { ChevronLeft, ChevronRight, Play } from "lucide-react"
import { Button } from "@/components/ui/button"

interface HeroSlide {
  id: number
  release_id: number
  title: string
  title_ru: string
  description: string
  cover_image_url: string
  episode_number: number
  year: number
  total_episodes: number
  rating: string
}

interface HeroCarouselProps {
  slides: HeroSlide[]
}

export function HeroCarousel({ slides }: HeroCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const autoPlayRef = useRef(true)
  const timeoutRef = useRef<NodeJS.Timeout>()

  useEffect(() => {
    if (slides.length === 0) return

    const startAutoPlay = () => {
      timeoutRef.current = setInterval(() => {
        if (autoPlayRef.current) {
          setCurrentIndex((prev) => (prev + 1) % slides.length)
        }
      }, 5000)
    }

    startAutoPlay()

    return () => {
      if (timeoutRef.current) {
        clearInterval(timeoutRef.current)
      }
    }
  }, [slides.length])

  if (slides.length === 0) {
    return null
  }

  const currentSlide = slides[currentIndex]

  const goToPrevious = () => {
    autoPlayRef.current = false
    setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length)
    setTimeout(() => {
      autoPlayRef.current = true
    }, 10000)
  }

  const goToNext = () => {
    autoPlayRef.current = false
    setCurrentIndex((prev) => (prev + 1) % slides.length)
    setTimeout(() => {
      autoPlayRef.current = true
    }, 10000)
  }

  const goToSlide = (index: number) => {
    autoPlayRef.current = false
    setCurrentIndex(index)
    setTimeout(() => {
      autoPlayRef.current = true
    }, 10000)
  }

  return (
    <div className="relative w-full h-[500px] overflow-hidden rounded-lg">
      <div className="absolute inset-0">
        <Image
          src={currentSlide.cover_image_url || "/placeholder.svg"}
          alt={currentSlide.title_ru}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-transparent" />
      </div>

      <div className="relative h-full flex items-center">
        <div className="container px-4">
          <div className="max-w-2xl space-y-4">
            <h1 className="text-4xl md:text-5xl font-bold text-balance">{currentSlide.title_ru}</h1>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <span>Лето</span>
              <span>•</span>
              <span>{currentSlide.year}</span>
              <span>•</span>
              <span>{currentSlide.total_episodes} эпизодов</span>
              <span>•</span>
              <span>{currentSlide.rating}</span>
            </div>
            <p className="text-lg text-muted-foreground line-clamp-3">{currentSlide.description}</p>
            <div className="flex items-center gap-3">
              <Button size="lg" asChild className="gap-2">
                <Link href={`/watch/${currentSlide.release_id}/${currentSlide.episode_number}`}>
                  <Play className="h-5 w-5" />
                  Смотреть
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href={`/release/${currentSlide.release_id}`}>Подробнее</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {slides.length > 1 && (
        <>
          <Button
            variant="ghost"
            size="icon"
            className="absolute left-4 top-1/2 -translate-y-1/2 h-12 w-12 rounded-full bg-background/50 hover:bg-background/80"
            onClick={goToPrevious}
          >
            <ChevronLeft className="h-6 w-6" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-4 top-1/2 -translate-y-1/2 h-12 w-12 rounded-full bg-background/50 hover:bg-background/80"
            onClick={goToNext}
          >
            <ChevronRight className="h-6 w-6" />
          </Button>

          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
            {slides.map((_, index) => (
              <button
                key={index}
                className={`h-1.5 rounded-full transition-all ${
                  index === currentIndex ? "w-8 bg-primary" : "w-1.5 bg-white/50"
                }`}
                onClick={() => goToSlide(index)}
              />
            ))}
          </div>
        </>
      )}
    </div>
  )
}
