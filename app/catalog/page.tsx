import { getAllReleases } from "@/lib/db"
import { CatalogClient } from "@/components/catalog-client"

export default async function CatalogPage() {
  const releases = await getAllReleases()

  return (
    <main className="min-h-screen">
      <div className="container px-4 py-8">
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold">Каталог аниме</h1>
            <p className="text-muted-foreground mt-2">Все доступные релизы с возможностью фильтрации по жанрам</p>
          </div>
          <CatalogClient releases={releases} />
        </div>
      </div>
    </main>
  )
}
