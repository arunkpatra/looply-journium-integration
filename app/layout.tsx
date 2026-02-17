import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import "./globals.css"
import { StoreProvider } from "@/lib/store"
import { Toaster } from "sonner"

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
  display: "swap",
  preload: true,
})

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
  display: "swap",
  preload: true,
})

export const metadata: Metadata = {
  title: "Looply - Habit & Wellness Tracker",
  description: "Build better habits, track your wellness journey",
  generator: "looply.app",
  icons: {
    icon: [
      {
        url: "/looply-icon-light-32x32.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/looply-icon-dark-32x32.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/looply_logo_1024.svg",
        type: "image/svg+xml",
      },
    ],
    apple: "/apple-icon.png",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${geist.variable} ${geistMono.variable}`} suppressHydrationWarning>
      <body className={`${geist.className} antialiased`}>

          <StoreProvider>
            <Toaster />
            {children}
          </StoreProvider>

      </body>
    </html>
  )
}
