import { type NextRequest, NextResponse } from "next/server"
import { addToFavorites, removeFromFavorites, isFavorite } from "@/lib/db"
import { getSession } from "@/lib/auth"

export async function POST(request: NextRequest) {
  try {
    const user = await getSession()
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { releaseId } = await request.json()

    if (!releaseId) {
      return NextResponse.json({ error: "Release ID is required" }, { status: 400 })
    }

    await addToFavorites(user.id, releaseId)
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Add to favorites error:", error)
    return NextResponse.json({ error: "Failed to add to favorites" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const user = await getSession()
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const searchParams = request.nextUrl.searchParams
    const releaseId = searchParams.get("releaseId")

    if (!releaseId) {
      return NextResponse.json({ error: "Release ID is required" }, { status: 400 })
    }

    await removeFromFavorites(user.id, Number.parseInt(releaseId))
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Remove from favorites error:", error)
    return NextResponse.json({ error: "Failed to remove from favorites" }, { status: 500 })
  }
}

export async function GET(request: NextRequest) {
  try {
    const user = await getSession()
    if (!user) {
      return NextResponse.json({ isFavorite: false })
    }

    const searchParams = request.nextUrl.searchParams
    const releaseId = searchParams.get("releaseId")

    if (!releaseId) {
      return NextResponse.json({ error: "Release ID is required" }, { status: 400 })
    }

    const favorite = await isFavorite(user.id, Number.parseInt(releaseId))
    return NextResponse.json({ isFavorite: favorite })
  } catch (error) {
    console.error("Check favorite error:", error)
    return NextResponse.json({ error: "Failed to check favorite" }, { status: 500 })
  }
}
