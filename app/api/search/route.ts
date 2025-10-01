import { type NextRequest, NextResponse } from "next/server"
import { searchReleases } from "@/lib/db"

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const query = searchParams.get("q")

    if (!query) {
      return NextResponse.json({ releases: [] })
    }

    const releases = await searchReleases(query)
    return NextResponse.json({ releases })
  } catch (error) {
    console.error("Search error:", error)
    return NextResponse.json({ error: "Failed to search releases" }, { status: 500 })
  }
}
