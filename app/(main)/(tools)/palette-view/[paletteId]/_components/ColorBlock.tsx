"use client"

import { useMemo, useState } from "react"
import { isReadable } from "@ctrl/tinycolor"

import { copyTextHasToast } from "@/lib/copy-text"
import { cn } from "@/lib/utils"
import { generateColor, getModeColor } from "@/components/shared/color-picker"
import { colorPalettes } from "@/components/shared/color-picker/constants"
import { PaletteSecondInfo } from "@/components/shared/color-picker/interface"
import ColorMoreDropdown from "@/components/shared/ColorMoreDropdown"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const ColorBlock = ({ color }: { color: string }) => {
  const textIsReadable = useMemo(() => {
    return isReadable(color, "#fff", { level: "AA", size: "large" })
  }, [color])

  const colorInstance = useMemo(() => {
    return generateColor(color)
  }, [color])

  const [mode, setMode] = useState(PaletteSecondInfo.HEX)

  const modelInfo = useMemo(() => {
    return getModeColor(mode, colorInstance)
  }, [mode, colorInstance])

  return (
    <div
      className={cn(
        "group relative flex aspect-square cursor-pointer flex-col items-center justify-between px-4 py-7 shadow-[inset_rgba(0,_0,_0,_0.05)_0_1px,inset_rgba(0,_0,_0,_0.05)_0_-1px,_inset_rgba(0,_0,_0,_0.05)_1px_0]",
        textIsReadable ? "text-white" : "text-black"
      )}
      style={{ backgroundColor: `#${color}` }}
      onClick={() => {
        copyTextHasToast(modelInfo)
      }}
    >
      <div
        className="flex w-full items-center justify-end"
        onClick={(e) => {
          e.stopPropagation()
        }}
      >
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size={"xss"}
              className="mr-2 space-x-1 hover:bg-black/10 focus-visible:ring-0 focus-visible:ring-offset-0"
            >
              <span>{mode}</span>
              <span className="i-lucide-chevron-down"></span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="rounded-lg p-2">
            {colorPalettes.map((item) => (
              <DropdownMenuItem
                key={item}
                className={cn("cursor-pointer rounded-md text-sm", {
                  "bg-accent text-accent-foreground": item === mode,
                })}
                onClick={() => setMode(item)}
              >
                {item}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
        <ColorMoreDropdown color={colorInstance}>
          <Button
            variant="ghost"
            size={"xss"}
            className="mr-2 space-x-1 hover:bg-black/10 focus-visible:ring-0 focus-visible:ring-offset-0"
          >
            <span className="i-lucide-more-horizontal"></span>
          </Button>
        </ColorMoreDropdown>
      </div>
      <div className="invisible text-sm group-hover:visible">
        Click copy color
      </div>
      <div className="text-2xl font-medium">{modelInfo}</div>
    </div>
  )
}

export default ColorBlock
