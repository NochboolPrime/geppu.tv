import { type NextRequest, NextResponse } from "next/server"
import { getUserByEmail } from "@/lib/db"
import { setSession } from "@/lib/auth"
import bcrypt from "bcryptjs"

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json()

    if (!email || !password) {
      return NextResponse.json({ error: "Email и пароль обязательны" }, { status: 400 })
    }

    // Get user
    const user = await getUserByEmail(email)
    if (!user) {
      return NextResponse.json({ error: "Неверный email или пароль" }, { status: 401 })
    }

    // Verify password
    const isValidPassword = await bcrypt.compare(password, user.password_hash)
    if (!isValidPassword) {
      return NextResponse.json({ error: "Неверный email или пароль" }, { status: 401 })
    }

    // Set session
    await setSession(user.id)

    return NextResponse.json({
      success: true,
      user: {
        id: user.id,
        email: user.email,
        username: user.username,
      },
    })
  } catch (error) {
    console.error("Login error:", error)
    return NextResponse.json({ error: "Ошибка входа" }, { status: 500 })
  }
}
