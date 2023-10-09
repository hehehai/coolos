"use client"

import { memo, useMemo, useState } from "react"
import { UpsetColorDto } from "@/db/dto/color.dto"
import { isReadable } from "@ctrl/tinycolor"
import toast from "react-hot-toast"
import useSWRMutation from "swr/mutation"
import { useLockedBody } from "usehooks-ts"

import { getFetchAction } from "@/lib/fetch-action"
import { cn } from "@/lib/utils"
import { Color } from "@/components/shared/color-picker"
import ColorFullScreen from "@/components/shared/ColorFullscreen"

const DisplayDesk = memo(
  ({
    color,
    className,
    children,
    fullChildren,
    showLike = false,
  }: {
    color: Color
    className?: string
    children: React.ReactNode
    fullChildren?: React.ReactNode
    showLike?: boolean
  }) => {
    const boardTextIsReadable = useMemo(() => {
      return isReadable(color, "#fff", { level: "AA", size: "large" })
    }, [color])
    const [isColorFullScreen, setColorFullScreen] = useState(false)
    const [_, setLocked] = useLockedBody(false, "root")

    const handleColorFullScreen = () => {
      setColorFullScreen((state) => {
        const nextState = !state
        setLocked(nextState)
        return nextState
      })
    }

    const { trigger, isMutating } = useSWRMutation(
      "/api/color",
      getFetchAction<UpsetColorDto>(),
      {
        onError: (err) => {
          toast.error(err.message)
        },
        onSuccess: () => {
          toast.success("color like success")
        },
      }
    )

    return (
      <div
        className={cn("relative", className)}
        style={{ backgroundColor: color.toHexString() }}
      >
        {children}
        <div className="absolute right-4 top-4 flex items-center space-x-4">
          {showLike && (
            <span
              className={cn(
                boardTextIsReadable
                  ? "text-white/50 hover:text-white"
                  : "text-black/50 hover:text-black",
                "i-lucide-heart hover:animate-zoom cursor-pointer text-xl",
                isMutating && "i-lucide-loader-2 animate-spin"
              )}
              onClick={() =>
                trigger({
                  name: color.toName() || color.toHex(),
                  color: color.toHex(),
                })
              }
            />
          )}
          <span
            className={cn(
              "i-lucide-maximize-2 hover:animate-zoom cursor-pointer text-xl",
              boardTextIsReadable
                ? "text-white/50 hover:text-white"
                : "text-black/50 hover:text-black"
            )}
            onClick={() => handleColorFullScreen()}
          />
        </div>

        <ColorFullScreen
          show={isColorFullScreen}
          color={color.toHexString()}
          onClose={handleColorFullScreen}
        >
          {fullChildren}
        </ColorFullScreen>
      </div>
    )
  }
)

DisplayDesk.displayName = "DisplayDesk"

export default DisplayDesk
