"use client"

import { memo, useEffect, useState } from "react"
import { isReadable } from "@ctrl/tinycolor"

import { cn } from "@/lib/utils"

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip"
import { Color } from "./color-picker"

interface PaletteGroupProps
  extends Omit<React.ComponentPropsWithoutRef<"div">, "onChange"> {
  palette: Color[]
  active?: Color
  onChange?: (color: Color, idx: number) => void
}

const PaletteGroup = memo(
  ({ palette, active, onChange, className, ...props }: PaletteGroupProps) => {
    const [activeIdx, setActiveIdx] = useState(0)

    useEffect(() => {
      if (active) {
        setActiveIdx(palette.findIndex((c) => c === active))
      } else {
        setActiveIdx(0)
      }
    }, [active, palette])

    const handleChange = (val: Color, idx: number) => {
      setActiveIdx(idx)
      onChange?.(val, idx)
    }

    return (
      <div
        {...props}
        className={cn(
          "flex h-12 w-full items-center overflow-hidden rounded-xl",
          className
        )}
      >
        {palette?.map((color, idx) => (
          <TooltipProvider key={idx}>
            <Tooltip>
              <TooltipTrigger asChild>
                <div
                  className="group flex h-full grow cursor-pointer items-center justify-center shadow-[inset_rgba(0,0,0,0.08)_0_1px,inset_rgba(0,0,0,0.08)_0_-1px] first:rounded-l-lg first:shadow-[inset_rgba(0,_0,_0,_0.08)_1px_1px,inset_rgba(0,0,0,0.08)_0_-1px] last:rounded-r-lg last:shadow-[inset_rgba(0,0,0,0.08)_-1px_1px,inset_rgba(0,0,0,0.08)_0_-1px]"
                  style={{ backgroundColor: color.toHexString() }}
                  onClick={() => handleChange(color, idx)}
                >
                  <span
                    className={cn(
                      "invisible h-2 w-2 rounded-full group-hover:visible",
                      idx === activeIdx ? "visible" : null,
                      [
                        isReadable(color, "#fff", {
                          level: "AA",
                          size: "small",
                        })
                          ? "bg-white"
                          : "bg-black/70",
                      ]
                    )}
                  />
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p>{color.toHex().toUpperCase()}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        ))}
      </div>
    )
  }
)

PaletteGroup.displayName = "PaletteGroup"

export default PaletteGroup
