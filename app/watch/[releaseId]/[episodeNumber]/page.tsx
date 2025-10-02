import { notFound } from "next/navigation"
import Link from "next/link"
import { ChevronLeft, Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { VKPlayer } from "@/components/vk-player"
import { getReleaseById, getEpisodesByReleaseId } from "@/lib/db"
import { getSession } from "@/lib/auth"

interface WatchPageProps {
  params: Promise<{
    releaseId: string
    episodeNumber: string
  }>
}

export default async function WatchPage({ params }: WatchPageProps) {
  const { releaseId, episodeNumber } = await params
  const release = await getReleaseById(Number.parseInt(releaseId))

  if (!release) {
    notFound()
  }

  const episodes = await getEpisodesByReleaseId(Number.parseInt(releaseId))
  const currentEpisode = episodes.find((ep) => ep.episode_number === Number.parseInt(episodeNumber))

  if (!currentEpisode) {
    notFound()
  }

  const user = await getSession()

  return (
    <main className="min-h-screen bg-background">
      <div className="mx-auto max-w-7xl px-4 py-6 space-y-6">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" asChild>
            <Link href={`/release/${releaseId}`}>
              <ChevronLeft className="h-5 w-5" />
            </Link>
          </Button>
          <div className="flex-1">
            <h1 className="text-2xl font-bold">{release.title_ru}</h1>
            <p className="text-sm text-muted-foreground">
              Эпизод {currentEpisode.episode_number}
              {currentEpisode.title && ` - ${currentEpisode.title}`}
            </p>
          </div>
          {user && (
            <Button variant="outline" size="icon">
              <Heart className="h-5 w-5" />
            </Button>
          )}
        </div>

        <div className="rounded-lg overflow-hidden">
          <VKPlayer videoUrl={currentEpisode.vk_video_url} />
        </div>

        <div className="space-y-4">
          <h2 className="text-xl font-bold">Эпизоды</h2>
          <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-12 gap-2">
            {episodes.map((episode) => (
              <Link
                key={episode.id}
                href={`/watch/${releaseId}/${episode.episode_number}`}
                className={`aspect-square rounded-lg flex items-center justify-center text-sm font-medium transition-colors ${
                  episode.episode_number === currentEpisode.episode_number
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted hover:bg-muted/80"
                }`}
              >
                {episode.episode_number}
              </Link>
            ))}
          </div>
        </div>

        {release.description && (
          <div className="space-y-2">
            <h2 className="text-xl font-bold">Описание</h2>
            <p className="text-muted-foreground leading-relaxed">{release.description}</p>
          </div>
        )}
      </div>
    </main>
  )
}
