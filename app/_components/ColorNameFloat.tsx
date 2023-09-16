"use client"

import { colorCollection } from "@/components/shared/color-picker/data"

import NameColorCard from "../(tools)/colors/_components/NameColorCard"

const ColorNameFloat = () => {
  return (
    <div className="z-1 absolute -right-16 top-10">
      <div className="grid h-[200px] w-[320px] rotate-[-32deg] grid-cols-4 gap-x-4 gap-y-3 overflow-auto">
        {Object.entries(colorCollection).map(([category, colors]) => {
          return colors.map((color) => (
            <NameColorCard
              className="h-40"
              key={`${category}__${color.name}`}
              name={color.name}
              color={color.rgb}
              showInfo
            />
          ))
        })}
      </div>
    </div>
  )
}

export default ColorNameFloat
