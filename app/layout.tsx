import "@/styles/globals.css"

import type { Metadata } from "next"
import { zhCN } from "@clerk/localizations"
import { ClerkProvider } from "@clerk/nextjs"
import { GeistSans } from "geist/font/sans"
import { Toaster } from "react-hot-toast"

import { siteConfig } from "@/config/site"

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  metadataBase: new URL(siteConfig.url),
  description: siteConfig.description,
  keywords: [
    "Coolos Color Picker",
    "Color Picker",
    "Color Palette",
    "Color Management",
    "Design Tools",
    "Color Schemes",
    "Digital Art Tools",
    "UI/UX Design",
    "Graphic Design",
    "Web Design",
    "Visual Design",
  ],
  authors: [
    {
      name: siteConfig.creator.name,
      url: siteConfig.creator.website,
    },
  ],
  creator: siteConfig.creator.name,
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
    creator: "@riverhohai",
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-icon.png",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider localization={zhCN}>
      <html lang="en">
        <body className={GeistSans.className}>
          <main className="relative flex min-h-screen flex-col">
            {children}
          </main>
          <Toaster
            toastOptions={{
              style: { borderRadius: "22.4px", padding: "8px 14px" },
            }}
          />
        </body>
      </html>
    </ClerkProvider>
  )
}
