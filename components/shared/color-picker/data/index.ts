import colors from './colors.json'

export interface ColorName {
  name: string;
  rgb: [number, number, number];
}

export type ColorCategory = keyof typeof colorCollection

export const colorCollection = colors

export const colorNames = Object.values(colors).reduce((acc, items) => [...acc, ...items], [] as ColorName[])
