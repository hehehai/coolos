import { memo } from "react"
import { isReadable } from "@ctrl/tinycolor"
import toast from "react-hot-toast"

import { cn } from "@/lib/utils"
import { useCopyToClipboard } from "@/hooks/useCopyToClipboard"

interface ExpansionStripProps extends React.ComponentPropsWithoutRef<"div"> {
  colors: string[]
}

const ExpansionStrip = memo((props: ExpansionStripProps) => {
  const { colors, ...otherProps } = props

  const copy = useCopyToClipboard()

  const handleCopyColor = async (val: string) => {
    const success = await copy(val)
    if (success) {
      toast.success("color copy success")
    }
  }

  return (
    <div
      {...otherProps}
      className={cn("flex h-full w-full", otherProps.className)}
    >
      {colors.map((color, idx) => (
        <div
          key={idx}
          className="group flex grow cursor-pointer items-center justify-center shadow-[inset_rgba(0,0,0,0.08)_0_1px,inset_rgba(0,0,0,0.08)_0_-1px] transition-all duration-300 ease-in-out first:rounded-l-lg first:shadow-[inset_rgba(0,_0,_0,_0.08)_1px_1px,inset_rgba(0,0,0,0.08)_0_-1px] last:rounded-r-lg last:shadow-[inset_rgba(0,0,0,0.08)_-1px_1px,inset_rgba(0,0,0,0.08)_0_-1px] hover:grow-[2]"
          style={{ backgroundColor: color }}
          onClick={() => handleCopyColor(color)}
        >
          <span
            className={cn("hidden group-hover:block", [
              isReadable(color, "#fff", { level: "AA", size: "small" })
                ? "text-white"
                : "text-black",
            ])}
          >
            {color.toUpperCase().replace("#", "")}
          </span>
        </div>
      ))}
    </div>
  )
})

ExpansionStrip.displayName = "ExpansionStrip"

export default ExpansionStrip
