import { Button } from "@/components/ui/button"
import HomeNav from "./HomeNav"

const HomeHeader = () => {
  return <div className="max-w-7xl mx-auto w-full">
    <div className="flex items-center justify-between">
      <div className="flex items-center">
        <div>Coolor</div>
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
