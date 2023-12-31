"use client"

import { useCallback, useMemo, useState } from "react"
import { useSearchParams } from "next/navigation"
import { RGB } from "@ctrl/tinycolor"
import { Download, ScreenShare } from "lucide-react"

import { downloadSVG, openSVGinNewTab } from "@/lib/utils"
import {
  generateColor,
  getRandomRgb,
  getTransitionColors,
  isSameRgb,
} from "@/components/shared/color-picker"
import ColorPicker from "@/components/shared/color-picker/ColorPicker"
import HexInput from "@/components/shared/color-picker/components/HexInput"
import useColorState from "@/components/shared/color-picker/hooks/useColorState"
import ExpansionStrip from "@/components/shared/ExpansionStrip"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

import { genGradientPaletteSVG } from "./_utils"

const DEFAULT_STEPS = 6

const GradientPalette = ({ params }: { params: { colors?: string[] } }) => {
  // route color params
  const routeColor = useMemo(() => {
    const result = {
      start: generateColor("#fff"),
      end: generateColor("#000"),
    }

    if (!params.colors?.length) return result
    const colors = params.colors[0]
    const [startStr, endStr] = colors.split("-")

    if (startStr) {
      const startColor = generateColor(startStr)
      if (startColor.isValid) {
        result.start = startColor
      }
    }
    if (endStr) {
      const endColor = generateColor(endStr)
      if (endColor.isValid) {
        result.end = endColor
      }
    }

    return result
  }, [params.colors])
  const searchParams = useSearchParams()

  const transitionSteps = useMemo(() => {
    const steps = Number(searchParams.get("steps") ?? DEFAULT_STEPS)
    return Number.isNaN(steps) ? DEFAULT_STEPS : steps
  }, [searchParams])

  const [startColor, setStartColor] = useColorState(routeColor.start)
  const [endColor, setEndColor] = useColorState(routeColor.end)
  const [steps, setSteps] = useState(transitionSteps)

  const colors = useMemo(() => {
    return getTransitionColors(startColor, endColor, steps).map((item) =>
      item.toHexString()
    )
  }, [startColor, endColor, steps])

  const palette = useMemo(
    () => <ExpansionStrip className="h-[380px]" colors={colors} />,
    [colors]
  )

  const handleRandom = () => {
    const startRGB = getRandomRgb()
    let endRGB: RGB | null = null

    do {
      endRGB = getRandomRgb()
    } while (isSameRgb(startRGB, endRGB))

    setStartColor(generateColor(startRGB))
    setEndColor(generateColor(endRGB))
  }

  const handleMakeSVG = useCallback(
    (open: boolean = false) => {
      const img = genGradientPaletteSVG(colors, 500, 200)
      if (open) {
        openSVGinNewTab(img)
      } else {
        downloadSVG(img)
      }
    },
    [colors]
  )

  return (
    <div className="mx-auto max-w-7xl">
      {palette}
      <div className="mt-10 flex items-end gap-10 rounded-lg border border-zinc-200 p-8">
        <div className="grow">
          <div className="mb-2 text-sm">Text color</div>
          <HexInput
            value={startColor}
            onChange={(val) => setStartColor(val)}
            popContent={
              <ColorPicker
                ghost
                value={startColor}
                onChange={(val) => setStartColor(val)}
              />
            }
          />
        </div>
        <div className="grow">
          <div className="mb-2 text-sm">Background color</div>
          <HexInput
            value={endColor}
            onChange={(val) => setEndColor(val)}
            popContent={
              <ColorPicker
                ghost
                value={endColor}
                onChange={(val) => setEndColor(val)}
              />
            }
          />
        </div>
        <div className="grow">
          <div className="mb-2 text-sm">Number of colors color</div>
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
        <div className="flex grow items-center space-x-2">
          <Button className="w-full" onClick={() => handleMakeSVG()}>
            Export
            <Download className="ml-2 h-4 w-4" />
          </Button>
          <Button className="w-12" onClick={() => handleMakeSVG(true)}>
            <ScreenShare className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}

export default GradientPalette
