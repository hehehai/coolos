"use client"

import { memo, useMemo, useState } from "react"
import { isReadable } from "@ctrl/tinycolor"
import toast from "react-hot-toast"

import { cn } from "@/lib/utils"
import { useCopyToClipboard } from "@/hooks/useCopyToClipboard"
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip"
import { Color, getModeColor } from "./color-picker"
import { colorPalettes } from "./color-picker/constants"
import { PaletteSecondInfo } from "./color-picker/interface"

const ViewItem = memo(
  ({ color, model }: { color: Color; model: PaletteSecondInfo }) => {
    const colorVal = useMemo(() => {
      return getModeColor(model, color)
    }, [color, model])

    const textIsReadable = useMemo(() => {
      return isReadable(color, "#fff", { level: "AA", size: "large" })
    }, [color])

    const copy = useCopyToClipboard()

    const handleCopy = async () => {
      const success = await copy(colorVal)
      if (success) {
        toast.success(`Color copy success`)
      }
    }

    return (
      <div
        className={cn(
          "group flex items-center justify-between rounded-lg px-4 py-3",
          textIsReadable ? "hover:bg-white/5" : "hover:bg-black/5"
        )}
      >
        <div className="space-y-1">
          <div
            className={cn(
              "text-sm text-black/50",
              textIsReadable ? "text-white/80" : "text-black/50"
            )}
          >
            {model}
          </div>
          <div className={cn(textIsReadable ? "text-white" : "text-black")}>
            {colorVal}
          </div>
        </div>
        <div
          className={cn(
            "invisible cursor-pointer font-medium group-hover:visible",
            textIsReadable
              ? "text-white/60 hover:text-white/80"
              : "text-black/40 hover:text-black/60"
          )}
          onClick={handleCopy}
        >
          Copy
        </div>
      </div>
    )
  }
)

ViewItem.displayName = "ViewItem"

interface QuickViewDialogProps extends React.PropsWithChildren {
  color?: Color
  palette?: Color[]
  title: React.ReactNode
}

const QuickViewDialog = memo(
  ({ color, title, children, palette }: QuickViewDialogProps) => {
    const [activeColor, setActiveColor] = useState(color ?? palette?.[0])

    if (activeColor === undefined) {
      return null
    }

    return (
      <Dialog>
        <DialogTrigger asChild>{children}</DialogTrigger>
        <DialogContent className="gap-0 overflow-hidden border-b-0 p-0 sm:rounded-xl">
          <DialogHeader className="flex items-center justify-center border-b border-gray-200 py-4">
            <DialogTitle>{title}</DialogTitle>
          </DialogHeader>
          <div
            className="no-scrollbar flex max-h-[420px] flex-col overflow-y-auto p-3"
            style={{ backgroundColor: activeColor.toHex8String() }}
          >
            {colorPalettes.map((model) => (
              <ViewItem key={model} model={model} color={activeColor} />
            ))}
          </div>
          {palette?.length && (
            <DialogFooter className="bg-white px-6 py-5">
              <div className="flex h-12 w-full items-center overflow-hidden rounded-xl">
                {palette?.map((color, idx) => (
                  <TooltipProvider key={idx}>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <div
                          className="group flex h-full grow cursor-pointer items-center justify-center shadow-[inset_rgba(0,0,0,0.08)_0_1px,inset_rgba(0,0,0,0.08)_0_-1px] first:rounded-l-lg first:shadow-[inset_rgba(0,_0,_0,_0.08)_1px_1px,inset_rgba(0,0,0,0.08)_0_-1px] last:rounded-r-lg last:shadow-[inset_rgba(0,0,0,0.08)_-1px_1px,inset_rgba(0,0,0,0.08)_0_-1px]"
                          style={{ backgroundColor: color.toHex8String() }}
                          onClick={() => setActiveColor(color)}
                        >
                          <span
                            className={cn(
                              "invisible h-2 w-2 rounded-full group-hover:visible",
                              color === activeColor ? "visible" : null,
                              [
                                isReadable(color, "#fff", {
                                  level: "AA",
                                  size: "small",
                                })
                                  ? "bg-white"
                                  : "bg-black/80",
                              ]
                            )}
                          />
                        </div>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>{color.toHex().toUpperCase()}</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                ))}
              </div>
            </DialogFooter>
          )}
        </DialogContent>
      </Dialog>
    )
  }
)

QuickViewDialog.displayName = "QuickViewDialog"

export default QuickViewDialog
