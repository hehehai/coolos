import { FC, useMemo } from "react"
import { isReadable } from "@ctrl/tinycolor"

import { copyTextHasToast } from "@/lib/copy-text"
import { cn } from "@/lib/utils"
import { generateColor } from "@/components/shared/color-picker"

import ColorMoreDropdown from "./ColorMoreDropdown"
import ColorSaveDialog from "./ColorSaveDialog"

interface NameColorCardProps
  extends Omit<React.ComponentPropsWithoutRef<"div">, "name" | "color"> {
  name: string
  color: number[]
  colorCardClassName?: string
  showInfo?: boolean
  showLike?: boolean
}

const NameColorCard: FC<NameColorCardProps> = ({
  name,
  color,
  colorCardClassName,
  showInfo = false,
  showLike = false,
  ...otherProps
}) => {
  const realColor = useMemo(() => {
    const [r, g, b] = color

    return generateColor({ r, g, b })
  }, [color])

  const textIsReadable = useMemo(() => {
    return isReadable(realColor, "#fff", { level: "AA", size: "large" })
  }, [realColor])

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
        onClick={() => copyTextHasToast(realColor.toHex().toUpperCase())}
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
        <div className="flex items-center justify-between px-1 py-2">
          <div className="text-sm text-slate-900">{name}</div>
          <div className="flex items-center">
            {showLike && (
              <ColorSaveDialog
                defaultValues={{
                  color: realColor.toHex().toUpperCase(),
                }}
              >
                <span className="i-ph-heart-bold mr-2 cursor-pointer text-sm text-slate-600 hover:text-black" />
              </ColorSaveDialog>
            )}
            <ColorMoreDropdown color={realColor}>
              <div className="i-lucide-more-horizontal cursor-pointer text-slate-600 hover:text-black" />
            </ColorMoreDropdown>
          </div>
        </div>
      )}
    </div>
  )
}

NameColorCard.displayName = "NameColorCard"

export default NameColorCard
