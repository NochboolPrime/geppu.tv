import { type NextRequest, NextResponse } from "next/server"
import { requireAuth } from "@/lib/auth"
import { getUserFavorites, addToFavorites, removeFromFavorites } from "@/lib/db"

export async function GET() {
  try {
    const user = await requireAuth()
    const favorites = await getUserFavorites(user.id)
    return NextResponse.json({ favorites })
  } catch (error) {
    console.error("Get favorites error:", error)
    return NextResponse.json({ error: "Ошибка получения избранного" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const user = await requireAuth()
    const { release_id } = await request.json()

    await addToFavorites(user.id, release_id)

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Add to favorites error:", error)
    return NextResponse.json({ error: "Ошибка добавления в избранное" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const user = await requireAuth()
    const { release_id } = await request.json()

    await removeFromFavorites(user.id, release_id)

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Remove from favorites error:", error)
    return NextResponse.json({ error: "Ошибка удаления из избранного" }, { status: 500 })
  }
}
