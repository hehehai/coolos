"use client"

import { memo } from "react"

import { cn } from "@/lib/utils"
import PaletteSaveDialog from "@/components/shared/PaletteSaveDialog"
import QuickViewDialog from "@/components/shared/QuickViewDialog"
import { Button } from "@/components/ui/button"

import { usePaletteStore, usePaletteTemporal } from "../_store/palette"
import PaletteSetting from "./Setting"

const Toolbar = memo(({ onZen }: { onZen: () => void }) => {
  const store = usePaletteStore((state) => state)
  const { pastStates, futureStates, undo, redo } = usePaletteTemporal(
    (state) => state
  )

  return (
    <div className="flex h-[54px] w-full items-center justify-between border-b border-zinc-100 bg-white px-3">
      <div className="text-3xl">🧑‍🎨</div>
      <div className="flex items-center space-x-2">
        <PaletteSetting />
        <div className="h-[1em] w-[1px] bg-slate-300"></div>
        <Button variant="ghost" size="sm" onClick={() => onZen()}>
          <span className="i-lucide-focus text-lg"></span>
        </Button>
        <div className="h-[1em] w-[1px] bg-slate-300"></div>
        <div className="space-x-1">
          <Button
            variant="ghost"
            size="sm"
            disabled={pastStates.length === 0}
            onClick={() => undo()}
          >
            <span className="i-lucide-redo rotate-mirror text-lg"></span>
          </Button>
          <Button
            variant="ghost"
            size="sm"
            disabled={futureStates.length === 0}
            onClick={() => redo()}
          >
            <span className="i-lucide-redo text-lg"></span>
          </Button>
        </div>
        <div className="h-[1em] w-[1px] bg-slate-300"></div>
        <div className="space-x-1">
          <QuickViewDialog
            title="Quick view"
            palette={store.palette.map((c) => c.color)}
          >
            <Button variant="ghost" size="sm">
              <span className="i-lucide-view mr-2 text-lg"></span>
              <span>Quick view</span>
            </Button>
          </QuickViewDialog>
          <Button variant="ghost" size="sm">
            <span className="i-lucide-share-2 mr-2 text-lg"></span>
            <span>Export</span>
          </Button>
          <PaletteSaveDialog palette={store.palette.map((c) => c.color)}>
            <Button variant="ghost" size="sm">
              <span className={cn("i-lucide-heart mr-2 text-lg")} />
              <span>Save</span>
            </Button>
          </PaletteSaveDialog>
        </div>
      </div>
    </div>
  )
})

Toolbar.displayName = "Toolbar"

export default Toolbar
