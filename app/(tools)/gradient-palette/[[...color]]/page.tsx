'use client';

import { generateColor, getTransitionColors } from "@/components/shared/color-picker"
import { useMemo, useState } from "react"
import { useSearchParams } from 'next/navigation'
import ExpansionStrip from "@/components/shared/expansion-strip";
import useColorState from "@/components/shared/color-picker/hooks/useColorState";
import HexInput from "@/components/shared/color-picker/components/HexInput";
import ColorPicker from "@/components/shared/color-picker/ColorPicker";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

const DEFAULT_STEPS = 6

const GradientPalette = ({ params }: { params: { colors?: string[] } }) => {
  // route color params
  const routeColor = useMemo(() => {
    const result = {
      start: generateColor('#fff'),
      end: generateColor('#000'),
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
    const steps = Number(searchParams.get('steps') ?? DEFAULT_STEPS)
    return Number.isNaN(steps) ? DEFAULT_STEPS : steps
  }, [searchParams])

  const [startColor, setStartColor] = useColorState(routeColor.start);
  const [endColor, setEndColor] = useColorState(routeColor.end);
  const [steps, setSteps] = useState(transitionSteps)

  const colors = useMemo(() => {
    return getTransitionColors(startColor, endColor, steps).map((item) => item.toHexString())
  }, [startColor, endColor, steps])

  return <div className="max-w-7xl mx-auto">
    <ExpansionStrip className="h-[380px]" colors={colors} />
    <div className="mt-10 flex items-end gap-10 p-8 border border-zinc-200 rounded-lg">
      <div className="grow">
        <div className="text-sm mb-2">Text color</div>
        <HexInput value={startColor} onChange={(val) => setStartColor(val)} popContent={
          <ColorPicker ghost value={startColor} onChange={(val) => setStartColor(val)} />
        } />
      </div>
      <div className="grow">
        <div className="text-sm mb-2">Background color</div>
        <HexInput value={endColor} onChange={(val) => setEndColor(val)} popContent={
          <ColorPicker ghost value={endColor} onChange={(val) => setEndColor(val)} />
        } />
      </div>
      <div className="grow">
        <div className="text-sm mb-2">Number of colors color</div>
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
        <Button className="w-full" variant="outline">Random</Button>
      </div>
      <div className="grow">
        <Button className="w-full">
          Export
          <Download className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  </div>
}

export default GradientPalette;