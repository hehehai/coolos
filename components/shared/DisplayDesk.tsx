"use client"

import { memo, useMemo, useState } from "react"
import { isReadable } from "@ctrl/tinycolor"
import { useLockedBody } from "usehooks-ts"

import { cn } from "@/lib/utils"
import { IconMaximize } from "@/components/icons/Maximize"
import { Color } from "@/components/shared/color-picker"
import ColorFullScreen from "@/components/shared/ColorFullscreen"

const DisplayDesk = memo(
  ({
    color,
    className,
    children,
    fullChildren,
  }: {
    color: Color
    className?: string
    children: React.ReactNode
    fullChildren?: React.ReactNode
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

    return (
      <div
        className={cn("relative", className)}
        style={{ backgroundColor: color.toHex8String() }}
      >
        {children}
        <div className="absolute right-4 top-4">
          <IconMaximize
            className={cn(
              "hover:animate-zoom h-5 w-5 cursor-pointer",
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
