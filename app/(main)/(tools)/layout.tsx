import HomeHeader from "@/app/_components/HomeHeader"

const ToolsLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <HomeHeader
        className="bg-background/95 supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 flex h-[60px] w-full items-center border-b border-zinc-200 pl-4 pr-6 backdrop-blur"
        showDashboard
      />
      <div className="flex-1">{children}</div>
    </>
  )
}

export default ToolsLayout
