import { type NextRequest, NextResponse } from "next/server"
import { requireAuth } from "@/lib/auth"
import { updateUserProfile, updateUserAvatar } from "@/lib/db"

export async function PUT(request: NextRequest) {
  try {
    const user = await requireAuth()
    const { username, avatar_url } = await request.json()

    let updatedUser = user

    if (username && username !== user.username) {
      updatedUser = await updateUserProfile(user.id, username)
    }

    if (avatar_url && avatar_url !== user.avatar_url) {
      updatedUser = await updateUserAvatar(user.id, avatar_url)
    }

    return NextResponse.json({
      success: true,
      user: {
        id: updatedUser.id,
        email: updatedUser.email,
        username: updatedUser.username,
        avatar_url: updatedUser.avatar_url,
      },
    })
  } catch (error) {
    console.error("Update profile error:", error)
    return NextResponse.json({ error: "Ошибка обновления профиля" }, { status: 500 })
  }
}
