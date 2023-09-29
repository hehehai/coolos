import { create } from "zustand"

import { generateCombinedId } from "@/lib/utils"
import { Color, generateColor } from "@/components/shared/color-picker"

export enum PaletteSecondInfo {
  Name = "Name",
  HEX = "HEX",
  RGB = "RGB",
  HSB = "HSB",
  HSL = "HSL",
  CMYK = "CMYK",
  LAB = "LAB",
}

export interface IPaletteBlock {
  id: string
  color: Color
}

export type PaletteStoreState = {
  palette: IPaletteBlock[]
  setting: {
    secondInfo: PaletteSecondInfo
    isIsolated: boolean
    isZen: boolean
  }
}

export type PaletteStoreActions = {
  setSetting: (val: Partial<PaletteStoreState["setting"]>) => void
  setPalette: (val: IPaletteBlock[]) => void
}

const initialState: PaletteStoreState = {
  palette: ["#2DE1C2", "#6AD5CB", "#7FBEAB", "#7E998A", "#85877C"].map((c) => ({
    id: generateCombinedId(),
    color: generateColor(c),
  })),
  setting: {
    secondInfo: PaletteSecondInfo.Name,
    isIsolated: false,
    isZen: false,
  },
}

export const usePaletteStore = create<
  PaletteStoreState & PaletteStoreActions
>()((set) => ({
  ...initialState,
  setSetting: (val: Partial<PaletteStoreState["setting"]>) =>
    set((state) => ({
      setting: {
        ...state.setting,
        ...val,
      },
    })),
  setPalette: (val: IPaletteBlock[]) => set((state) => ({ palette: val })),
  reset: () => set(initialState),
}))
