"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Camera, UserIcon, Mail, Calendar, ListPlus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"

interface User {
  id: number
  email: string
  username: string
  avatar_url?: string
  created_at: string
}

interface Release {
  id: number
  title_ru: string
  cover_image_url: string
  year: number
  season: string
  status: string
}

interface ProfileContentProps {
  user: User
}

const LIST_STATUSES = [
  { value: "watching", label: "Смотрю", color: "bg-green-500" },
  { value: "completed", label: "Просмотренно", color: "bg-blue-500" },
  { value: "on_hold", label: "Отложенно", color: "bg-yellow-500" },
  { value: "dropped", label: "Брошено", color: "bg-red-500" },
  { value: "planned", label: "Запланированно", color: "bg-purple-500" },
]

export function ProfileContent({ user }: ProfileContentProps) {
  const router = useRouter()
  const [username, setUsername] = useState(user.username)
  const [avatarUrl, setAvatarUrl] = useState(user.avatar_url || "")
  const [loading, setLoading] = useState(false)
  const [uploadingAvatar, setUploadingAvatar] = useState(false)
  const [selectedStatus, setSelectedStatus] = useState<string>("watching")
  const [lists, setLists] = useState<Release[]>([])
  const [listCounts, setListCounts] = useState<Record<string, number>>({})
  const [loadingLists, setLoadingLists] = useState(true)

  useEffect(() => {
    fetchListCounts()
    fetchLists(selectedStatus)
  }, [selectedStatus])

  const fetchListCounts = async () => {
    try {
      const response = await fetch("/api/user/lists?countsOnly=true")
      const data = await response.json()
      const counts: Record<string, number> = {}
      data.counts.forEach((item: { status: string; count: string }) => {
        counts[item.status] = Number.parseInt(item.count)
      })
      setListCounts(counts)
    } catch (error) {
      console.error("Failed to fetch list counts:", error)
    }
  }

  const fetchLists = async (status: string) => {
    setLoadingLists(true)
    try {
      const response = await fetch(`/api/user/lists?status=${status}`)
      const data = await response.json()
      setLists(data.lists)
    } catch (error) {
      console.error("Failed to fetch lists:", error)
    } finally {
      setLoadingLists(false)
    }
  }

  const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setUploadingAvatar(true)

    try {
      const formData = new FormData()
      formData.append("file", file)

      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Upload failed")
      }

      setAvatarUrl(data.url)

      // Update profile with new avatar
      await fetch("/api/user/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ avatar_url: data.url }),
      })

      router.refresh()
    } catch (error) {
      console.error("Avatar upload error:", error)
      alert("Ошибка загрузки аватара")
    } finally {
      setUploadingAvatar(false)
    }
  }

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await fetch("/api/user/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error)
      }

      alert("Профиль обновлён!")
      router.refresh()
    } catch (error) {
      console.error("Update profile error:", error)
      alert("Ошибка обновления профиля")
    } finally {
      setLoading(false)
    }
  }

  const currentStatusInfo = LIST_STATUSES.find((s) => s.value === selectedStatus)

  return (
    <main className="min-h-screen bg-background">
      <div className="mx-auto max-w-7xl px-4 py-8 space-y-8">
        <div className="flex flex-col md:flex-row gap-8">
          <Card className="md:w-80 shrink-0">
            <CardHeader>
              <div className="flex flex-col items-center space-y-4">
                <div className="relative">
                  <Avatar className="h-32 w-32">
                    <AvatarImage src={avatarUrl || "/placeholder.svg"} alt={username} />
                    <AvatarFallback className="text-4xl">{username[0].toUpperCase()}</AvatarFallback>
                  </Avatar>
                  <label
                    htmlFor="avatar-upload"
                    className="absolute bottom-0 right-0 h-10 w-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center cursor-pointer hover:bg-primary/90 transition-colors"
                  >
                    <Camera className="h-5 w-5" />
                    <input
                      id="avatar-upload"
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleAvatarUpload}
                      disabled={uploadingAvatar}
                    />
                  </label>
                </div>
                <div className="text-center">
                  <h2 className="text-2xl font-bold">{username}</h2>
                  <p className="text-sm text-muted-foreground">{user.email}</p>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <Mail className="h-4 w-4" />
                <span>{user.email}</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <Calendar className="h-4 w-4" />
                <span>Регистрация: {new Date(user.created_at).toLocaleDateString("ru-RU")}</span>
              </div>
            </CardContent>
          </Card>

          <div className="flex-1">
            <Tabs defaultValue="lists" className="w-full">
              <TabsList className="grid w-full max-w-md grid-cols-2">
                <TabsTrigger value="lists">Мои списки</TabsTrigger>
                <TabsTrigger value="settings">Настройки</TabsTrigger>
              </TabsList>

              <TabsContent value="lists" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <ListPlus className="h-5 w-5" />
                      Мои списки аниме
                    </CardTitle>
                    <CardDescription>Управляйте своими списками просмотра</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="flex flex-wrap gap-2">
                      {LIST_STATUSES.map((status) => (
                        <Button
                          key={status.value}
                          variant={selectedStatus === status.value ? "default" : "outline"}
                          size="sm"
                          onClick={() => setSelectedStatus(status.value)}
                          className="gap-2"
                        >
                          {status.label}
                          <Badge variant="secondary" className="ml-1">
                            {listCounts[status.value] || 0}
                          </Badge>
                        </Button>
                      ))}
                    </div>

                    {loadingLists ? (
                      <div className="text-center py-12">
                        <p className="text-muted-foreground">Загрузка...</p>
                      </div>
                    ) : lists.length === 0 ? (
                      <div className="text-center py-12">
                        <ListPlus className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                        <p className="text-muted-foreground mb-2">
                          В списке "{currentStatusInfo?.label}" пока нет релизов
                        </p>
                        <Button asChild className="mt-4">
                          <Link href="/catalog">Найти аниме</Link>
                        </Button>
                      </div>
                    ) : (
                      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                        {lists.map((release) => (
                          <Link
                            key={release.id}
                            href={`/release/${release.id}`}
                            className="group relative block overflow-hidden rounded-lg"
                          >
                            <div className="aspect-[2/3] relative overflow-hidden bg-muted">
                              <Image
                                src={release.cover_image_url || "/placeholder.svg"}
                                alt={release.title_ru}
                                fill
                                className="object-cover transition-transform duration-300 group-hover:scale-110"
                              />
                              <div
                                className={`absolute top-2 right-2 h-3 w-3 rounded-full ${currentStatusInfo?.color}`}
                              />
                            </div>
                            <div className="mt-2 space-y-1">
                              <h3 className="font-medium line-clamp-2 text-sm">{release.title_ru}</h3>
                              <p className="text-xs text-muted-foreground">
                                {release.season} {release.year}
                              </p>
                            </div>
                          </Link>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="settings" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Настройки профиля</CardTitle>
                    <CardDescription>Обновите информацию о вашем профиле</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleUpdateProfile} className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="username">Имя пользователя</Label>
                        <div className="flex items-center gap-2">
                          <UserIcon className="h-4 w-4 text-muted-foreground" />
                          <Input
                            id="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                            disabled={loading}
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <div className="flex items-center gap-2">
                          <Mail className="h-4 w-4 text-muted-foreground" />
                          <Input id="email" value={user.email} disabled />
                        </div>
                        <p className="text-xs text-muted-foreground">Email нельзя изменить</p>
                      </div>
                      <Button type="submit" disabled={loading}>
                        {loading ? "Сохранение..." : "Сохранить изменения"}
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </main>
  )
}
