import { Color, colorAnalogous, colorComplementary, colorSplitComplementary, colorSquare, colorTetradic, colorTriadic, generateColor } from "@/components/shared/color-picker"
import { memo } from "react"
import ShowCard from "./ShowCard"
import ExpansionStrip from "@/components/shared/expansion-strip"

const harmoniesMap = [
  {
    label: 'Analogous',
    description: 'Analogous color schemes are made by picking three colors that are next to each other on the color wheel. They are perceived as calm and serene.',
    getColors: (color: Color) => colorAnalogous(color.toHsv()).map((rgb) => generateColor(rgb).toHexString())
  },
  {
    label: 'Complementary',
    description: 'Complementary color schemes are made by picking two opposite colors on the color wheel. They appear vibrant near to each other.',
    getColors: (color: Color) => colorComplementary(color.toHsv()).map((rgb) => generateColor(rgb).toHexString())
  },
  {
    label: 'Split complementary',
    description: 'Split complementary schemes are like complementary but they uses two adiacent colors of the complement. They are more flexible than complementary ones.',
    getColors: (color: Color) => colorSplitComplementary(color.toHsv()).map((rgb) => generateColor(rgb).toHexString())
  },
  {
    label: 'Triadic',
    description: 'Triadic color schemes are created by picking three colors equally spaced on the color wheel. They appear quite contrasted and multicolored.',
    getColors: (color: Color) => colorTriadic(color.toHsv()).map((rgb) => generateColor(rgb).toHexString())
  },
  {
    label: 'Tetradic',
    description: 'Tetradic color schemes are made form two couples of complementary colors in a rectangular shape on the color wheel. They are very versatile, and work best with one dominant color.',
    getColors: (color: Color) => colorTetradic(color.toHsv()).map((rgb) => generateColor(rgb).toHexString())
  },
  {
    label: 'Square',
    description: 'Square color schemes are like tetradic arranged in a square instead of rectangle. Colors appear even more contrasting.',
    getColors: (color: Color) => colorSquare(color.toHsv()).map((rgb) => generateColor(rgb).toHexString())
  },
]

const Harmonies = memo(({ color }: { color: Color }) =>
  <div className="grid gap-10 grid-cols-2">
    {harmoniesMap.map((harmonie) => {
      const colors = harmonie.getColors(color)
      return <ShowCard
        key={harmonie.label}
        title={harmonie.label}
        description={harmonie.description}
      >
        <ExpansionStrip className="h-20" colors={colors} />
      </ShowCard>
    })}
  </div>
)

Harmonies.displayName = 'Harmonies'

export default Harmonies
