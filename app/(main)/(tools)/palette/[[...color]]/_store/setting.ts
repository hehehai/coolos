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

export type SettingStoreState = {
  secondInfo: PaletteSecondInfo
  isIsolated: boolean
}

export type SettingStoreActions = {
  setSetting: (val: Partial<SettingStoreState>) => void
}

const initialState: SettingStoreState = {
  secondInfo: PaletteSecondInfo.Name,
  isIsolated: false,
}

export const useSettingStore = create<
  SettingStoreState & SettingStoreActions
>()((set) => ({
  ...initialState,
  setSetting: (val: Partial<SettingStoreState>) =>
    set((state) => ({
      ...state,
      ...val,
    })),
  reset: () => set(initialState),
}))
