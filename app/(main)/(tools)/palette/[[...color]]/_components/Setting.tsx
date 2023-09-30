"use client"

import { memo } from "react"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import { SecondaryInfo } from "../_constants"
import { PaletteSecondInfo, useSettingStore } from "../_store/setting"

const PaletteSetting = memo(() => {
  const setting = useSettingStore((state) => state)
  const setSetting = useSettingStore((state) => state.setSetting)

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" size="sm">
          Setting
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Settings</DialogTitle>
        </DialogHeader>
        <div className="space-y-5">
          <div className="flex items-center justify-between">
            <div>Secondary info</div>
            <Select
              value={setting.secondInfo}
              onValueChange={(val: PaletteSecondInfo) =>
                setSetting({ secondInfo: val })
              }
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Color Second info" />
              </SelectTrigger>
              <SelectContent>
                {SecondaryInfo.map((item) => (
                  <SelectItem key={item} value={item}>
                    {item}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center justify-between">
            <div>Isolate mode</div>
            <Checkbox
              checked={setting.isIsolated}
              onCheckedChange={(val) => setSetting({ isIsolated: !!val })}
            />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
})

PaletteSetting.displayName = "PaletteSetting"

export default PaletteSetting
