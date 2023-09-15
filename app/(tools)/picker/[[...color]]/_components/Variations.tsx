import { memo } from "react"

import {
  Color,
  generateColor,
  generateHues,
  generateVariations,
} from "@/components/shared/color-picker"
import ExpansionStrip from "@/components/shared/expansion-strip"

import ShowCard from "./ShowCard"

const variationMap = [
  {
    label: "Shades",
    description:
      "A shade is created by adding black to a base color, increasing its darkness. Shades appear more dramatic and richer.",
    getColors: (color: Color) =>
      generateVariations(color.toRgb(), 15).map((rgb) =>
        generateColor(rgb).toHexString()
      ),
  },
  {
    label: "Tints",
    description:
      "A tint is created by adding white to a base color, increasing its lightness. Tints are likely to look pastel and less intense.",
    getColors: (color: Color) =>
      generateVariations(color.toRgb(), 15, { r: 255, g: 255, b: 255 }).map(
        (rgb) => generateColor(rgb).toHexString()
      ),
  },
  {
    label: "Tones",
    description:
      "A tone is created by adding gray to a base color, increasing its lightness. Tones looks more sophisticated and complex than base colors.",
    getColors: (color: Color) =>
      generateVariations(color.toRgb(), 15, {
        r: 127.5,
        g: 127.5,
        b: 127.5,
      }).map((rgb) => generateColor(rgb).toHexString()),
  },
  {
    label: "Hues",
    description:
      "A hue refers to the basic family of a color from red to violet. Hues are variations of a base color on the color wheel.",
    getColors: (color: Color) =>
      generateHues(color.toHsv(), 15).map((rgb) =>
        generateColor(rgb).toHexString()
      ),
  },
]

const Variations = memo(({ color }: { color: Color }) => (
  <div className="space-y-10">
    {variationMap.map((variation) => {
      const colors = variation.getColors(color)
      return (
        <ShowCard
          key={variation.label}
          title={variation.label}
          description={variation.description}
        >
          <ExpansionStrip className="h-20" colors={colors} />
        </ShowCard>
      )
    })}
  </div>
))

Variations.displayName = "Variations"

export default Variations
