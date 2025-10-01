import { Header } from "./header"
import { getSession } from "@/lib/auth"

export async function HeaderWrapper() {
  const user = await getSession()
  return <Header user={user} />
}
