import { redirect } from "next/navigation"
import { getSession } from "@/lib/auth"
import { getUserFavorites } from "@/lib/db"
import { ProfileContent } from "@/components/profile-content"

export default async function ProfilePage() {
  const user = await getSession()

  if (!user) {
    redirect("/")
  }

  const favorites = await getUserFavorites(user.id)

  return <ProfileContent user={user} initialFavorites={favorites} />
}
