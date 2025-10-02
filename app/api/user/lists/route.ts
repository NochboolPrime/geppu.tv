import { type NextRequest, NextResponse } from "next/server"
import { getUserListsByStatus, getUserListsCount } from "@/lib/db"
import { getSession } from "@/lib/auth"

export async function GET(request: NextRequest) {
  try {
    const user = await getSession()
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const searchParams = request.nextUrl.searchParams
    const status = searchParams.get("status")
    const countsOnly = searchParams.get("countsOnly") === "true"

    if (countsOnly) {
      const counts = await getUserListsCount(user.id)
      return NextResponse.json({ counts })
    }

    const lists = await getUserListsByStatus(user.id, status || undefined)
    return NextResponse.json({ lists })
  } catch (error) {
    console.error("Get user lists error:", error)
    return NextResponse.json({ error: "Failed to get user lists" }, { status: 500 })
  }
}
