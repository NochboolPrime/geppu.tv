import { HeroCarousel } from "@/components/hero-carousel"
import { AnimeCard } from "@/components/anime-card"
import { ContinueWatchingCard } from "@/components/continue-watching-card"
import { getTodayReleases, getLatestEpisodes, getFeaturedReleases, getContinueWatching } from "@/lib/db"
import { ChevronRight } from "lucide-react"
import Link from "next/link"

export default async function HomePage() {
  const todayReleases = await getTodayReleases()
  const latestEpisodes = await getLatestEpisodes(18)
  const featuredReleases = await getFeaturedReleases()

  // TODO: Replace with actual authenticated user ID
  const continueWatching = await getContinueWatching(1, 12)

  const heroSlides =
    featuredReleases.length > 0
      ? featuredReleases.map((release) => ({
          id: release.id,
          release_id: release.id,
          title: release.title,
          title_ru: release.title_ru,
          description: release.description || "Новый эпизод уже доступен для просмотра!",
          cover_image_url: release.cover_image_url,
          episode_number: 1,
          year: release.year,
          total_episodes: release.total_episodes,
          rating: release.rating,
        }))
      : []

  return (
    <main className="min-h-screen bg-background">
      <div className="mx-auto max-w-7xl px-4 py-6 md:py-8 space-y-8 md:space-y-12">
        {heroSlides.length > 0 && <HeroCarousel slides={heroSlides} />}

        {continueWatching.length > 0 && (
          <section>
            <div className="flex items-center justify-between mb-4 md:mb-6">
              <div>
                <h2 className="text-xl md:text-2xl font-bold">Продолжить просмотр</h2>
                <p className="text-xs md:text-sm text-muted-foreground mt-1">
                  Вернитесь к просмотру там, где остановились
                </p>
              </div>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 md:gap-4">
              {continueWatching.map((episode) => (
                <ContinueWatchingCard
                  key={episode.id}
                  id={episode.id}
                  release_id={episode.release_id}
                  title_ru={episode.title_ru}
                  cover_image_url={episode.cover_image_url}
                  episode_number={episode.episode_number}
                  episode_title={episode.episode_title}
                  progress={episode.progress}
                  total_episodes={episode.total_episodes}
                />
              ))}
            </div>
          </section>
        )}

        {todayReleases.length > 0 && (
          <section>
            <div className="flex items-center justify-between mb-4 md:mb-6">
              <h2 className="text-xl md:text-2xl font-bold">Выходит сегодня</h2>
              <Link href="/schedule" className="flex items-center gap-1 text-sm text-primary hover:underline">
                Все релизы
                <ChevronRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 md:gap-4">
              {todayReleases.map((episode) => (
                <AnimeCard
                  key={episode.id}
                  id={episode.id}
                  release_id={episode.release_id}
                  title_ru={episode.title_ru}
                  cover_image_url={episode.cover_image_url}
                  episode_number={episode.episode_number}
                  episode_title={episode.episode_title}
                />
              ))}
            </div>
          </section>
        )}

        <section>
          <div className="flex items-center justify-between mb-4 md:mb-6">
            <div>
              <h2 className="text-xl md:text-2xl font-bold">Новые эпизоды</h2>
              <p className="text-xs md:text-sm text-muted-foreground mt-1">
                Самые новые и свежие эпизоды в любимой озвучке
              </p>
            </div>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 md:gap-4">
            {latestEpisodes.map((episode) => (
              <AnimeCard
                key={episode.id}
                id={episode.id}
                release_id={episode.release_id}
                title_ru={episode.title_ru}
                cover_image_url={episode.cover_image_url}
                episode_number={episode.episode_number}
                episode_title={episode.episode_title}
              />
            ))}
          </div>
        </section>
      </div>
    </main>
  )
}
