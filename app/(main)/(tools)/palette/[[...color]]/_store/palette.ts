import { temporal } from "zundo"
import type { TemporalState } from "zundo"
import { create } from "zustand"
import { useStoreWithEqualityFn } from "zustand/traditional"

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
}

export type PaletteStoreActions = {
  setPalette: (val: IPaletteBlock[]) => void
}

const initialState: PaletteStoreState = {
  palette: ["#2DE1C2", "#6AD5CB", "#7FBEAB", "#7E998A", "#85877C"].map((c) => ({
    id: generateCombinedId(),
    color: generateColor(c),
  })),
}

export const usePaletteStore = create<
  PaletteStoreState & PaletteStoreActions
>()(
  temporal((set) => ({
    ...initialState,
    setPalette: (val: IPaletteBlock[]) => set((state) => ({ palette: val })),
    reset: () => set(initialState),
  }))
)

export const usePaletteTemporal = <T>(
  selector: (
    state: TemporalState<PaletteStoreState & PaletteStoreActions>
  ) => T,
  equality?: (a: T, b: T) => boolean
) => useStoreWithEqualityFn(usePaletteStore.temporal, selector, equality)
