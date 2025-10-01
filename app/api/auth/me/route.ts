import { NextResponse } from "next/server"
import { getSession } from "@/lib/auth"

export async function GET() {
  try {
    const user = await getSession()

    if (!user) {
      return NextResponse.json({ user: null })
    }

    return NextResponse.json({
      user: {
        id: user.id,
        email: user.email,
        username: user.username,
        avatar_url: user.avatar_url,
      },
    })
  } catch (error) {
    console.error("Get user error:", error)
    return NextResponse.json({ user: null })
  }
}
