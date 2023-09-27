import { memo } from "react"

import PaletteSetting from "./Setting"

const Toolbar = memo(() => {
  return (
    <div className="flex h-16 w-full items-center justify-between bg-gray-300 px-3">
      <div>tool bar</div>
      <div className="flex items-center space-x-3">
        <PaletteSetting />
        <div>prev</div>
        <div>next</div>
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
