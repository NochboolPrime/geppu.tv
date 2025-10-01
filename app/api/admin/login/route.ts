import { type NextRequest, NextResponse } from "next/server"
import { verifyAdminPassword, setAdminSession } from "@/lib/admin-auth"

export async function POST(request: NextRequest) {
  try {
    const { password } = await request.json()

    if (!password) {
      return NextResponse.json({ error: "Пароль обязателен" }, { status: 400 })
    }

    if (!verifyAdminPassword(password)) {
      return NextResponse.json({ error: "Неверный пароль" }, { status: 401 })
    }

    await setAdminSession()

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Admin login error:", error)
    return NextResponse.json({ error: "Ошибка входа" }, { status: 500 })
  }
}
