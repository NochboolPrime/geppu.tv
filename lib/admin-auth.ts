import { cookies } from "next/headers"

const ADMIN_PASSWORD = "2284856"
const ADMIN_COOKIE_NAME = "geppu_admin_session"

export async function checkAdminAuth(): Promise<boolean> {
  const cookieStore = await cookies()
  const adminCookie = cookieStore.get(ADMIN_COOKIE_NAME)
  return adminCookie?.value === "authenticated"
}

export async function setAdminSession() {
  const cookieStore = await cookies()
  cookieStore.set(ADMIN_COOKIE_NAME, "authenticated", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24, // 24 hours
    path: "/",
  })
}

export async function clearAdminSession() {
  const cookieStore = await cookies()
  cookieStore.delete(ADMIN_COOKIE_NAME)
}

export function verifyAdminPassword(password: string): boolean {
  return password === ADMIN_PASSWORD
}
