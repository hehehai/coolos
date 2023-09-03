'use client';

import { ColorCategory, colorCollection, colorNames } from "@/components/shared/color-picker/data"
import { cn } from "@/lib/utils"
import { useMemo, useState } from "react"
import NameColorCard from "./components/NameColorCard"

const colorCategories = Object.keys(colorCollection) as ColorCategory[]

interface ColorTagProps extends React.ComponentPropsWithoutRef<'div'> {
  color?: string,
  active?: boolean
}

const ColorTag = ({ color, active, children, ...otherProps }: ColorTagProps) => {
  return <div {...otherProps} className={cn("flex items-center px-4 py-2 rounded-lg bg-zinc-100 space-x-2 cursor-pointer hover:bg-zinc-200", { 'text-blue-600 bg-blue-100': active }, otherProps.className)}>
    {color && <div className="w-3 h-3 rounded-full shadow-[inset_rgba(0,0,0,0.08)_0_0_0_1px]" style={{ backgroundColor: color }} />}
    <div className="text-sm">{children}</div>
  </div>
}

const ColorsPage = () => {
  const [filter, setFilter] = useState<ColorCategory | ''>('')

  const showColors = useMemo(() => {
    if (!filter) return colorNames
    const colors = colorCollection[filter]
    if (!colors) return []
    return colors
  }, [filter])

  return <div>
    <div className="max-w-4xl mx-auto flex flex-wrap items-center justify-center gap-4">
      <ColorTag active={!filter} onClick={() => setFilter('')}>All Shades</ColorTag>
      {colorCategories.map((category) =>
        <ColorTag
          key={category}
          color={category.toLowerCase()}
          active={filter === category}
          onClick={() => setFilter(category)}
        >
          {category}
        </ColorTag>
      )}
    </div>
    <div className="mt-40 max-w-7xl mx-auto grid grid-cols-4 gap-x-8 gap-y-6">
      {showColors.map((color) => {
        return <NameColorCard key={color.name} name={color.name} color={color.rgb} />
      })}
    </div>
  </div>
}

export default ColorsPage
