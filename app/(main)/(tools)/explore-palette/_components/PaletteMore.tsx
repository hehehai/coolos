"use client"

import { useMemo } from "react"

import { copyTextHasToast } from "@/lib/copy-text"
import { generateColor } from "@/components/shared/color-picker"
import PaletteSaveDialog from "@/components/shared/PaletteSaveDialog"
import QuickViewDialog from "@/components/shared/QuickViewDialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const PaletteMore = ({
  colors,
  id,
  isEdit = false,
  editActions,
}: {
  colors: string[]
  id: number
  isEdit?: boolean
  editActions?: React.ReactNode
}) => {
  const palette = useMemo(() => {
    return colors.map((c) => generateColor(c))
  }, [colors])

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center justify-center">
        <div className="i-lucide-more-horizontal cursor-pointer text-slate-600 hover:text-black" />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="space-y-1 rounded-xl p-3">
        {editActions && (
          <>
            {editActions}
            <DropdownMenuSeparator className="mx-1" />
          </>
        )}
        <DropdownMenuItem
          className="cursor-pointer space-x-2 rounded-md"
          onClick={() => {
            window.open(`/palette-view/${id}`, "_blank", "noopener,noreferrer")
          }}
        >
          <span className="i-lucide-mouse-pointer-square" />
          <span>Open palette</span>
        </DropdownMenuItem>
        <DropdownMenuItem
          className="cursor-pointer space-x-2 rounded-md"
          onClick={() => {
            window.open(
              `/palette/${palette.map((c) => c.toHex()).join("-")}}`,
              "_blank",
              "noopener,noreferrer"
            )
          }}
        >
          <span className="i-lucide-pipette" />
          <span> Open in the generator</span>
        </DropdownMenuItem>
        {!isEdit && (
          <DropdownMenuItem
            className="cursor-pointer space-x-2 rounded-md"
            onClick={() => {
              copyTextHasToast(
                `${window.location.origin}/palette-view/${id}`,
                "Link copy success"
              )
            }}
          >
            <span className="i-lucide-link" />
            <span>Copy URL</span>
          </DropdownMenuItem>
        )}
        <DropdownMenuSeparator className="mx-1" />
        <QuickViewDialog title="Quick view" palette={palette}>
          <DropdownMenuItem
            onSelect={(e) => e.preventDefault()}
            className="cursor-pointer space-x-2 rounded-md"
          >
            <span className="i-lucide-eye" />
            <span>Quick view</span>
          </DropdownMenuItem>
        </QuickViewDialog>
        <DropdownMenuItem className="cursor-pointer space-x-2 rounded-md">
          <span className="i-lucide-maximize-2" />
          <span>View fullscreen</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator className="mx-1" />
        <DropdownMenuItem className="cursor-pointer space-x-2 rounded-md">
          <span className="i-lucide-arrow-down-to-line" />
          <span>Export as image</span>
        </DropdownMenuItem>
        {!isEdit && (
          <PaletteSaveDialog
            palette={palette}
            defaultValues={{
              saveById: id,
            }}
          >
            <DropdownMenuItem
              className="item-center flex w-full cursor-pointer space-x-2 rounded-md"
              onSelect={(e) => e.preventDefault()}
            >
              <span className="i-ph-heart-bold" />
              <span>Save palette</span>
            </DropdownMenuItem>
          </PaletteSaveDialog>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default PaletteMore
