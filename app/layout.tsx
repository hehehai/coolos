import "@/styles/globals.css"

import type { Metadata } from "next"
import { zhCN } from "@clerk/localizations"
import { ClerkProvider } from "@clerk/nextjs"
import { GeistSans } from "geist/font/sans"
import { Toaster } from "react-hot-toast"

export const metadata: Metadata = {
  title: "Coolos",
  description: "fast color generator",
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
          <main>{children}</main>
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
