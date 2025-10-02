import { type NextRequest, NextResponse } from "next/server"
import { checkAdminAuth } from "@/lib/admin-auth"
import { createRelease, getAllReleases, updateRelease, deleteRelease } from "@/lib/db"

export async function GET() {
  try {
    const isAdmin = await checkAdminAuth()
    if (!isAdmin) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const releases = await getAllReleases()
    return NextResponse.json({ releases })
  } catch (error) {
    console.error("Get releases error:", error)
    return NextResponse.json({ error: "Ошибка получения релизов" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const isAdmin = await checkAdminAuth()
    if (!isAdmin) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const data = await request.json()

    const release = await createRelease({
      title: data.title,
      title_ru: data.title_ru,
      description: data.description,
      cover_image_url: data.cover_image_url,
      year: Number.parseInt(data.year),
      season: data.season,
      total_episodes: Number.parseInt(data.total_episodes),
      status: data.status,
      genres: data.genres,
      rating: data.rating,
    })

    return NextResponse.json({ success: true, release })
  } catch (error) {
    console.error("Create release error:", error)
    return NextResponse.json({ error: "Ошибка создания релиза" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    const isAdmin = await checkAdminAuth()
    if (!isAdmin) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const data = await request.json()

    console.log("[v0 SERVER] Updating release:", data.id, "with release_day:", data.release_day)

    const release = await updateRelease(data.id, {
      title: data.title,
      title_ru: data.title_ru,
      description: data.description,
      cover_image_url: data.cover_image_url,
      year: Number.parseInt(data.year),
      season: data.season,
      total_episodes: Number.parseInt(data.total_episodes),
      status: data.status,
      genres: data.genres,
      rating: data.rating,
      featured: data.featured,
      featured_order: data.featured_order ? Number.parseInt(data.featured_order) : 0,
      release_day:
        data.release_day !== undefined
          ? data.release_day === null
            ? null
            : Number.parseInt(data.release_day)
          : undefined,
    })

    console.log("[v0 SERVER] Release updated successfully, release_day is now:", release.release_day)

    return NextResponse.json({ success: true, release })
  } catch (error) {
    console.error("Update release error:", error)
    return NextResponse.json({ error: "Ошибка обновления релиза" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const isAdmin = await checkAdminAuth()
    if (!isAdmin) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const id = searchParams.get("id")

    if (!id) {
      return NextResponse.json({ error: "ID не указан" }, { status: 400 })
    }

    await deleteRelease(Number.parseInt(id))

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Delete release error:", error)
    return NextResponse.json({ error: "Ошибка удаления релиза" }, { status: 500 })
  }
}
