"use client"

import { isReadable } from "@ctrl/tinycolor"
import { memo, useMemo, useState } from "react"
import { useLockedBody } from "usehooks-ts"

import ColorFullScreen from "@/components/shared/ColorFullscreen"
import { Color } from "@/components/shared/color-picker"
import { cn } from "@/lib/utils"

import ColorSaveDialog from "./ColorSaveDialog"

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

    return (
      <div
        className={cn("relative", className)}
        style={{ backgroundColor: color.toHexString() }}
      >
        {children}
        <div className="absolute right-4 top-4 flex items-center space-x-4">
          {showLike && (
            <ColorSaveDialog defaultValues={{ color: color.toHexString() }}>
              <span
                className={cn(
                  boardTextIsReadable
                    ? "text-white/50 hover:text-white"
                    : "text-black/50 hover:text-black",
                  "i-lucide-heart hover:animate-zoom cursor-pointer text-xl"
                )}
              />
            </ColorSaveDialog>
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
