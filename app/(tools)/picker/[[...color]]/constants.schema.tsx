import ContrastChecker from "./_components/ContrastChecker"
import Conversion from "./_components/Conversion"
import Harmonies from "./_components/Harmonies"
import Variations from "./_components/Variations"

export const navItems = {
  conversion: {
    label: "Conversion",
    description:
      "Convert colors between different color models like RGB, HSL, HSV, CMYK and more.",
    Component: Conversion,
  },
  variations: {
    label: "Variations",
    description:
      "View this color variations of shades, tints, tones, hues and temperatures.",
    Component: Variations,
  },
  colorHarmonies: {
    label: "Color harmonies",
    description:
      "Color harmonies are pleasing color schemes created according to their position on a color wheel.",
    Component: Harmonies,
  },
  contrastChecker: {
    label: "Contrast checker",
    description:
      "Verify the contrast of a text on white and black backgrounds.",
    Component: ContrastChecker,
  },
}

export type NavItems = typeof navItems
