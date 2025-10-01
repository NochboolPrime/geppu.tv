import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import { HeaderWrapper } from "@/components/header-wrapper"
import { Footer } from "@/components/footer"
import { Suspense } from "react"

export const metadata: Metadata = {
  title: "GEPPU.TV - Смотреть аниме онлайн",
  description: "Смотрите новые серии аниме онлайн на GEPPU.TV",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ru" className="dark">
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable} antialiased`}>
        <div className="flex flex-col min-h-screen">
          <Suspense fallback={<div>Loading...</div>}>
            <HeaderWrapper />
          </Suspense>
          <div className="flex-1">{children}</div>
          <Footer />
        </div>
        <Analytics />
      </body>
    </html>
  )
}
