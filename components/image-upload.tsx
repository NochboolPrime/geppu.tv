"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface ImageUploadProps {
  onUpload: (url: string) => void
  label?: string
  currentImage?: string
}

export function ImageUpload({ onUpload, label = "Загрузить изображение", currentImage }: ImageUploadProps) {
  const [uploading, setUploading] = useState(false)
  const [preview, setPreview] = useState<string | null>(null)

  useEffect(() => {
    if (currentImage) {
      setPreview(currentImage)
    }
  }, [currentImage])

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setUploading(true)

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

      setPreview(data.url)
      onUpload(data.url)
    } catch (error) {
      console.error("Upload error:", error)
      alert("Ошибка загрузки изображения")
    } finally {
      setUploading(false)
    }
  }

  return (
    <div className="space-y-2">
      <Label>{label}</Label>
      <div className="flex items-center gap-4">
        <Input type="file" accept="image/*" onChange={handleFileChange} disabled={uploading} className="flex-1" />
        {uploading && <span className="text-sm text-muted-foreground">Загрузка...</span>}
      </div>
      {preview && (
        <div className="mt-2">
          <img src={preview || "/placeholder.svg"} alt="Preview" className="h-32 w-auto rounded-lg object-cover" />
        </div>
      )}
    </div>
  )
}
