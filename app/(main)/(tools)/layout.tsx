import HomeHeader from "@/app/_components/HomeHeader"

const ToolsLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <HomeHeader className="flex h-[60px] items-center border-b border-zinc-200 pl-4 pr-6" />
      {children}
    </>
  )
}

export default ToolsLayout
