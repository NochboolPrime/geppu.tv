import { type NextRequest, NextResponse } from "next/server"
import { checkAdminAuth } from "@/lib/admin-auth"
import { createEpisode, getEpisodesByReleaseId, updateEpisode, deleteEpisode } from "@/lib/db"

export async function GET(request: NextRequest) {
  try {
    const isAdmin = await checkAdminAuth()
    if (!isAdmin) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const releaseId = searchParams.get("releaseId")

    if (!releaseId) {
      return NextResponse.json({ error: "Release ID не указан" }, { status: 400 })
    }

    const episodes = await getEpisodesByReleaseId(Number.parseInt(releaseId))
    return NextResponse.json({ episodes })
  } catch (error) {
    console.error("Get episodes error:", error)
    return NextResponse.json({ error: "Ошибка получения эпизодов" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const isAdmin = await checkAdminAuth()
    if (!isAdmin) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const data = await request.json()

    const episode = await createEpisode({
      release_id: Number.parseInt(data.release_id),
      episode_number: Number.parseInt(data.episode_number),
      title: data.title,
      vk_video_url: data.vk_video_url,
      thumbnail_url: data.thumbnail_url,
      duration: data.duration ? Number.parseInt(data.duration) : undefined,
      release_date: data.release_date,
    })

    return NextResponse.json({ success: true, episode })
  } catch (error) {
    console.error("Create episode error:", error)
    return NextResponse.json({ error: "Ошибка создания эпизода" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    const isAdmin = await checkAdminAuth()
    if (!isAdmin) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const data = await request.json()

    const episode = await updateEpisode(data.id, {
      episode_number: Number.parseInt(data.episode_number),
      title: data.title,
      vk_video_url: data.vk_video_url,
      thumbnail_url: data.thumbnail_url,
      duration: data.duration ? Number.parseInt(data.duration) : undefined,
      release_date: data.release_date,
    })

    return NextResponse.json({ success: true, episode })
  } catch (error) {
    console.error("Update episode error:", error)
    return NextResponse.json({ error: "Ошибка обновления эпизода" }, { status: 500 })
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

    await deleteEpisode(Number.parseInt(id))

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Delete episode error:", error)
    return NextResponse.json({ error: "Ошибка удаления эпизода" }, { status: 500 })
  }
}
