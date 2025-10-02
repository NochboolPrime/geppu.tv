import { notFound } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { Play, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { getReleaseById, getEpisodesByReleaseId } from "@/lib/db"
import { getSession } from "@/lib/auth"
import { ListButton } from "@/components/list-button"

interface ReleasePageProps {
  params: Promise<{
    id: string
  }>
}

export default async function ReleasePage({ params }: ReleasePageProps) {
  const { id } = await params
  const release = await getReleaseById(Number.parseInt(id))

  if (!release) {
    notFound()
  }

  const episodes = await getEpisodesByReleaseId(Number.parseInt(id))
  const user = await getSession()
  const latestEpisode = episodes[episodes.length - 1]

  return (
    <main className="min-h-screen bg-background">
      <div className="relative h-[400px] w-full">
        <Image
          src={release.cover_image_url || "/placeholder.svg"}
          alt={release.title_ru}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
      </div>

      <div className="mx-auto max-w-7xl px-4 -mt-32 relative z-10">
        <div className="flex flex-col md:flex-row gap-8">
          <div className="w-full md:w-64 shrink-0">
            <div className="aspect-[2/3] relative rounded-lg overflow-hidden shadow-2xl">
              <Image
                src={release.cover_image_url || "/placeholder.svg"}
                alt={release.title_ru}
                fill
                className="object-cover"
              />
            </div>
          </div>

          <div className="flex-1 space-y-6">
            <div className="space-y-4">
              <h1 className="text-4xl font-bold">{release.title_ru}</h1>
              <p className="text-lg text-muted-foreground">{release.title}</p>

              <div className="flex flex-wrap items-center gap-2">
                {release.genres?.map((genre) => (
                  <Badge key={genre} variant="secondary">
                    {genre}
                  </Badge>
                ))}
              </div>

              <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  <span>
                    {release.season} {release.year}
                  </span>
                </div>
                <span>•</span>
                <span>{release.total_episodes} эпизодов</span>
                <span>•</span>
                <span>{release.rating}</span>
                <span>•</span>
                <Badge variant={release.status === "ongoing" ? "default" : "secondary"}>
                  {release.status === "ongoing" ? "Онгоинг" : "Завершён"}
                </Badge>
              </div>

              <div className="flex items-center gap-3">
                {latestEpisode && (
                  <Button size="lg" asChild className="gap-2">
                    <Link href={`/watch/${release.id}/${latestEpisode.episode_number}`}>
                      <Play className="h-5 w-5" />
                      Смотреть эпизод {latestEpisode.episode_number}
                    </Link>
                  </Button>
                )}
                <ListButton releaseId={release.id} userId={user?.id || null} />
              </div>
            </div>

            {release.description && (
              <div className="space-y-2">
                <h2 className="text-xl font-bold">Описание</h2>
                <p className="text-muted-foreground leading-relaxed">{release.description}</p>
              </div>
            )}

            <div className="space-y-4">
              <h2 className="text-xl font-bold">Эпизоды ({episodes.length})</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
                {episodes.map((episode) => (
                  <Link
                    key={episode.id}
                    href={`/watch/${release.id}/${episode.episode_number}`}
                    className="group relative aspect-video rounded-lg overflow-hidden bg-muted hover:ring-2 hover:ring-primary transition-all"
                  >
                    {episode.thumbnail_url ? (
                      <Image
                        src={episode.thumbnail_url || "/placeholder.svg"}
                        alt={`Эпизод ${episode.episode_number}`}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Play className="h-8 w-8 text-muted-foreground group-hover:text-primary transition-colors" />
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
                    <div className="absolute bottom-2 left-2 right-2">
                      <p className="text-xs font-medium">Эпизод {episode.episode_number}</p>
                      {episode.title && <p className="text-xs text-muted-foreground line-clamp-1">{episode.title}</p>}
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
