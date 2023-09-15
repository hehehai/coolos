"use client"

import { useMemo, useState } from "react"
import { RGB } from "@ctrl/tinycolor"

import {
  generateColor,
  getRandomRgb,
  getTransitionColors,
  isSameRgb,
} from "@/components/shared/color-picker"
import HexInput from "@/components/shared/color-picker/components/HexInput"
import useColorState from "@/components/shared/color-picker/hooks/useColorState"
import ExpansionStrip from "@/components/shared/expansion-strip"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

const GradientPaletteFloat = () => {
  const [startColor, setStartColor] = useColorState(generateColor("#fff"))
  const [endColor, setEndColor] = useColorState(generateColor("#000"))
  const [steps, setSteps] = useState(7)

  const colors = useMemo(() => {
    return getTransitionColors(startColor, endColor, steps).map((item) =>
      item.toHexString()
    )
  }, [startColor, endColor, steps])

  const palette = useMemo(
    () => <ExpansionStrip className="h-[216px]" colors={colors} />,
    [colors]
  )

  const handleRandom = () => {
    const startRGB = getRandomRgb()
    let endRGB: RGB | null = null

    while (true) {
      endRGB = getRandomRgb()
      if (!isSameRgb(startRGB, endRGB)) {
        break
      }
    }

    setStartColor(generateColor(startRGB))
    setEndColor(generateColor(endRGB))
  }

  return (
    <div className="absolute right-8 top-8 w-[52%]">
      <div>{palette}</div>
      <div className="mt-10 flex items-end gap-4">
        <div className="grow">
          <HexInput value={startColor} onChange={(val) => setStartColor(val)} />
        </div>
        <div className="grow">
          <HexInput value={endColor} onChange={(val) => setEndColor(val)} />
        </div>
        <div className="grow">
          <Input
            className="text-center"
            type="number"
            value={steps}
            min={6}
            max={20}
            onChange={(e) => {
              const value = Number(e.target.value)
              if (Number.isNaN(value)) return
              setSteps(value)
            }}
          />
        </div>
        <div className="grow">
          <Button className="w-full" variant="outline" onClick={handleRandom}>
            Random
          </Button>
        </div>
      </div>
    </div>
  )
}

export default GradientPaletteFloat
