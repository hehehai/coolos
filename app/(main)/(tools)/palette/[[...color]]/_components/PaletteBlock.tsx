"use client"

import { DraggableAttributes } from "@dnd-kit/core"
import { SyntheticListenerMap } from "@dnd-kit/core/dist/hooks/utilities"
import toast from "react-hot-toast"
import useSWRMutation from "swr/mutation"

import { cn } from "@/lib/utils"
import { useCopyToClipboard } from "@/hooks/useCopyToClipboard"
import { Color } from "@/components/shared/color-picker"
import { Button } from "@/components/ui/button"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { likeColor } from "@/app/_actions/color"

import PaletteBlockValue from "./PaletteBlockValue"
import PlusFloat from "./PlusFloat"

interface PaletteBlockProps
  extends Omit<React.ComponentPropsWithoutRef<"div">, "color" | "onChange"> {
  block: {
    id: string
    color: Color
  }
  onChange?: (color: Color) => void
  showLeft?: boolean
  showRight?: boolean
  handleProps?: {
    attributes: DraggableAttributes
    listeners?: SyntheticListenerMap
  }
}

const PaletteBlock = ({
  block,
  onChange,
  showLeft,
  showRight,
  handleProps,
  ...props
}: PaletteBlockProps) => {
  const { trigger, isMutating } = useSWRMutation("/api/color", likeColor, {
    onError: (err) => {
      toast.error(err.message)
    },
    onSuccess: () => {
      toast.success("color like success")
    },
  })

  const copy = useCopyToClipboard()

  const handleCopy = async (val: string) => {
    const success = await copy(val)
    if (success) {
      toast.success(`Color copy success`)
    }
  }

  return (
    <div
      {...props}
      style={{
        backgroundColor: block.color.toHexString(),
      }}
      className={cn(
        "group/block relative flex h-full flex-col items-center justify-end pb-24",
        props.className
      )}
    >
      {showLeft && (
        <div className="group/left absolute inset-y-0 left-0 w-12">
          <PlusFloat className="invisible absolute -left-1/2 top-1/2 z-10 -translate-y-1/2 group-hover/left:visible" />
        </div>
      )}
      {showRight && (
        <div className="group/right absolute inset-y-0 right-0 w-12">
          <PlusFloat className="invisible absolute -right-1/2 top-1/2 z-10 -translate-y-1/2 group-hover/right:visible" />
        </div>
      )}
      <div className="flex flex-col items-center">
        <div className="flex flex-col items-center space-y-4">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  className="rounded-xl px-3 hover:bg-white/20"
                >
                  <span className="i-lucide-x text-xl" />
                </Button>
              </TooltipTrigger>
              <TooltipContent sideOffset={20}>
                <span>Remove color</span>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  className="rounded-xl px-3 hover:bg-white/20"
                  onClick={() =>
                    trigger({
                      name: block.color.toName() || block.color.toHexString(),
                      color: block.color.toHex(),
                    })
                  }
                >
                  <span
                    className={cn(
                      "i-lucide-heart text-xl",
                      isMutating && "i-lucide-loader-2 animate-spin"
                    )}
                  />
                </Button>
              </TooltipTrigger>
              <TooltipContent sideOffset={20}>
                <span>Save color</span>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  {...handleProps?.attributes}
                  {...handleProps?.listeners}
                  className="rounded-xl px-3 hover:bg-white/20"
                >
                  <span className="i-lucide-move-horizontal text-xl" />
                </Button>
              </TooltipTrigger>
              <TooltipContent sideOffset={20}>
                <span>Drag color</span>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  className="rounded-xl px-3 hover:bg-white/20"
                  onClick={() => handleCopy(block.color.toHex().toUpperCase())}
                >
                  <span className="i-lucide-copy text-xl" />
                </Button>
              </TooltipTrigger>
              <TooltipContent sideOffset={20}>
                <span>Copy color</span>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <PaletteBlockValue
          className="mt-12"
          color={block.color}
          onChange={onChange}
        />
        <div className="mt-4">Second info</div>
      </div>
    </div>
  )
}

PaletteBlock.displayName = "PaletteBlock"

export default PaletteBlock
