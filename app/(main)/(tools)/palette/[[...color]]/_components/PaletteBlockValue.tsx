"use client"

import { memo } from "react"

import { Color } from "@/components/shared/color-picker"
import ColorPicker from "@/components/shared/color-picker/ColorPicker"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

const PaletteBlockValue = memo(
  ({ color, onChange }: { color: Color; onChange: (color: Color) => void }) => {
    return (
      <Popover>
        <PopoverTrigger>
          <div className="rounded-lg px-3 py-2 text-3xl font-medium uppercase tabular-nums leading-none hover:bg-gray-500/10">
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
