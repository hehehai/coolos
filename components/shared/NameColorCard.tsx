import { FC, useMemo } from "react"
import { isReadable } from "@ctrl/tinycolor"
import { MoreHorizontal } from "lucide-react"
import toast from "react-hot-toast"

import { cn } from "@/lib/utils"
import { useCopyToClipboard } from "@/hooks/useCopyToClipboard"
import { generateColor } from "@/components/shared/color-picker"

interface NameColorCardProps
  extends Omit<React.ComponentPropsWithoutRef<"div">, "name" | "color"> {
  name: string
  color: number[]
  colorCardClassName?: string
  showInfo?: boolean
}

const NameColorCard: FC<NameColorCardProps> = ({
  name,
  color,
  colorCardClassName,
  showInfo = false,
  ...otherProps
}) => {
  const realColor = useMemo(() => {
    const [r, g, b] = color

    return generateColor({ r, g, b })
  }, [color])

  const textIsReadable = useMemo(() => {
    return isReadable(realColor, "#fff", { level: "AA", size: "large" })
  }, [realColor])

  const copy = useCopyToClipboard()

  const handleCopyColor = (val: string) => {
    const success = copy(val)
    if (success) {
      toast.success("color copy success")
    }
  }

  return (
    <div
      {...otherProps}
      className={cn("flex w-full flex-col", otherProps.className)}
    >
      <div
        className={cn(
          "group flex grow cursor-pointer items-center justify-center rounded-xl",
          colorCardClassName
        )}
        style={{ backgroundColor: realColor.toHexString() }}
        onClick={() => handleCopyColor(realColor.toHex().toUpperCase())}
      >
        <span
          className={cn(
            "opacity-0 transition-opacity group-hover:opacity-100",
            textIsReadable ? "text-white" : "text-black"
          )}
        >
          {realColor.toHex().toUpperCase()}
        </span>
      </div>
      {showInfo && (
        <div className="flex items-center justify-between p-1">
          <div className="text-sm text-slate-900">{name}</div>
          <div>
            <MoreHorizontal />
          </div>
        </div>
      )}
    </div>
  )
}

NameColorCard.displayName = "NameColorCard"

export default NameColorCard
