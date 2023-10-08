import { Inter } from "next/font/google"

import { cn } from "@/lib/utils"

import HeaderAuth from "./HeaderAuth"
import HomeNav from "./HomeNav"

const inter = Inter({ subsets: ["latin"] })

const HomeHeader = ({ className }: { className?: string }) => {
  return (
    <div className={cn("w-full", inter.className, className)}>
      <div className="flex w-full items-center justify-between">
        <div className="text-2xl font-bold">
          <a href="/">Coolos</a>
        </div>
        <div className="flex items-center">
          <div className="mr-6">
            <HomeNav />
          </div>
          <HeaderAuth />
        </div>
      </div>
    </div>
  )
}

HomeHeader.displayName = "HomeHeader"

export default HomeHeader
