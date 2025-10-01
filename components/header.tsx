"use client"

import Link from "next/link"
import Image from "next/image"
import { Search, Calendar, Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { UserMenu } from "./user-menu"
import { SearchDialog } from "./search-dialog"
import { useState } from "react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

interface HeaderProps {
  user: { id: number; email: string; username: string; avatar_url: string | null } | null
}

export function Header({ user }: HeaderProps) {
  const [searchOpen, setSearchOpen] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="mx-auto max-w-7xl flex h-14 md:h-16 items-center justify-between px-4">
          <div className="flex items-center gap-4 md:gap-8">
            <Link href="/" className="flex items-center gap-2">
              <Image src="/logo.png" alt="GEPPU" width={32} height={32} className="h-8 w-8 md:h-10 md:w-10" />
              <span className="text-lg md:text-xl font-bold text-primary">GEPPU.TV</span>
            </Link>
            <nav className="hidden md:flex items-center gap-6">
              <Link href="/" className="text-sm font-medium transition-colors hover:text-primary">
                Главная
              </Link>
              <Link href="/catalog" className="text-sm font-medium transition-colors hover:text-primary">
                Каталог
              </Link>
              <Link href="/schedule" className="text-sm font-medium transition-colors hover:text-primary">
                Расписание
              </Link>
            </nav>
          </div>
          <div className="flex items-center gap-1 md:gap-2">
            <Button variant="ghost" size="icon" onClick={() => setSearchOpen(true)} className="h-9 w-9">
              <Search className="h-4 w-4 md:h-5 md:w-5" />
            </Button>
            <Button variant="ghost" size="icon" asChild className="hidden md:flex h-9 w-9">
              <Link href="/schedule">
                <Calendar className="h-5 w-5" />
              </Link>
            </Button>
            <UserMenu user={user} />
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden h-9 w-9">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-64">
                <nav className="flex flex-col gap-4 mt-8">
                  <Link
                    href="/"
                    className="text-base font-medium transition-colors hover:text-primary"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Главная
                  </Link>
                  <Link
                    href="/catalog"
                    className="text-base font-medium transition-colors hover:text-primary"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Каталог
                  </Link>
                  <Link
                    href="/schedule"
                    className="text-base font-medium transition-colors hover:text-primary"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Расписание
                  </Link>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>
      <SearchDialog open={searchOpen} onOpenChange={setSearchOpen} />
    </>
  )
}
