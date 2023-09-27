import { memo } from "react"
import { MoreHorizontal } from "lucide-react"

import { cn } from "@/lib/utils"
import { generateColor } from "@/components/shared/color-picker"

import PaletteColorItem from "./PaletteColorItem"

interface PaletteCardProps extends React.ComponentPropsWithoutRef<"div"> {
  palette: {
    colors: string[]
    likes: number
  }
  paletteClassname?: string
}

const PaletteCard = memo(
  ({ palette, className, paletteClassname }: PaletteCardProps) => {
    return (
      <div className={cn(className)}>
        <div className={cn("flex h-full items-stretch", paletteClassname)}>
          {palette.colors.map((color, idx) => (
            <PaletteColorItem
              key={idx}
              color={generateColor(color)}
              className="first:rounded-l-xl last:rounded-r-xl"
            />
          ))}
        </div>
        <div className="flex items-center justify-between space-x-2 py-1">
          <div className="text-sm text-slate-900">{palette.likes}</div>
          <div>
            <MoreHorizontal />
          </div>
        </div>
      </div>
    )
  }
)

PaletteCard.displayName = "PaletteCard"

export default PaletteCard
