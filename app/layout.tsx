import "@/styles/globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "react-hot-toast";
import { ClerkProvider } from "@clerk/nextjs";
import { zhCN } from "@clerk/localizations";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Coolors",
  description: "fast color generator",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider localization={zhCN}>
      <html lang="en">
        <body className={inter.className}>
          <main>{children}</main>
          <Toaster
            toastOptions={{
              style: { borderRadius: "22.4px", padding: "8px 14px" },
            }}
          />
        </body>
      </html>
    </ClerkProvider>
  );
}
