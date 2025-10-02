import { type NextRequest, NextResponse } from "next/server"
import { addToList, removeFromList, getUserListStatus } from "@/lib/db"
import { getSession } from "@/lib/auth"

export async function POST(request: NextRequest) {
  try {
    const user = await getSession()
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { releaseId, status } = await request.json()

    if (!releaseId || !status) {
      return NextResponse.json({ error: "Release ID and status are required" }, { status: 400 })
    }

    const validStatuses = ["watching", "completed", "on_hold", "dropped", "planned"]
    if (!validStatuses.includes(status)) {
      return NextResponse.json({ error: "Invalid status" }, { status: 400 })
    }

    await addToList(user.id, releaseId, status)
    return NextResponse.json({ success: true, status })
  } catch (error) {
    console.error("Add to list error:", error)
    return NextResponse.json({ error: "Failed to add to list" }, { status: 500 })
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

    await removeFromList(user.id, Number.parseInt(releaseId))
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Remove from list error:", error)
    return NextResponse.json({ error: "Failed to remove from list" }, { status: 500 })
  }
}

export async function GET(request: NextRequest) {
  try {
    const user = await getSession()
    if (!user) {
      return NextResponse.json({ status: null })
    }

    const searchParams = request.nextUrl.searchParams
    const releaseId = searchParams.get("releaseId")

    if (!releaseId) {
      return NextResponse.json({ error: "Release ID is required" }, { status: 400 })
    }

    const status = await getUserListStatus(user.id, Number.parseInt(releaseId))
    return NextResponse.json({ status })
  } catch (error) {
    console.error("Check list status error:", error)
    return NextResponse.json({ error: "Failed to check list status" }, { status: 500 })
  }
}
