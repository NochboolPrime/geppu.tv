"use client"

import { useState } from "react"
import { User, LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useRouter } from "next/navigation"
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
  const router = useRouter()

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" })
    router.refresh()
  }

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
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="rounded-full">
          <Avatar className="h-8 w-8">
            <AvatarImage src={user.avatar_url || "/placeholder.svg"} alt={user.username} />
            <AvatarFallback>{user.username[0].toUpperCase()}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <div className="px-2 py-1.5">
          <p className="text-sm font-medium">{user.username}</p>
          <p className="text-xs text-muted-foreground">{user.email}</p>
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => router.push("/profile")}>
          <User className="mr-2 h-4 w-4" />
          Профиль
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleLogout}>
          <LogOut className="mr-2 h-4 w-4" />
          Выйти
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
