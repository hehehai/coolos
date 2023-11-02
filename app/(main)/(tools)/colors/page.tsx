"use client"

import { useMemo, useState } from "react"
import { useAutoAnimate } from "@formkit/auto-animate/react"

import {
  ColorCategory,
  colorCollection,
} from "@/components/shared/color-picker/data"
import ColorTag from "@/components/shared/ColorTag"
import NameColorCard from "@/components/shared/NameColorCard"

const colorCategories = Object.keys(colorCollection) as ColorCategory[]

const ColorsPage = () => {
  const [filter, setFilter] = useState<ColorCategory | "">("")
  const [parentRef] = useAutoAnimate()

  const showColors = useMemo(() => {
    if (!filter) return colorCollection
    return { [filter]: colorCollection[filter] }
  }, [filter])

  return (
    <div>
      <div className="mx-auto flex max-w-4xl flex-wrap items-center justify-center gap-4">
        <ColorTag active={!filter} onClick={() => setFilter("")}>
          All Shades
        </ColorTag>
        {colorCategories.map((category) => (
          <ColorTag
            key={category}
            color={category.toLowerCase()}
            active={filter === category}
            onClick={() => setFilter(category)}
          >
            {category}
          </ColorTag>
        ))}
      </div>
      <div
        ref={parentRef}
        className="mx-auto mt-40 grid max-w-7xl grid-cols-4 gap-x-8 gap-y-6"
      >
        {Object.entries(showColors).map(([category, colors]) => {
          return colors.map((color) => (
            <NameColorCard
              className="h-40"
              key={`${category}__${color.name}`}
              name={color.name}
              color={color.rgb}
              showInfo
              showLike
            />
          ))
        })}
      </div>
    </div>
  )
}

export default ColorsPage
