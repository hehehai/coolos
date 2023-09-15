"use client"

import { useCallback, useMemo } from "react"

import { Color, defaultColor } from "@/components/shared/color-picker"
import BoxFloat, {
  BoxFloatProps,
} from "@/components/shared/color-picker/components/BoxFloat"
import {
  CalculateEvent,
  DragChangeEvent,
} from "@/components/shared/color-picker/hooks/useColorDrag"
import useColorState from "@/components/shared/color-picker/hooks/useColorState"
import {
  ColorGenInput,
  TransformOffset,
} from "@/components/shared/color-picker/interface"

export interface ColorBoxFloatProps
  extends Pick<
      BoxFloatProps,
      | "initOffset"
      | "direction"
      | "inside"
      | "disabled"
      | "layerPoints"
      | "layerPointClassName"
      | "layerGradientClassName"
    >,
    Omit<React.ComponentPropsWithoutRef<"div">, "defaultValue" | "onChange"> {
  value?: ColorGenInput
  defaultValue?: ColorGenInput
  colorToOffset: (
    event: CalculateEvent,
    color: Color
  ) => TransformOffset | undefined
  offsetToColor: (
    offset: TransformOffset,
    event: DragChangeEvent,
    color: Color
  ) => Color | undefined
  onChange?: (color: Color) => void
  float?: JSX.Element | ((color: Color) => JSX.Element)
  layerGradientStyle?:
    | React.CSSProperties
    | ((color: Color) => React.CSSProperties)
}

const ColorBoxFloat = ({
  value,
  defaultValue,
  colorToOffset,
  offsetToColor,
  onChange,
  float,
  layerGradientStyle,

  ...rest
}: ColorBoxFloatProps) => {
  const [color, setColor] = useColorState(defaultColor, {
    value,
    defaultValue,
  })

  const floatNode = useMemo(() => {
    if (typeof float === "function") {
      return float(color)
    }
    return float
  }, [color, float])

  const layerGradientStyleData = useMemo(() => {
    if (typeof layerGradientStyle === "function") {
      return layerGradientStyle(color)
    }
    return layerGradientStyle
  }, [color, layerGradientStyle])

  const offsetCalculate = useCallback(
    (event: CalculateEvent, pointColor?: Color) => {
      return colorToOffset?.(event, pointColor ?? color)
    },
    [colorToOffset, color]
  )

  const handleChange = useCallback(
    (offset: TransformOffset, event: DragChangeEvent) => {
      const newColor = offsetToColor?.(offset, event, color)
      if (newColor) {
        setColor(newColor)
        onChange?.(newColor)
      }
    },
    [offsetToColor, onChange, color, setColor]
  )

  return (
    <BoxFloat
      offsetCalculate={offsetCalculate}
      onChange={handleChange}
      layerGradientStyle={layerGradientStyleData}
      float={floatNode}
      {...rest}
    />
  )
}

export default ColorBoxFloat
