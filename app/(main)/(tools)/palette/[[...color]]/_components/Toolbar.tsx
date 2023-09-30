import { memo } from "react"

import { Button } from "@/components/ui/button"

import { usePaletteTemporal } from "../_store/palette"
import PaletteSetting from "./Setting"

const Toolbar = memo(() => {
  const { pastStates, futureStates, undo, redo } = usePaletteTemporal(
    (state) => state
  )

  return (
    <div className="flex h-16 w-full items-center justify-between border-b border-zinc-100 bg-white px-3">
      <div className="text-3xl">🧑‍🎨</div>
      <div className="flex items-center space-x-3">
        <PaletteSetting />
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
