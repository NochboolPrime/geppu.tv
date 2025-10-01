"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ImageUpload } from "./image-upload"
import { LogOut, Pencil, Trash2, Plus, X } from "lucide-react"
import { Checkbox } from "@/components/ui/checkbox"

type Release = {
  id: number
  title: string
  title_ru: string
  description: string
  cover_image_url: string
  year: number
  season: string
  total_episodes: number
  status: string
  genres: string[]
  rating: string
  featured?: boolean
  featured_order?: number
}

type Episode = {
  id: number
  release_id: number
  episode_number: number
  title: string
  vk_video_url: string
  thumbnail_url?: string
  duration?: number
  release_date: string
}

export function AdminDashboard() {
  const router = useRouter()
  const [releaseForm, setReleaseForm] = useState({
    title: "",
    title_ru: "",
    description: "",
    cover_image_url: "",
    year: new Date().getFullYear().toString(),
    season: "summer",
    total_episodes: "",
    status: "ongoing",
    genres: "",
    rating: "16+",
    featured: false,
    featured_order: "0",
  })

  const [episodeForm, setEpisodeForm] = useState({
    release_id: "",
    episode_number: "",
    title: "",
    vk_video_url: "",
    thumbnail_url: "",
    duration: "",
    release_date: new Date().toISOString().split("T")[0],
  })

  const [loading, setLoading] = useState(false)
  const [releases, setReleases] = useState<Release[]>([])
  const [editingRelease, setEditingRelease] = useState<Release | null>(null)
  const [selectedRelease, setSelectedRelease] = useState<Release | null>(null)
  const [episodes, setEpisodes] = useState<Episode[]>([])
  const [editingEpisode, setEditingEpisode] = useState<Episode | null>(null)

  useEffect(() => {
    fetchReleases()
  }, [])

  const fetchReleases = async () => {
    try {
      const response = await fetch("/api/admin/releases")
      const data = await response.json()
      if (response.ok) {
        setReleases(data.releases)
      }
    } catch (error) {
      console.error("Fetch releases error:", error)
    }
  }

  const fetchEpisodes = async (releaseId: number) => {
    try {
      const response = await fetch(`/api/admin/episodes?releaseId=${releaseId}`)
      const data = await response.json()
      if (response.ok) {
        setEpisodes(data.episodes)
      }
    } catch (error) {
      console.error("Fetch episodes error:", error)
    }
  }

  const handleLogout = async () => {
    await fetch("/api/admin/logout", { method: "POST" })
    router.refresh()
  }

  const handleCreateRelease = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await fetch("/api/admin/releases", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...releaseForm,
          genres: releaseForm.genres.split(",").map((g) => g.trim()),
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error)
      }

      alert("Релиз успешно создан!")
      setReleaseForm({
        title: "",
        title_ru: "",
        description: "",
        cover_image_url: "",
        year: new Date().getFullYear().toString(),
        season: "summer",
        total_episodes: "",
        status: "ongoing",
        genres: "",
        rating: "16+",
        featured: false,
        featured_order: "0",
      })
      fetchReleases()
    } catch (error) {
      console.error("Create release error:", error)
      alert("Ошибка создания релиза")
    } finally {
      setLoading(false)
    }
  }

  const handleUpdateRelease = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!editingRelease) return
    setLoading(true)

    try {
      const response = await fetch("/api/admin/releases", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: editingRelease.id,
          ...releaseForm,
          genres: releaseForm.genres.split(",").map((g) => g.trim()),
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error)
      }

      alert("Релиз успешно обновлён!")
      setEditingRelease(null)
      setReleaseForm({
        title: "",
        title_ru: "",
        description: "",
        cover_image_url: "",
        year: new Date().getFullYear().toString(),
        season: "summer",
        total_episodes: "",
        status: "ongoing",
        genres: "",
        rating: "16+",
        featured: false,
        featured_order: "0",
      })
      fetchReleases()
    } catch (error) {
      console.error("Update release error:", error)
      alert("Ошибка обновления релиза")
    } finally {
      setLoading(false)
    }
  }

  const handleDeleteRelease = async (id: number) => {
    if (!confirm("Вы уверены, что хотите удалить этот релиз? Все эпизоды также будут удалены.")) {
      return
    }

    try {
      const response = await fetch(`/api/admin/releases?id=${id}`, {
        method: "DELETE",
      })

      if (!response.ok) {
        throw new Error("Ошибка удаления")
      }

      alert("Релиз успешно удалён!")
      fetchReleases()
      if (selectedRelease?.id === id) {
        setSelectedRelease(null)
        setEpisodes([])
      }
    } catch (error) {
      console.error("Delete release error:", error)
      alert("Ошибка удаления релиза")
    }
  }

  const handleEditRelease = (release: Release) => {
    setEditingRelease(release)
    setReleaseForm({
      title: release.title,
      title_ru: release.title_ru,
      description: release.description,
      cover_image_url: release.cover_image_url,
      year: release.year.toString(),
      season: release.season,
      total_episodes: release.total_episodes.toString(),
      status: release.status,
      genres: release.genres.join(", "),
      rating: release.rating,
      featured: release.featured || false,
      featured_order: (release.featured_order || 0).toString(),
    })
  }

  const handleCreateEpisode = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await fetch("/api/admin/episodes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(episodeForm),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error)
      }

      alert("Эпизод успешно добавлен!")
      setEpisodeForm({
        ...episodeForm,
        episode_number: (Number.parseInt(episodeForm.episode_number) + 1).toString(),
        title: "",
        vk_video_url: "",
        thumbnail_url: "",
      })
      if (selectedRelease) {
        fetchEpisodes(selectedRelease.id)
      }
    } catch (error) {
      console.error("Create episode error:", error)
      alert("Ошибка добавления эпизода")
    } finally {
      setLoading(false)
    }
  }

  const handleUpdateEpisode = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!editingEpisode) return
    setLoading(true)

    try {
      const response = await fetch("/api/admin/episodes", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: editingEpisode.id,
          ...episodeForm,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error)
      }

      alert("Эпизод успешно обновлён!")
      setEditingEpisode(null)
      setEpisodeForm({
        release_id: selectedRelease?.id.toString() || "",
        episode_number: "",
        title: "",
        vk_video_url: "",
        thumbnail_url: "",
        duration: "",
        release_date: new Date().toISOString().split("T")[0],
      })
      if (selectedRelease) {
        fetchEpisodes(selectedRelease.id)
      }
    } catch (error) {
      console.error("Update episode error:", error)
      alert("Ошибка обновления эпизода")
    } finally {
      setLoading(false)
    }
  }

  const handleDeleteEpisode = async (id: number) => {
    if (!confirm("Вы уверены, что хотите удалить этот эпизод?")) {
      return
    }

    try {
      const response = await fetch(`/api/admin/episodes?id=${id}`, {
        method: "DELETE",
      })

      if (!response.ok) {
        throw new Error("Ошибка удаления")
      }

      alert("Эпизод успешно удалён!")
      if (selectedRelease) {
        fetchEpisodes(selectedRelease.id)
      }
    } catch (error) {
      console.error("Delete episode error:", error)
      alert("Ошибка удаления эпизода")
    }
  }

  const handleEditEpisode = (episode: Episode) => {
    setEditingEpisode(episode)
    setEpisodeForm({
      release_id: episode.release_id.toString(),
      episode_number: episode.episode_number.toString(),
      title: episode.title,
      vk_video_url: episode.vk_video_url,
      thumbnail_url: episode.thumbnail_url || "",
      duration: episode.duration?.toString() || "",
      release_date: episode.release_date,
    })
  }

  const handleSelectRelease = (release: Release) => {
    setSelectedRelease(release)
    setEpisodeForm({
      ...episodeForm,
      release_id: release.id.toString(),
    })
    fetchEpisodes(release.id)
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container px-4 py-8 space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Админ панель</h1>
            <p className="text-muted-foreground">Управление релизами и эпизодами</p>
          </div>
          <Button variant="outline" onClick={handleLogout} className="gap-2 bg-transparent">
            <LogOut className="h-4 w-4" />
            Выйти
          </Button>
        </div>

        <Tabs defaultValue="releases" className="w-full">
          <TabsList className="grid w-full max-w-md grid-cols-3">
            <TabsTrigger value="releases">Релизы</TabsTrigger>
            <TabsTrigger value="manage">Управление</TabsTrigger>
            <TabsTrigger value="carousel">Карусель</TabsTrigger>
          </TabsList>

          <TabsContent value="releases" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>{editingRelease ? "Редактировать релиз" : "Добавить новый релиз"}</CardTitle>
                <CardDescription>
                  {editingRelease ? "Обновите информацию о релизе" : "Создайте новый аниме релиз"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={editingRelease ? handleUpdateRelease : handleCreateRelease} className="space-y-4">
                  {editingRelease && (
                    <div className="flex items-center justify-between p-3 bg-primary/10 rounded-lg">
                      <span className="text-sm font-medium">Редактирование: {editingRelease.title_ru}</span>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          setEditingRelease(null)
                          setReleaseForm({
                            title: "",
                            title_ru: "",
                            description: "",
                            cover_image_url: "",
                            year: new Date().getFullYear().toString(),
                            season: "summer",
                            total_episodes: "",
                            status: "ongoing",
                            genres: "",
                            rating: "16+",
                            featured: false,
                            featured_order: "0",
                          })
                        }}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="title">Название (English)</Label>
                      <Input
                        id="title"
                        value={releaseForm.title}
                        onChange={(e) => setReleaseForm({ ...releaseForm, title: e.target.value })}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="title_ru">Название (Русский)</Label>
                      <Input
                        id="title_ru"
                        value={releaseForm.title_ru}
                        onChange={(e) => setReleaseForm({ ...releaseForm, title_ru: e.target.value })}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">Описание</Label>
                    <Textarea
                      id="description"
                      value={releaseForm.description}
                      onChange={(e) => setReleaseForm({ ...releaseForm, description: e.target.value })}
                      rows={4}
                      required
                    />
                  </div>

                  <ImageUpload
                    label="Обложка"
                    onUpload={(url) => setReleaseForm({ ...releaseForm, cover_image_url: url })}
                    currentImage={releaseForm.cover_image_url}
                  />

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="year">Год</Label>
                      <Input
                        id="year"
                        type="number"
                        value={releaseForm.year}
                        onChange={(e) => setReleaseForm({ ...releaseForm, year: e.target.value })}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="season">Сезон</Label>
                      <Select
                        value={releaseForm.season}
                        onValueChange={(v) => setReleaseForm({ ...releaseForm, season: v })}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="winter">Зима</SelectItem>
                          <SelectItem value="spring">Весна</SelectItem>
                          <SelectItem value="summer">Лето</SelectItem>
                          <SelectItem value="fall">Осень</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="total_episodes">Всего эпизодов</Label>
                      <Input
                        id="total_episodes"
                        type="number"
                        value={releaseForm.total_episodes}
                        onChange={(e) => setReleaseForm({ ...releaseForm, total_episodes: e.target.value })}
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="status">Статус</Label>
                      <Select
                        value={releaseForm.status}
                        onValueChange={(v) => setReleaseForm({ ...releaseForm, status: v })}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="ongoing">Онгоинг</SelectItem>
                          <SelectItem value="completed">Завершён</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="rating">Рейтинг</Label>
                      <Input
                        id="rating"
                        value={releaseForm.rating}
                        onChange={(e) => setReleaseForm({ ...releaseForm, rating: e.target.value })}
                        placeholder="16+"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="genres">Жанры (через запятую)</Label>
                      <Input
                        id="genres"
                        value={releaseForm.genres}
                        onChange={(e) => setReleaseForm({ ...releaseForm, genres: e.target.value })}
                        placeholder="Экшен, Фэнтези"
                        required
                      />
                    </div>
                  </div>

                  <Button type="submit" disabled={loading || !releaseForm.cover_image_url}>
                    {loading
                      ? editingRelease
                        ? "Обновление..."
                        : "Создание..."
                      : editingRelease
                        ? "Обновить релиз"
                        : "Создать релиз"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="manage" className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle>Список релизов</CardTitle>
                  <CardDescription>Выберите релиз для управления эпизодами</CardDescription>
                </CardHeader>
                <CardContent className="space-y-2 max-h-[600px] overflow-y-auto">
                  {releases.map((release) => (
                    <div
                      key={release.id}
                      className={`flex items-center justify-between p-3 rounded-lg border cursor-pointer transition-colors ${
                        selectedRelease?.id === release.id ? "bg-primary/10 border-primary" : "hover:bg-muted"
                      }`}
                      onClick={() => handleSelectRelease(release)}
                    >
                      <div className="flex items-center gap-3 flex-1">
                        <img
                          src={release.cover_image_url || "/placeholder.svg"}
                          alt={release.title_ru}
                          className="w-12 h-16 object-cover rounded"
                        />
                        <div className="flex-1 min-w-0">
                          <p className="font-medium truncate">{release.title_ru}</p>
                          <p className="text-sm text-muted-foreground">ID: {release.id}</p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation()
                            handleEditRelease(release)
                          }}
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation()
                            handleDeleteRelease(release.id)
                          }}
                        >
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>{selectedRelease ? `Эпизоды: ${selectedRelease.title_ru}` : "Выберите релиз"}</CardTitle>
                  <CardDescription>
                    {selectedRelease ? "Управление эпизодами выбранного релиза" : "Выберите релиз слева"}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {selectedRelease && (
                    <>
                      <form
                        onSubmit={editingEpisode ? handleUpdateEpisode : handleCreateEpisode}
                        className="space-y-4 p-4 border rounded-lg"
                      >
                        <h3 className="font-semibold">{editingEpisode ? "Редактировать эпизод" : "Добавить эпизод"}</h3>

                        {editingEpisode && (
                          <div className="flex items-center justify-between p-2 bg-primary/10 rounded">
                            <span className="text-sm">Редактирование эпизода #{editingEpisode.episode_number}</span>
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              onClick={() => {
                                setEditingEpisode(null)
                                setEpisodeForm({
                                  release_id: selectedRelease.id.toString(),
                                  episode_number: "",
                                  title: "",
                                  vk_video_url: "",
                                  thumbnail_url: "",
                                  duration: "",
                                  release_date: new Date().toISOString().split("T")[0],
                                })
                              }}
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                        )}

                        <div className="grid grid-cols-2 gap-3">
                          <div className="space-y-2">
                            <Label htmlFor="ep_number">Номер</Label>
                            <Input
                              id="ep_number"
                              type="number"
                              value={episodeForm.episode_number}
                              onChange={(e) => setEpisodeForm({ ...episodeForm, episode_number: e.target.value })}
                              required
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="ep_date">Дата</Label>
                            <Input
                              id="ep_date"
                              type="date"
                              value={episodeForm.release_date}
                              onChange={(e) => setEpisodeForm({ ...episodeForm, release_date: e.target.value })}
                              required
                            />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="ep_title">Название (опционально)</Label>
                          <Input
                            id="ep_title"
                            value={episodeForm.title}
                            onChange={(e) => setEpisodeForm({ ...episodeForm, title: e.target.value })}
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="ep_vk">VK Video URL</Label>
                          <Input
                            id="ep_vk"
                            value={episodeForm.vk_video_url}
                            onChange={(e) => setEpisodeForm({ ...episodeForm, vk_video_url: e.target.value })}
                            placeholder="https://vk.com/video-123_456"
                            required
                          />
                        </div>

                        <Button type="submit" disabled={loading} className="w-full">
                          <Plus className="h-4 w-4 mr-2" />
                          {loading ? "Сохранение..." : editingEpisode ? "Обновить" : "Добавить"}
                        </Button>
                      </form>

                      <div className="space-y-2 max-h-[400px] overflow-y-auto">
                        <h3 className="font-semibold">Список эпизодов ({episodes.length})</h3>
                        {episodes.map((episode) => (
                          <div
                            key={episode.id}
                            className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted"
                          >
                            <div>
                              <p className="font-medium">Эпизод {episode.episode_number}</p>
                              <p className="text-sm text-muted-foreground">{episode.title || "Без названия"}</p>
                              <p className="text-xs text-muted-foreground">{episode.release_date}</p>
                            </div>
                            <div className="flex gap-2">
                              <Button variant="ghost" size="sm" onClick={() => handleEditEpisode(episode)}>
                                <Pencil className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="sm" onClick={() => handleDeleteEpisode(episode.id)}>
                                <Trash2 className="h-4 w-4 text-destructive" />
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="carousel" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Управление каруселью</CardTitle>
                <CardDescription>
                  Выберите релизы для отображения в главной карусели. Отметьте "В карусели" и установите порядок.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3 max-h-[700px] overflow-y-auto">
                {releases.map((release) => (
                  <div key={release.id} className="flex items-center gap-4 p-4 border rounded-lg">
                    <img
                      src={release.cover_image_url || "/placeholder.svg"}
                      alt={release.title_ru}
                      className="w-16 h-20 object-cover rounded"
                    />
                    <div className="flex-1">
                      <p className="font-medium">{release.title_ru}</p>
                      <p className="text-sm text-muted-foreground">{release.title}</p>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2">
                        <Checkbox
                          id={`featured-${release.id}`}
                          checked={release.featured || false}
                          onCheckedChange={async (checked) => {
                            try {
                              await fetch("/api/admin/releases", {
                                method: "PUT",
                                headers: { "Content-Type": "application/json" },
                                body: JSON.stringify({
                                  id: release.id,
                                  ...release,
                                  featured: checked,
                                }),
                              })
                              fetchReleases()
                            } catch (error) {
                              console.error("Update featured error:", error)
                            }
                          }}
                        />
                        <Label htmlFor={`featured-${release.id}`} className="cursor-pointer">
                          В карусели
                        </Label>
                      </div>
                      <div className="flex items-center gap-2">
                        <Label htmlFor={`order-${release.id}`} className="text-sm">
                          Порядок:
                        </Label>
                        <Input
                          id={`order-${release.id}`}
                          type="number"
                          value={release.featured_order || 0}
                          onChange={async (e) => {
                            try {
                              await fetch("/api/admin/releases", {
                                method: "PUT",
                                headers: { "Content-Type": "application/json" },
                                body: JSON.stringify({
                                  id: release.id,
                                  ...release,
                                  featured_order: Number.parseInt(e.target.value) || 0,
                                }),
                              })
                              fetchReleases()
                            } catch (error) {
                              console.error("Update order error:", error)
                            }
                          }}
                          className="w-20"
                          min="0"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
