import { cookies } from "next/headers"
import { getUserById } from "./db"

const SESSION_COOKIE_NAME = "geppu_session"

export async function getSession() {
  const cookieStore = await cookies()
  const sessionCookie = cookieStore.get(SESSION_COOKIE_NAME)

  if (!sessionCookie) {
    return null
  }

  try {
    const userId = Number.parseInt(sessionCookie.value)
    const user = await getUserById(userId)
    return user
  } catch {
    return null
  }
}

export async function setSession(userId: number) {
  const cookieStore = await cookies()
  cookieStore.set(SESSION_COOKIE_NAME, userId.toString(), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 30, // 30 days
    path: "/",
  })
}

export async function clearSession() {
  const cookieStore = await cookies()
  cookieStore.delete(SESSION_COOKIE_NAME)
}

export async function requireAuth() {
  const user = await getSession()
  if (!user) {
    throw new Error("Unauthorized")
  }
  return user
}
