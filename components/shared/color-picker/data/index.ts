import colors from "./colors.json"

export interface ColorName {
  key?: string
  name: string
  rgb: [number, number, number]
}

export type ColorCategory = keyof typeof colorCollection

export const colorCollection = colors

export const colorNames = Object.entries(colors).reduce(
  (acc, [category, items]) => {
    acc.push(
      ...items.map((item) => ({
        key: `${category}__${item.name}`,
        name: item.name,
        rgb: item.rgb as ColorName["rgb"],
      }))
    )
    return acc
  },
  [] as ColorName[]
)
