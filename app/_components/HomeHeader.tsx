import { cn } from "@/lib/utils"
import { Logo } from "@/components/shared/Logo"

import HeaderAuth from "./HeaderAuth"
import HomeNav from "./HomeNav"

const HomeHeader = ({
  className,
  showDashboard,
}: {
  className?: string
  showDashboard?: boolean
}) => {
  return (
    <div className={cn("w-full", className)}>
      <div className="flex w-full items-center justify-between">
        <div className="text-2xl font-bold">
          <a href="/">
            <Logo size="1.2em"></Logo>
          </a>
        </div>
        <div className="flex items-center">
          <div className="mr-6">
            <HomeNav showDashboard={showDashboard} />
          </div>
          <HeaderAuth />
        </div>
      </div>
    </div>
  )
}

HomeHeader.displayName = "HomeHeader"

export default HomeHeader
