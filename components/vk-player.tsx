"use client"

import { useEffect, useRef } from "react"

interface VKPlayerProps {
  videoUrl: string
  className?: string
}

export function VKPlayer({ videoUrl, className = "" }: VKPlayerProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return

    // Extract video ID from VK URL
    // Expected format: https://vk.com/video-XXXXXXX_YYYYYYYYY or similar
    const videoId = extractVKVideoId(videoUrl)

    if (videoId) {
      // Create iframe for VK video
      const iframe = document.createElement("iframe")
      iframe.src = `https://vk.com/video_ext.php?${videoId}`
      iframe.width = "100%"
      iframe.height = "100%"
      iframe.allow = "autoplay; encrypted-media; fullscreen; picture-in-picture; screen-wake-lock;"
      iframe.frameBorder = "0"
      iframe.allowFullscreen = true
      iframe.style.position = "absolute"
      iframe.style.top = "0"
      iframe.style.left = "0"

      containerRef.current.innerHTML = ""
      containerRef.current.appendChild(iframe)
    }
  }, [videoUrl])

  return <div ref={containerRef} className={`relative w-full aspect-video bg-black ${className}`} />
}

function extractVKVideoId(url: string): string {
  // Handle different VK video URL formats
  // Format 1: https://vk.com/video-XXXXXXX_YYYYYYYYY
  // Format 2: https://vk.com/video_ext.php?oid=-XXXXXXX&id=YYYYYYYYY
  // Format 3: Direct video ID: oid=-XXXXXXX&id=YYYYYYYYY

  if (url.includes("video_ext.php")) {
    const urlParams = new URLSearchParams(url.split("?")[1])
    return url.split("?")[1] || ""
  }

  if (url.includes("oid=") && url.includes("id=")) {
    return url
  }

  const match = url.match(/video(-?\d+)_(\d+)/)
  if (match) {
    return `oid=${match[1]}&id=${match[2]}`
  }

  return url
}
