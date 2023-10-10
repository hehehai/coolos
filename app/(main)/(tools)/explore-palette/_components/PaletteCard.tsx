import { memo } from "react"
import { Palette } from "@prisma/client"
import { MoreHorizontal } from "lucide-react"

import { cn } from "@/lib/utils"

import PaletteColorItem from "./PaletteColorItem"

interface PaletteCardProps extends React.ComponentPropsWithoutRef<"div"> {
  palette: Palette
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
              hexString={color}
              className="first:rounded-l-xl last:rounded-r-xl"
            />
          ))}
        </div>
        <div className="flex items-center justify-between space-x-2 py-1">
          <div className="text-sm text-slate-900">{palette.name}</div>
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
