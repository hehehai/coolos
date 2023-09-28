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

import { Secondary_Info } from "../_constants"
import { PaletteSecondInfo, usePaletteStore } from "../_store/palette"

const PaletteSetting = memo(() => {
  const setting = usePaletteStore((state) => state.setting)
  const setSetting = usePaletteStore((state) => state.setSetting)

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost">Setting</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Settings</DialogTitle>
        </DialogHeader>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div>Secondary info</div>
            <Select
              value={setting.secondInfo}
              onValueChange={(val: PaletteSecondInfo) =>
                setSetting({ secondInfo: val })
              }
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Theme" />
              </SelectTrigger>
              <SelectContent>
                {Secondary_Info.map((item) => (
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
          <div className="flex items-center justify-between">
            <div>Zen mode</div>
            <Checkbox
              checked={setting.isZen}
              onCheckedChange={(val) => setSetting({ isZen: !!val })}
            />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
})

PaletteSetting.displayName = "PaletteSetting"

export default PaletteSetting
