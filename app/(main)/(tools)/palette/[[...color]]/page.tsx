"use client"

import { useState } from "react"
import { nanoid } from "nanoid"

import { cn } from "@/lib/utils"
import { Color, generateColor } from "@/components/shared/color-picker"

import PaletteBlock from "./_components/PaletteBlock"
import Toolbar from "./_components/Toolbar"
import { usePaletteStore } from "./_store/palette"

interface IPaletteBlock {
  id: string
  color: Color
}

const ColorPalette = () => {
  // 获取路由的参数
  // 色板块颜色参数

  const setting = usePaletteStore((state) => state.setting)

  const [palette, setPalette] = useState<IPaletteBlock[]>([
    {
      id: nanoid(),
      color: generateColor("#2DE1C2"),
    },
    {
      id: nanoid(),
      color: generateColor("#6AD5CB"),
    },
    {
      id: nanoid(),
      color: generateColor("#7FBEAB"),
    },
    {
      id: nanoid(),
      color: generateColor("#7E998A"),
    },
    {
      id: nanoid(),
      color: generateColor("#85877C"),
    },
  ])

  const handleChange = (id: string, color: Color) => {
    const newPalette = [...palette]
    const idx = newPalette.findIndex((item) => item.id === id)
    newPalette[idx].color = color
    setPalette(newPalette)
  }

  return (
    <div className="flex h-screen w-full flex-col">
      <Toolbar />
      <div className="w-full grow">
        <div
          className={cn(
            "flex h-full w-full items-stretch justify-between",
            setting.isIsolated && "gap-x-4 p-4"
          )}
        >
          {palette.map((block, idx) => {
            return (
              <div
                key={idx}
                className="h-full w-full"
                style={{ flexGrow: 1, width: `${100 / palette.length}%` }}
              >
                <PaletteBlock
                  block={block}
                  onChange={(c) => handleChange(block.id, c)}
                />
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default ColorPalette
