import { NextResponse } from "next/server"
import { sql } from "@/lib/db"

export async function GET() {
  try {
    // Get a random release from the database
    const result = await sql`
      SELECT id, title, title_ru 
      FROM releases 
      ORDER BY RANDOM() 
      LIMIT 1
    `

    if (result.length === 0) {
      return NextResponse.json({ error: "No releases found" }, { status: 404 })
    }

    return NextResponse.json(result[0])
  } catch (error) {
    console.error("Random release error:", error)
    return NextResponse.json({ error: "Failed to get random release" }, { status: 500 })
  }
}
