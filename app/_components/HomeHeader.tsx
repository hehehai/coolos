import { Button } from "@/components/ui/button"
import HomeNav from "./HomeNav"

import { Inter } from 'next/font/google'
import { cn } from "@/lib/utils"

const inter = Inter({ subsets: ['latin'] })

const HomeHeader = () => {
  return <div className={cn("max-w-7xl mx-auto w-full", inter.className)}>
    <div className="flex items-center justify-between">
      <div className="flex items-center">
        <div className="text-2xl font-bold">Coolor</div>
        <div className="ml-20">
          <HomeNav />
        </div>
      </div>
      <div className="flex items-center space-x-3">
        <Button>Login</Button>
      </div>
    </div>
  </div>
}

HomeHeader.displayName = 'HomeHeader'

export default HomeHeader
