import { checkAdminAuth } from "@/lib/admin-auth"
import { AdminLogin } from "@/components/admin-login"
import { AdminDashboard } from "@/components/admin-dashboard"

export default async function AdminPage() {
  const isAdmin = await checkAdminAuth()

  if (!isAdmin) {
    return <AdminLogin />
  }

  return <AdminDashboard />
}
