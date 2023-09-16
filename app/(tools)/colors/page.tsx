"use client"

import { useMemo, useState } from "react"

import { cn } from "@/lib/utils"
import {
  ColorCategory,
  colorCollection,
} from "@/components/shared/color-picker/data"

import NameColorCard from "./_components/NameColorCard"

const colorCategories = Object.keys(colorCollection) as ColorCategory[]

interface ColorTagProps extends React.ComponentPropsWithoutRef<"div"> {
  color?: string
  active?: boolean
}

const ColorTag = ({
  color,
  active,
  children,
  ...otherProps
}: ColorTagProps) => {
  return (
    <div
      {...otherProps}
      className={cn(
        "flex cursor-pointer items-center space-x-2 rounded-lg bg-zinc-100 px-4 py-2 hover:bg-zinc-200",
        { "text-blue-600 bg-blue-100": active },
        otherProps.className
      )}
    >
      {color && (
        <div
          className="h-3 w-3 rounded-full shadow-[inset_rgba(0,0,0,0.08)_0_0_0_1px]"
          style={{ backgroundColor: color }}
        />
      )}
      <div className="text-sm">{children}</div>
    </div>
  )
}

const ColorsPage = () => {
  const [filter, setFilter] = useState<ColorCategory | "">("")

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
      <div className="mx-auto mt-40 grid max-w-7xl grid-cols-4 gap-x-8 gap-y-6">
        {Object.entries(showColors).map(([category, colors]) => {
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

export default ColorsPage
