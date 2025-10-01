import { type NextRequest, NextResponse } from "next/server"
import { createUser, getUserByEmail } from "@/lib/db"
import { setSession } from "@/lib/auth"
import bcrypt from "bcryptjs"

export async function POST(request: NextRequest) {
  try {
    const { email, password, username } = await request.json()

    if (!email || !password || !username) {
      return NextResponse.json({ error: "Все поля обязательны" }, { status: 400 })
    }

    // Check if user already exists
    const existingUser = await getUserByEmail(email)
    if (existingUser) {
      return NextResponse.json({ error: "Пользователь с таким email уже существует" }, { status: 400 })
    }

    // Hash password
    const passwordHash = await bcrypt.hash(password, 10)

    // Create user
    const user = await createUser(email, passwordHash, username)

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
    console.error("Registration error:", error)
    return NextResponse.json({ error: "Ошибка регистрации" }, { status: 500 })
  }
}
