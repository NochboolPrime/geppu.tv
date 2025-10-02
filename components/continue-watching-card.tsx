import Image from "next/image"
import Link from "next/link"
import { Play } from "lucide-react"

interface ContinueWatchingCardProps {
  id: number
  release_id: number
  title_ru: string
  cover_image_url: string
  episode_number: number
  episode_title?: string
  progress: number
  total_episodes: number
}

export function ContinueWatchingCard({
  id,
  release_id,
  title_ru,
  cover_image_url,
  episode_number,
  episode_title,
  progress,
  total_episodes,
}: ContinueWatchingCardProps) {
  return (
    <Link href={`/release/${release_id}`} className="group relative block overflow-hidden rounded-lg">
      <div className="aspect-[2/3] relative overflow-hidden bg-muted">
        <Image
          src={cover_image_url || "/placeholder.svg"}
          alt={title_ru}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
          <div className="h-14 w-14 rounded-full bg-primary/90 flex items-center justify-center">
            <Play className="h-6 w-6 text-primary-foreground ml-1" />
          </div>
        </div>
        <div className="absolute top-2 left-2 bg-primary text-primary-foreground text-xs font-bold px-2 py-1 rounded">
          Эпизод {episode_number}
        </div>
        {/* Progress bar */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-muted/50">
          <div className="h-full bg-primary transition-all" style={{ width: `${progress}%` }} />
        </div>
      </div>
      <div className="mt-2 space-y-1">
        <h3 className="font-medium line-clamp-2 text-sm">{title_ru}</h3>
        <p className="text-xs text-muted-foreground">
          {progress > 0 ? `${Math.round(progress)}% просмотрено` : "Начать просмотр"}
        </p>
      </div>
    </Link>
  )
}
