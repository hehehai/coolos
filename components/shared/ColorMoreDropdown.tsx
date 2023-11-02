"use client"

import { memo, useMemo, useState } from "react"
import { useLockedBody } from "usehooks-ts"

import { copyTextHasToast } from "@/lib/copy-text"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu"
import { Color, generateColor } from "./color-picker"
import ColorFullScreen from "./ColorFullscreen"
import ColorSaveDialog from "./ColorSaveDialog"
import QuickViewDialog from "./QuickViewDialog"

export const ColorMoreDropdown = memo(
  ({
    color,
    children,
  }: {
    color: string | Color
    children: React.ReactNode
  }) => {
    const colorInstance = useMemo(() => {
      return generateColor(color)
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
      <>
        <DropdownMenu>
          <DropdownMenuTrigger
            className="flex items-center justify-center"
            asChild
          >
            {children}
          </DropdownMenuTrigger>
          <DropdownMenuContent className="space-y-1 rounded-xl p-3">
            <DropdownMenuItem
              className="cursor-pointer space-x-2 rounded-md"
              onClick={() => {
                window.open(
                  `/picker/${colorInstance.toHex()}`,
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
                copyTextHasToast(
                  `${window.location.origin}/picker/${colorInstance.toHex()}`,
                  "Link copy success"
                )
              }}
            >
              <span className="i-lucide-link" />
              <span>Copy URL</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator className="mx-1" />
            <QuickViewDialog title="Quick view" color={colorInstance}>
              <DropdownMenuItem
                onSelect={(e) => e.preventDefault()}
                className="cursor-pointer space-x-2 rounded-md"
              >
                <span className="i-lucide-eye" />
                <span>Quick view</span>
              </DropdownMenuItem>
            </QuickViewDialog>
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
            <ColorSaveDialog
              triggerClassName="block w-full"
              defaultValues={{
                color: colorInstance.toHex().toUpperCase(),
              }}
            >
              <DropdownMenuItem
                className="item-center flex w-full cursor-pointer space-x-2 rounded-md"
                onSelect={(e) => e.preventDefault()}
              >
                <span className="i-ph-heart-bold" />
                <span>Save color</span>
              </DropdownMenuItem>
            </ColorSaveDialog>
          </DropdownMenuContent>
        </DropdownMenu>

        <ColorFullScreen
          show={isColorFullScreen}
          color={colorInstance.toHexString()}
          onClose={handleColorFullScreen}
        />
      </>
    )
  }
)

ColorMoreDropdown.displayName = "ColorMoreDropdown"

export default ColorMoreDropdown
