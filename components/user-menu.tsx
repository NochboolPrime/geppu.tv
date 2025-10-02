"use client"

import { useState } from "react"
import { User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Link from "next/link"
import { AuthDialog } from "./auth-dialog"

interface UserMenuProps {
  user: {
    id: number
    username: string
    email: string
    avatar_url?: string
  } | null
}

export function UserMenu({ user }: UserMenuProps) {
  const [authDialogOpen, setAuthDialogOpen] = useState(false)

  if (!user) {
    return (
      <>
        <Button variant="ghost" size="icon" onClick={() => setAuthDialogOpen(true)}>
          <User className="h-5 w-5" />
        </Button>
        <AuthDialog open={authDialogOpen} onOpenChange={setAuthDialogOpen} />
      </>
    )
  }

  return (
    <Link href="/profile">
      <Button variant="ghost" size="icon" className="rounded-full">
        <Avatar className="h-8 w-8">
          <AvatarImage src={user.avatar_url || "/placeholder.svg"} alt={user.username} />
          <AvatarFallback>{user.username[0].toUpperCase()}</AvatarFallback>
        </Avatar>
      </Button>
    </Link>
  )
}
