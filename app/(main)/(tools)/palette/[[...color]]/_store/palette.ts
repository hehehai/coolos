import { create } from "zustand"

export enum PaletteSecondInfo {
  Name = "Name",
  HEX = "HEX",
  RGB = "RGB",
  HSB = "HSB",
  HSL = "HSL",
  CMYK = "CMYK",
  LAB = "LAB",
}

export type PaletteStoreState = {
  setting: {
    secondInfo: PaletteSecondInfo
    isIsolated: boolean
    isZen: boolean
  }
}

export type PaletteStoreActions = {
  setSetting: (val: Partial<PaletteStoreState["setting"]>) => void
}

const initialState: PaletteStoreState = {
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
  reset: () => set(initialState),
}))
