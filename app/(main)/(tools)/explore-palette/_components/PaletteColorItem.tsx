"use client"

import { memo, useMemo } from "react"
import { isReadable } from "@ctrl/tinycolor"
import toast from "react-hot-toast"

import { cn } from "@/lib/utils"
import { useCopyToClipboard } from "@/hooks/useCopyToClipboard"
import { Color } from "@/components/shared/color-picker"

interface PaletteColorItemProps
  extends Omit<React.ComponentPropsWithoutRef<"div">, "color"> {
  color: Color
}

const PaletteColorItem = memo(({ color, ...props }: PaletteColorItemProps) => {
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
        "group flex h-full grow basis-1 cursor-pointer items-center justify-center shadow-[inset_rgba(0,_0,_0,_0.05)_0_1px,_inset_rgba(0,_0,_0,_0.05)_0_-1px] first:shadow-[inset_rgba(0,_0,_0,_0.05)_1px_1px,_inset_rgba(0,_0,_0,_0.05)_0_-1px] last:shadow-[inset_rgba(0,_0,_0,_0.05)_-1px_1px,_inset_rgba(0,_0,_0,_0.05)_0_-1px]",
        props.className
      )}
      style={{ backgroundColor: color.toHexString() }}
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
})

PaletteColorItem.displayName = "PaletteColorItem"

export default PaletteColorItem
