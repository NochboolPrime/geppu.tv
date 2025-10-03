"use client"

import { useState, useEffect } from "react"
import { ListPlus, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger } from "@/components/ui/select"
import { useRouter } from "next/navigation"

interface ListButtonProps {
  releaseId: number
  userId: number | null
}

const LIST_STATUSES = [
  { value: "watching", label: "Смотрю", color: "text-green-500" },
  { value: "completed", label: "Просмотренно", color: "text-blue-500" },
  { value: "on_hold", label: "Отложенно", color: "text-yellow-500" },
  { value: "dropped", label: "Брошено", color: "text-red-500" },
  { value: "planned", label: "Запланированно", color: "text-purple-500" },
]

export function ListButton({ releaseId, userId }: ListButtonProps) {
  const [currentStatus, setCurrentStatus] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  useEffect(() => {
    if (!userId) return

    const checkStatus = async () => {
      try {
        const response = await fetch(`/api/lists?releaseId=${releaseId}`)
        const data = await response.json()
        setCurrentStatus(data.status)
      } catch (error) {
        console.error("Failed to check list status:", error)
      }
    }

    checkStatus()
  }, [releaseId, userId])

  const handleStatusChange = async (value: string) => {
    if (!userId) {
      router.push("/")
      return
    }

    setLoading(true)
    try {
      if (value === "remove") {
        // Remove from list
        await fetch(`/api/lists?releaseId=${releaseId}`, {
          method: "DELETE",
        })
        setCurrentStatus(null)
      } else {
        // Add or update status
        await fetch("/api/lists", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ releaseId, status: value }),
        })
        setCurrentStatus(value)
      }
    } catch (error) {
      console.error("Failed to update list:", error)
    } finally {
      setLoading(false)
    }
  }

  const currentStatusLabel = LIST_STATUSES.find((s) => s.value === currentStatus)?.label

  return (
    <Select value={currentStatus || "none"} onValueChange={handleStatusChange} disabled={loading}>
      <SelectTrigger asChild>
        <Button size="lg" variant="outline" className="gap-2 bg-transparent min-w-[200px]">
          <ListPlus className="h-5 w-5" />
          <span>{currentStatusLabel || "Добавить в список"}</span>
        </Button>
      </SelectTrigger>
      <SelectContent position="popper" sideOffset={5} className="w-[200px]">
        <SelectItem value="none" disabled className="text-muted-foreground">
          Выберите статус
        </SelectItem>
        {LIST_STATUSES.map((status) => (
          <SelectItem key={status.value} value={status.value}>
            <div className="flex items-center justify-between w-full">
              <span className={currentStatus === status.value ? status.color : ""}>{status.label}</span>
              {currentStatus === status.value && <Check className="h-4 w-4 ml-2" />}
            </div>
          </SelectItem>
        ))}
        {currentStatus && (
          <SelectItem value="remove" className="text-destructive">
            Удалить из списка
          </SelectItem>
        )}
      </SelectContent>
    </Select>
  )
}
