import { create } from "zustand"

import { PaletteSecondInfo } from "@/components/shared/color-picker/interface"

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
