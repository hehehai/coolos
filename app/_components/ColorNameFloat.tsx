'use client';

import { colorNames } from "@/components/shared/color-picker/data"
import NameColorCard from "../(tools)/colors/_components/NameColorCard"

const ColorNameFloat = () => {
  return <div className="absolute z-1 -right-16 top-10">
    <div className="grid grid-cols-4 gap-x-4 gap-y-3 h-[200px] w-[320px] rotate-[-32deg] overflow-auto">
      {colorNames.map((color, idx) => {
        return <NameColorCard className="h-8" key={idx} name={color.name} color={color.rgb} />
      })}
    </div>
  </div>
}

export default ColorNameFloat
