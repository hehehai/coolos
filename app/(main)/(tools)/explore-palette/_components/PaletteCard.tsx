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
              style={
                {
                  "--item-width": `calc(100% / ${palette.colors.length})`,
                } as React.CSSProperties
              }
              className="first:rounded-l-xl first:shadow-[inset_rgba(0,_0,_0,_0.05)_1px_1px,_inset_rgba(0,_0,_0,_0.05)_0_-1px] last:rounded-r-xl last:shadow-[inset_rgba(0,_0,_0,_0.05)_-1px_1px,_inset_rgba(0,_0,_0,_0.05)_0_-1px] hover:w-[128px]"
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
