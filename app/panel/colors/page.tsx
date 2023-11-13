import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

const PanelColorsPage = async () => {
  return (
    <div className="h-full w-full bg-slate-50 p-4">
      <div className="flex items-center justify-between">
        <div className="text-3xl font-bold text-slate-800">Colors</div>
        <div className="flex items-center space-x-2">
          <Input type="text" placeholder="Search name or hex" />
          <Button className="shrink-0">搜索</Button>
        </div>
      </div>
    </div>
  )
}

export default PanelColorsPage
