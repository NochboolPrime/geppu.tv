"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Camera, UserIcon, Mail, Calendar, Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

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
}

interface ProfileContentProps {
  user: User
  initialFavorites: Release[]
}

export function ProfileContent({ user, initialFavorites }: ProfileContentProps) {
  const router = useRouter()
  const [username, setUsername] = useState(user.username)
  const [avatarUrl, setAvatarUrl] = useState(user.avatar_url || "")
  const [loading, setLoading] = useState(false)
  const [uploadingAvatar, setUploadingAvatar] = useState(false)

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

  return (
    <main className="min-h-screen bg-background">
      <div className="container px-4 py-8 space-y-8">
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
            <Tabs defaultValue="favorites" className="w-full">
              <TabsList className="grid w-full max-w-md grid-cols-2">
                <TabsTrigger value="favorites">Избранное</TabsTrigger>
                <TabsTrigger value="settings">Настройки</TabsTrigger>
              </TabsList>

              <TabsContent value="favorites" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Heart className="h-5 w-5" />
                      Избранные релизы
                    </CardTitle>
                    <CardDescription>Ваши любимые аниме</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {initialFavorites.length === 0 ? (
                      <div className="text-center py-12">
                        <Heart className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                        <p className="text-muted-foreground">У вас пока нет избранных релизов</p>
                        <Button asChild className="mt-4">
                          <Link href="/">Найти аниме</Link>
                        </Button>
                      </div>
                    ) : (
                      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                        {initialFavorites.map((release) => (
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
