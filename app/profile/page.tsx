import { redirect } from "next/navigation"
import { getSession } from "@/lib/auth"
import { ProfileContent } from "@/components/profile-content"

export default async function ProfilePage() {
  const user = await getSession()

  if (!user) {
    redirect("/")
  }

  return <ProfileContent user={user} />
}
