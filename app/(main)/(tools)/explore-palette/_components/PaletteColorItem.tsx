"use client"

import { memo, useMemo } from "react"
import { isReadable } from "@ctrl/tinycolor"
import toast from "react-hot-toast"

import { cn } from "@/lib/utils"
import { useCopyToClipboard } from "@/hooks/useCopyToClipboard"
import { generateColor } from "@/components/shared/color-picker"

interface PaletteColorItemProps
  extends Omit<React.ComponentPropsWithoutRef<"div">, "color"> {
  hexString: string
}

const PaletteColorItem = memo(
  ({ hexString, ...props }: PaletteColorItemProps) => {
    const color = useMemo(() => generateColor(hexString), [hexString])

    const textIsReadable = useMemo(() => {
      return isReadable(color, "#fff", { level: "AA", size: "large" })
    }, [color])

    const copy = useCopyToClipboard()

    const handleCopyColor = async (val: string) => {
      const success = await copy(val)
      if (success) {
        toast.success("color copy success")
      }
    }

    return (
      <div
        {...props}
        className={cn(
          "group flex h-full w-[var(--item-width)] grow-0 cursor-pointer items-center justify-center overflow-visible shadow-[inset_rgba(0,_0,_0,_0.05)_0_1px,_inset_rgba(0,_0,_0,_0.05)_0_-1px] transition-all hover:w-32",
          props.className
        )}
        style={{ backgroundColor: color.toHexString(), ...props.style }}
        onClick={() => handleCopyColor(color.toHex().toUpperCase())}
      >
        <div
          className={cn(
            "hidden px-5 group-hover:block",
            textIsReadable ? "text-white" : "text-black"
          )}
        >
          {color.toHex()}
        </div>
      </div>
    )
  }
)

PaletteColorItem.displayName = "PaletteColorItem"

export default PaletteColorItem
