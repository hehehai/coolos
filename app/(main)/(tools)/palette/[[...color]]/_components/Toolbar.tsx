import { memo } from "react"

import { Button } from "@/components/ui/button"

import { usePaletteTemporal } from "../_store/palette"
import PaletteSetting from "./Setting"

const Toolbar = memo(({ onZen }: { onZen: () => void }) => {
  const { pastStates, futureStates, undo, redo } = usePaletteTemporal(
    (state) => state
  )

  return (
    <div className="flex h-16 w-full items-center justify-between border-b border-zinc-100 bg-white px-3">
      <div className="text-3xl">🧑‍🎨</div>
      <div className="flex items-center space-x-2">
        <PaletteSetting />
        <div className="h-[1em] w-[1px] bg-slate-300"></div>
        <Button variant="ghost" size="icon" onClick={() => onZen()}>
          <span className="i-lucide-focus text-lg"></span>
        </Button>
        <div className="h-[1em] w-[1px] bg-slate-300"></div>
        <div className="space-x-1">
          <Button
            variant="ghost"
            size="icon"
            disabled={pastStates.length === 0}
            onClick={() => undo()}
          >
            <span className="i-lucide-redo rotate-mirror text-lg"></span>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            disabled={futureStates.length === 0}
            onClick={() => redo()}
          >
            <span className="i-lucide-redo text-lg"></span>
          </Button>
        </div>
        <div className="h-[1em] w-[1px] bg-slate-300"></div>
        <div>Adjust palette</div>
        <div>Quick view</div>
        <div>Export</div>
        <div>Save</div>
      </div>
    </div>
  )
})

Toolbar.displayName = "Toolbar"

export default Toolbar
