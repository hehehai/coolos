"use client"

import { memo } from "react"

import { cn } from "@/lib/utils"
import { Color } from "@/components/shared/color-picker"
import ColorPicker from "@/components/shared/color-picker/ColorPicker"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

export interface PaletteBlockValueProps
  extends Omit<React.ComponentPropsWithoutRef<"div">, "color" | "onChange"> {
  color: Color
  onChange?: (color: Color) => void
}

const PaletteBlockValue = memo(
  ({ color, onChange, className, ...props }: PaletteBlockValueProps) => {
    return (
      <Popover>
        <PopoverTrigger>
          <div
            {...props}
            className={cn(
              "rounded-lg px-3 py-2 text-3xl font-medium uppercase tabular-nums leading-none hover:bg-gray-500/10",
              className
            )}
          >
            {color.toHex()}
          </div>
        </PopoverTrigger>
        <PopoverContent
          side="top"
          sideOffset={30}
          className="z-50 h-[320px] w-auto shrink-0 border-none bg-transparent text-slate-800 shadow-none"
        >
          <ColorPicker value={color} onChange={onChange} />
        </PopoverContent>
      </Popover>
    )
  }
)

PaletteBlockValue.displayName = "PaletteBlockValue"

export default PaletteBlockValue
