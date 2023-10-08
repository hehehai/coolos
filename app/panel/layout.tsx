import HomeHeader from "../_components/HomeHeader"
import SideMenu from "./_components/SiderMenu"

const UserLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <HomeHeader className="flex h-[60px] items-center border-b border-zinc-200 pl-4 pr-6" />
      <div className="flex h-[calc(100vh-60px)] w-full">
        <div className="h-full w-56 shrink-0 border-r border-zinc-200">
          <SideMenu />
        </div>
        <div className="h-full w-full grow overflow-auto">{children}</div>
      </div>
    </div>
  )
}

export default UserLayout
