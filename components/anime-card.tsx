import Image from "next/image"
import Link from "next/link"
import { Play } from "lucide-react"

interface AnimeCardProps {
  id: number
  release_id: number
  title_ru: string
  cover_image_url: string
  episode_number: number
  episode_title?: string
}

export function AnimeCard({
  id,
  release_id,
  title_ru,
  cover_image_url,
  episode_number,
  episode_title,
}: AnimeCardProps) {
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
      </div>
      <div className="mt-2 space-y-1">
        <h3 className="font-medium line-clamp-2 text-sm">{title_ru}</h3>
        {episode_title && <p className="text-xs text-muted-foreground line-clamp-1">{episode_title}</p>}
      </div>
    </Link>
  )
}
