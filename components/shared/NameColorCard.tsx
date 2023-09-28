import { FC, useMemo, useState } from "react"
import { isReadable } from "@ctrl/tinycolor"
import toast from "react-hot-toast"
import useSWRMutation from "swr/mutation"
import { useLockedBody } from "usehooks-ts"

import { cn } from "@/lib/utils"
import { useCopyToClipboard } from "@/hooks/useCopyToClipboard"
import { generateColor } from "@/components/shared/color-picker"
import { likeColor } from "@/app/_actions/color"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu"
import ColorFullScreen from "./ColorFullscreen"

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

  const copy = useCopyToClipboard()

  const handleCopy = async (val: string, title: "link" | "color") => {
    const success = await copy(val)
    if (success) {
      toast.success(`${title} copy success`)
    }
  }

  const { trigger, isMutating } = useSWRMutation("/api/color", likeColor, {
    onError: (err) => {
      toast.error(err.message)
    },
    onSuccess: () => {
      toast.success("color like success")
    },
  })

  const [isColorFullScreen, setColorFullScreen] = useState(false)
  const [_, setLocked] = useLockedBody(false, "root")

  const handleColorFullScreen = () => {
    setColorFullScreen((state) => {
      const nextState = !state
      setLocked(nextState)
      return nextState
    })
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
        onClick={() => handleCopy(realColor.toHex().toUpperCase(), "color")}
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
          <div className="flex items-center space-x-2">
            {showLike && (
              <span
                className={cn(
                  "i-lucide-heart cursor-pointer text-sm text-slate-600 hover:text-black",
                  isMutating && "i-lucide-loader-2 animate-spin"
                )}
                onClick={() => trigger({ name, color: realColor.toHex() })}
              />
            )}
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center justify-center">
                <div className="i-lucide-more-horizontal cursor-pointer text-slate-600 hover:text-black" />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="space-y-1 rounded-xl p-3">
                <DropdownMenuItem
                  className="cursor-pointer space-x-2 rounded-md"
                  onClick={() => {
                    window.open(
                      `/picker/${realColor.toHex()}`,
                      "_blank",
                      "noopener,noreferrer"
                    )
                  }}
                >
                  <span className="i-lucide-pipette" />
                  <span> Open in the Color Picker</span>
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="cursor-pointer space-x-2 rounded-md"
                  onClick={() => {
                    handleCopy(
                      `${window.location.origin}/picker/${realColor.toHex()}`,
                      "link"
                    )
                  }}
                >
                  <span className="i-lucide-link" />
                  <span>Copy URL</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator className="mx-1" />
                <DropdownMenuItem className="cursor-pointer space-x-2 rounded-md">
                  <span className="i-lucide-eye" />
                  <span>Quick view</span>
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="cursor-pointer space-x-2 rounded-md"
                  onClick={handleColorFullScreen}
                >
                  <span className="i-lucide-maximize-2" />
                  <span>View fullscreen</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator className="mx-1" />
                <DropdownMenuItem className="cursor-pointer space-x-2 rounded-md">
                  <span className="i-lucide-arrow-down-to-line" />
                  <span>Export as image</span>
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="cursor-pointer space-x-2 rounded-md"
                  onClick={() => trigger({ name, color: realColor.toHex() })}
                >
                  <span
                    className={cn(
                      "i-lucide-heart",
                      isMutating && "i-lucide-loader-2 animate-spin"
                    )}
                  />
                  <span>Save color</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      )}

      <ColorFullScreen
        show={isColorFullScreen}
        color={realColor.toHexString()}
        onClose={handleColorFullScreen}
      />
    </div>
  )
}

NameColorCard.displayName = "NameColorCard"

export default NameColorCard
