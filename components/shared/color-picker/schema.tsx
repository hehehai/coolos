import { Color } from "@/components/shared/color-picker/color"
import { ColorBoxFloatProps } from "@/components/shared/color-picker/components/ColorBoxFloat"
import Float from "@/components/shared/color-picker/components/Float"
import {
  CalculateEvent,
  DragChangeEvent,
} from "@/components/shared/color-picker/hooks/useColorDrag"
import { TransformOffset } from "@/components/shared/color-picker/interface"
import {
  generateColor,
  getFullAlphaColor,
  round,
} from "@/components/shared/color-picker/util"

export enum ColorAtomSchemaType {
  HueSlider,
  SaturationSlider,
  SaturationBox,
  AlphaSlider,
  BrightnessSlider,
  HSL_SaturationSlider,
  HSL_LuminanceSlider,
  RGB_Red,
  RGB_Green,
  RGB_Blue,
  CMYK_Cyan,
  CMYK_Magenta,
  CMYK_Yellow,
  CMYK_Black,
  LAB_Luminance,
  LAB_A,
  LAB_B,
}

const commonPropsSchema: Partial<ColorBoxFloatProps> = {
  initOffset: { x: 0, y: -5 },
}

const colorAtomPropsSchema: Record<ColorAtomSchemaType, ColorBoxFloatProps> = {
  [ColorAtomSchemaType.HueSlider]: {
    colorToOffset: (
      { trackWidth, centerOffsetX, offsetY }: CalculateEvent,
      color: Color
    ) => {
      const hsb = color.toHsb()

      return {
        x: (hsb.h / 360) * trackWidth - centerOffsetX,
        y: offsetY,
      }
    },
    offsetToColor: (
      offset: TransformOffset,
      { centerOffsetX, trackWidth }: DragChangeEvent,
      color: Color
    ) => {
      const xValue = (offset.x + centerOffsetX) / trackWidth
      const hueColor = xValue * 360

      return generateColor({
        ...color.toHsb(),
        h: hueColor <= 0 ? 0 : hueColor,
      })
    },
    className: "w-full h-[10px] rounded-full",
    direction: "x",
    layerGradientStyle: {
      backgroundImage:
        "linear-gradient(to right, #f00 0%, #ff0 17%, #0f0 33%, #0ff 50%, #00f 67%, #f0f 83%, #f00 100%)",
    },
    layerGradientClassName:
      "rounded-full shadow-[inset_0_0_0_1px_rgba(0,0,0,0.08)]",
    float: (color) => <Float color={`hsl(${color?.toHsb().h},100%, 50%)`} />,
  },
  [ColorAtomSchemaType.SaturationBox]: {
    colorToOffset: (
      { trackWidth, trackHeight, centerOffsetX, centerOffsetY }: CalculateEvent,
      color: Color
    ) => {
      const hsb = color.toHsb()

      return {
        x: hsb.s * trackWidth - centerOffsetX,
        y: (1 - hsb.b) * trackHeight - centerOffsetY,
      }
    },
    offsetToColor: (
      offset: TransformOffset,
      event: DragChangeEvent,
      color: Color
    ) => {
      const xValue = (offset.x + event.centerOffsetX) / event.trackWidth
      const hsb = color.toHsb()
      const bright = 1 - (offset.y + event.centerOffsetY) / event.trackHeight

      return generateColor({
        h: hsb.h,
        s: xValue <= 0 ? 0 : xValue,
        b: bright >= 1 ? 1 : bright,
        a: hsb.a,
      })
    },
    className: "w-full h-[calc(100%-83px)] rounded-md",
    layerGradientStyle: (color) => ({
      backgroundColor: `hsl(${color.toHsb().h}, 100%, 50%)`,
      backgroundImage:
        "linear-gradient(0deg, rgb(0, 0, 0), transparent), linear-gradient(90deg, rgb(255, 255, 255), rgba(255, 255, 255, 0))",
    }),
    layerGradientClassName:
      "rounded-md shadow-[inset_0px_0px_0px_1px_rgba(0,0,0,0.075)]",
    float: (color) => <Float color={color.toRgbString()} />,
  },
  [ColorAtomSchemaType.AlphaSlider]: {
    colorToOffset: (
      { trackWidth, centerOffsetX, offsetY }: CalculateEvent,
      color: Color
    ) => {
      const hsb = color.toHsb()

      return {
        x: hsb.a * trackWidth - centerOffsetX,
        y: offsetY,
      }
    },
    offsetToColor: (
      offset: TransformOffset,
      { centerOffsetX, trackWidth }: DragChangeEvent,
      color: Color
    ) => {
      const xValue = (offset.x + centerOffsetX) / trackWidth

      return generateColor({
        ...color.toHsb(),
        a: xValue <= 0 ? 0 : xValue,
      })
    },
    direction: "x",
    className: "w-full h-[10px] rounded-full bg-[length:8px_8px]",
    style: {
      backgroundImage:
        "conic-gradient(rgba(0, 0, 0, 0.06) 0 25%,transparent 0 50%,rgba(0, 0, 0, 0.06) 0 75%,transparent 0)",
    },
    layerGradientStyle: (color) => ({
      backgroundImage: `linear-gradient(to right, rgba(255, 0, 4, 0) 0%, ${getFullAlphaColor(
        color
      )}`,
    }),
    layerGradientClassName:
      "rounded-full shadow-[insert_0_0_0_1px_rgba(0,0,0,0.08)]",
    float: (color) => <Float color={color.toHex8String()} alphaBackground />,
  },
  [ColorAtomSchemaType.SaturationSlider]: {
    colorToOffset: (
      { trackWidth, centerOffsetX, offsetY }: CalculateEvent,
      color: Color
    ) => {
      const hsb = color.toHsb()

      return {
        x: hsb.s * trackWidth - centerOffsetX,
        y: offsetY,
      }
    },
    offsetToColor: (
      offset: TransformOffset,
      { centerOffsetX, trackWidth }: DragChangeEvent,
      color: Color
    ) => {
      const xValue = (offset.x + centerOffsetX) / trackWidth

      return generateColor({
        ...color.toHsb(),
        s: xValue <= 0 ? 0 : xValue,
      })
    },
    className: "w-full h-[10px] rounded-full",
    direction: "x",
    layerGradientStyle: (color) => {
      const hsb = color.toHsb()
      const gradient = [
        generateColor({ ...hsb, s: 0 }).toRgbString(),
        generateColor({ ...hsb, s: 50 }).toRgbString(),
        generateColor({ ...hsb, s: 100 }).toRgbString(),
      ].join(", ")

      return {
        backgroundImage: `linear-gradient(to right, ${gradient})`,
      }
    },
    layerGradientClassName:
      "rounded-full shadow-[inset_0_0_0_1px_rgba(0,0,0,0.08)]",
    float: (color) => <Float color={color.toRgbString()} />,
  },
  [ColorAtomSchemaType.BrightnessSlider]: {
    colorToOffset: (
      { trackWidth, centerOffsetX, offsetY }: CalculateEvent,
      color: Color
    ) => {
      const hsb = color.toHsb()

      return {
        x: hsb.b * trackWidth - centerOffsetX,
        y: offsetY,
      }
    },
    offsetToColor: (
      offset: TransformOffset,
      { centerOffsetX, trackWidth }: DragChangeEvent,
      color: Color
    ) => {
      const xValue = (offset.x + centerOffsetX) / trackWidth

      return generateColor({
        ...color.toHsb(),
        b: xValue <= 0 ? 0 : xValue,
      })
    },
    className: "w-full h-[10px] rounded-full",
    direction: "x",
    layerGradientStyle: (color) => {
      const hsb = color.toHsb()
      const gradient = [
        generateColor({ ...hsb, b: 0 }).toRgbString(),
        generateColor({ ...hsb, b: 50 }).toRgbString(),
        generateColor({ ...hsb, b: 100 }).toRgbString(),
      ].join(", ")

      return {
        backgroundImage: `linear-gradient(to right, ${gradient})`,
      }
    },
    layerGradientClassName:
      "rounded-full shadow-[inset_0_0_0_1px_rgba(0,0,0,0.08)]",
    float: (color) => <Float color={color.toRgbString()} />,
  },
  [ColorAtomSchemaType.HSL_SaturationSlider]: {
    colorToOffset: (
      { trackWidth, centerOffsetX, offsetY }: CalculateEvent,
      color: Color
    ) => {
      const hsl = color.toHsl()

      return {
        x: hsl.s * trackWidth - centerOffsetX,
        y: offsetY,
      }
    },
    offsetToColor: (
      offset: TransformOffset,
      { centerOffsetX, trackWidth }: DragChangeEvent,
      color: Color
    ) => {
      const xValue = (offset.x + centerOffsetX) / trackWidth

      return generateColor({
        ...color.toHsl(),
        s: xValue <= 0 ? 0 : xValue,
      })
    },
    className: "w-full h-[10px] rounded-full",
    direction: "x",
    layerGradientStyle: (color) => {
      const hsl = color.toHsl()
      const gradient = [
        generateColor({ ...hsl, s: 0 }).toRgbString(),
        generateColor({ ...hsl, s: 50 }).toRgbString(),
        generateColor({ ...hsl, s: 100 }).toRgbString(),
      ].join(", ")

      return {
        backgroundImage: `linear-gradient(to right, ${gradient})`,
      }
    },
    layerGradientClassName:
      "rounded-full shadow-[inset_0_0_0_1px_rgba(0,0,0,0.08)]",
    float: (color) => <Float color={color.toRgbString()} />,
  },
  [ColorAtomSchemaType.HSL_LuminanceSlider]: {
    colorToOffset: (
      { trackWidth, centerOffsetX, offsetY }: CalculateEvent,
      color: Color
    ) => {
      const hsl = color.toHsl()

      return {
        x: hsl.l * trackWidth - centerOffsetX,
        y: offsetY,
      }
    },
    offsetToColor: (
      offset: TransformOffset,
      { centerOffsetX, trackWidth }: DragChangeEvent,
      color: Color
    ) => {
      const xValue = (offset.x + centerOffsetX) / trackWidth

      return generateColor({
        ...color.toHsl(),
        l: xValue <= 0 ? 0 : xValue,
      })
    },
    className: "w-full h-[10px] rounded-full",
    direction: "x",
    layerGradientStyle: (color) => {
      const hsl = color.toHsl()
      const gradient = [
        generateColor({ ...hsl, l: 0 }).toRgbString(),
        generateColor({ ...hsl, l: 50 }).toRgbString(),
        generateColor({ ...hsl, l: 100 }).toRgbString(),
      ].join(", ")

      return {
        backgroundImage: `linear-gradient(to right, ${gradient})`,
      }
    },
    layerGradientClassName:
      "rounded-full shadow-[inset_0_0_0_1px_rgba(0,0,0,0.08)]",
    float: (color) => <Float color={color.toRgbString()} />,
  },
  [ColorAtomSchemaType.RGB_Red]: {
    colorToOffset: (
      { trackWidth, centerOffsetX, offsetY }: CalculateEvent,
      color: Color
    ) => {
      const rgb = color.toRgb()

      return {
        x: (rgb.r / 255) * trackWidth - centerOffsetX,
        y: offsetY,
      }
    },
    offsetToColor: (
      offset: TransformOffset,
      { centerOffsetX, trackWidth }: DragChangeEvent,
      color: Color
    ) => {
      const xValue = (offset.x + centerOffsetX) / trackWidth
      const newColor = xValue * 255

      return generateColor({
        ...color.toRgb(),
        r: newColor <= 0 ? 0 : newColor,
      })
    },
    className: "w-full h-[10px] rounded-full",
    direction: "x",
    layerGradientStyle: (color) => {
      const rgb = color.toRgb()
      const gradient = [
        generateColor({ ...rgb, r: 0 }).toRgbString(),
        generateColor({ ...rgb, r: 127.5 }).toRgbString(),
        generateColor({ ...rgb, r: 255 }).toRgbString(),
      ].join(", ")

      return {
        backgroundImage: `linear-gradient(to right, ${gradient})`,
      }
    },
    layerGradientClassName:
      "rounded-full shadow-[inset_0_0_0_1px_rgba(0,0,0,0.08)]",
    float: (color) => <Float color={color.toRgbString()} />,
  },
  [ColorAtomSchemaType.RGB_Green]: {
    colorToOffset: (
      { trackWidth, centerOffsetX, offsetY }: CalculateEvent,
      color: Color
    ) => {
      const rgb = color.toRgb()

      return {
        x: (rgb.g / 255) * trackWidth - centerOffsetX,
        y: offsetY,
      }
    },
    offsetToColor: (
      offset: TransformOffset,
      { centerOffsetX, trackWidth }: DragChangeEvent,
      color: Color
    ) => {
      const xValue = (offset.x + centerOffsetX) / trackWidth
      const newColor = xValue * 255

      return generateColor({
        ...color.toRgb(),
        g: newColor <= 0 ? 0 : newColor,
      })
    },
    className: "w-full h-[10px] rounded-full",
    direction: "x",
    layerGradientStyle: (color) => {
      const rgb = color.toRgb()
      const gradient = [
        generateColor({ ...rgb, g: 0 }).toRgbString(),
        generateColor({ ...rgb, g: 127.5 }).toRgbString(),
        generateColor({ ...rgb, g: 255 }).toRgbString(),
      ].join(", ")

      return {
        backgroundImage: `linear-gradient(to right, ${gradient})`,
      }
    },
    layerGradientClassName:
      "rounded-full shadow-[inset_0_0_0_1px_rgba(0,0,0,0.08)]",
    float: (color) => <Float color={color.toRgbString()} />,
  },
  [ColorAtomSchemaType.RGB_Blue]: {
    colorToOffset: (
      { trackWidth, centerOffsetX, offsetY }: CalculateEvent,
      color: Color
    ) => {
      const rgb = color.toRgb()

      return {
        x: (rgb.b / 255) * trackWidth - centerOffsetX,
        y: offsetY,
      }
    },
    offsetToColor: (
      offset: TransformOffset,
      { centerOffsetX, trackWidth }: DragChangeEvent,
      color: Color
    ) => {
      const xValue = (offset.x + centerOffsetX) / trackWidth
      const newColor = xValue * 255

      return generateColor({
        ...color.toRgb(),
        b: newColor <= 0 ? 0 : newColor,
      })
    },
    className: "w-full h-[10px] rounded-full",
    direction: "x",
    layerGradientStyle: (color) => {
      const rgb = color.toRgb()
      const gradient = [
        generateColor({ ...rgb, b: 0 }).toRgbString(),
        generateColor({ ...rgb, b: 127.5 }).toRgbString(),
        generateColor({ ...rgb, b: 255 }).toRgbString(),
      ].join(", ")

      return {
        backgroundImage: `linear-gradient(to right, ${gradient})`,
      }
    },
    layerGradientClassName:
      "rounded-full shadow-[inset_0_0_0_1px_rgba(0,0,0,0.08)]",
    float: (color) => <Float color={color.toRgbString()} />,
  },
  [ColorAtomSchemaType.CMYK_Cyan]: {
    colorToOffset: (
      { trackWidth, centerOffsetX, offsetY }: CalculateEvent,
      color: Color
    ) => {
      const cmyk = color.toCmyk()

      return {
        x: (cmyk.c / 100) * trackWidth - centerOffsetX,
        y: offsetY,
      }
    },
    offsetToColor: (
      offset: TransformOffset,
      { centerOffsetX, trackWidth }: DragChangeEvent,
      color: Color
    ) => {
      const xValue = ((offset.x + centerOffsetX) / trackWidth) * 100
      const newColor = Color.cmykToRgb({
        ...color.toCmyk(),
        c: xValue <= 0 ? 0 : xValue,
      })

      return generateColor(newColor)
    },
    className: "w-full h-[10px] rounded-full",
    direction: "x",
    layerGradientStyle: (color) => {
      const cmyk = color.toCmyk()
      const gradient = [
        Color.cmykToRgbString({ ...cmyk, c: 0 }),
        Color.cmykToRgbString({ ...cmyk, c: 50 }),
        Color.cmykToRgbString({ ...cmyk, c: 100 }),
      ].join(", ")

      return {
        backgroundImage: `linear-gradient(to right, ${gradient})`,
      }
    },
    layerGradientClassName:
      "rounded-full shadow-[inset_0_0_0_1px_rgba(0,0,0,0.08)]",
    float: (color) => <Float color={color.toRgbString()} />,
  },
  [ColorAtomSchemaType.CMYK_Magenta]: {
    colorToOffset: (
      { trackWidth, centerOffsetX, offsetY }: CalculateEvent,
      color: Color
    ) => {
      const cmyk = color.toCmyk()

      return {
        x: (cmyk.m / 100) * trackWidth - centerOffsetX,
        y: offsetY,
      }
    },
    offsetToColor: (
      offset: TransformOffset,
      { centerOffsetX, trackWidth }: DragChangeEvent,
      color: Color
    ) => {
      const xValue = ((offset.x + centerOffsetX) / trackWidth) * 100
      const newColor = Color.cmykToRgb({
        ...color.toCmyk(),
        m: xValue <= 0 ? 0 : xValue,
      })

      return generateColor(newColor)
    },
    className: "w-full h-[10px] rounded-full",
    direction: "x",
    layerGradientStyle: (color) => {
      const cmyk = color.toCmyk()
      const gradient = [
        Color.cmykToRgbString({ ...cmyk, m: 0 }),
        Color.cmykToRgbString({ ...cmyk, m: 50 }),
        Color.cmykToRgbString({ ...cmyk, m: 100 }),
      ].join(", ")

      return {
        backgroundImage: `linear-gradient(to right, ${gradient})`,
      }
    },
    layerGradientClassName:
      "rounded-full shadow-[inset_0_0_0_1px_rgba(0,0,0,0.08)]",
    float: (color) => <Float color={color.toRgbString()} />,
  },
  [ColorAtomSchemaType.CMYK_Yellow]: {
    colorToOffset: (
      { trackWidth, centerOffsetX, offsetY }: CalculateEvent,
      color: Color
    ) => {
      const cmyk = color.toCmyk()

      return {
        x: (cmyk.y / 100) * trackWidth - centerOffsetX,
        y: offsetY,
      }
    },
    offsetToColor: (
      offset: TransformOffset,
      { centerOffsetX, trackWidth }: DragChangeEvent,
      color: Color
    ) => {
      const xValue = ((offset.x + centerOffsetX) / trackWidth) * 100
      const newColor = Color.cmykToRgb({
        ...color.toCmyk(),
        y: xValue <= 0 ? 0 : xValue,
      })

      return generateColor(newColor)
    },
    className: "w-full h-[10px] rounded-full",
    direction: "x",
    layerGradientStyle: (color) => {
      const cmyk = color.toCmyk()
      const gradient = [
        Color.cmykToRgbString({ ...cmyk, y: 0 }),
        Color.cmykToRgbString({ ...cmyk, y: 50 }),
        Color.cmykToRgbString({ ...cmyk, y: 100 }),
      ].join(", ")

      return {
        backgroundImage: `linear-gradient(to right, ${gradient})`,
      }
    },
    layerGradientClassName:
      "rounded-full shadow-[inset_0_0_0_1px_rgba(0,0,0,0.08)]",
    float: (color) => <Float color={color.toRgbString()} />,
  },
  [ColorAtomSchemaType.CMYK_Black]: {
    colorToOffset: (
      { trackWidth, centerOffsetX, offsetY }: CalculateEvent,
      color: Color
    ) => {
      const cmyk = color.toCmyk()

      return {
        x: (cmyk.k / 100) * trackWidth - centerOffsetX,
        y: offsetY,
      }
    },
    offsetToColor: (
      offset: TransformOffset,
      { centerOffsetX, trackWidth }: DragChangeEvent,
      color: Color
    ) => {
      const xValue = ((offset.x + centerOffsetX) / trackWidth) * 100
      const newColor = Color.cmykToRgb({
        ...color.toCmyk(),
        k: xValue <= 0 ? 0 : xValue,
      })

      return generateColor(newColor)
    },
    className: "w-full h-[10px] rounded-full",
    direction: "x",
    layerGradientStyle: (color) => {
      const cmyk = color.toCmyk()
      const gradient = [
        Color.cmykToRgbString({ ...cmyk, k: 0 }),
        Color.cmykToRgbString({ ...cmyk, k: 50 }),
        Color.cmykToRgbString({ ...cmyk, k: 100 }),
      ].join(", ")

      return {
        backgroundImage: `linear-gradient(to right, ${gradient})`,
      }
    },
    layerGradientClassName:
      "rounded-full shadow-[inset_0_0_0_1px_rgba(0,0,0,0.08)]",
    float: (color) => <Float color={color.toRgbString()} />,
  },
  [ColorAtomSchemaType.LAB_Luminance]: {
    colorToOffset: (
      { trackWidth, centerOffsetX, offsetY }: CalculateEvent,
      color: Color
    ) => {
      const lab = color.toLab()

      return {
        x: (lab.l / 100) * trackWidth - centerOffsetX,
        y: offsetY,
      }
    },
    offsetToColor: (
      offset: TransformOffset,
      { centerOffsetX, trackWidth }: DragChangeEvent,
      color: Color
    ) => {
      const xValue = ((offset.x + centerOffsetX) / trackWidth) * 100
      const newColor = Color.labToRgb({
        ...color.toLab(),
        l: xValue <= 0 ? 0 : xValue,
      })

      return generateColor(newColor)
    },
    className: "w-full h-[10px] rounded-full",
    direction: "x",
    layerGradientStyle: (color) => {
      const lab = color.toLab()
      const gradient = [
        Color.labToRgbString({ ...lab, l: 0 }),
        Color.labToRgbString({ ...lab, l: 50 }),
        Color.labToRgbString({ ...lab, l: 100 }),
      ].join(", ")

      return {
        backgroundImage: `linear-gradient(to right, ${gradient})`,
      }
    },
    layerGradientClassName:
      "rounded-full shadow-[inset_0_0_0_1px_rgba(0,0,0,0.08)]",
    float: (color) => <Float color={color.toRgbString()} />,
  },
  [ColorAtomSchemaType.LAB_A]: {
    colorToOffset: (
      { trackWidth, centerOffsetX, offsetY }: CalculateEvent,
      color: Color
    ) => {
      const lab = color.toLab()

      return {
        x: ((lab.a + 128) / 255) * trackWidth - centerOffsetX,
        y: offsetY,
      }
    },
    offsetToColor: (
      offset: TransformOffset,
      { centerOffsetX, trackWidth }: DragChangeEvent,
      color: Color
    ) => {
      let xValue = (offset.x + centerOffsetX) / trackWidth
      xValue = round(xValue * 255) - 128
      const newColor = Color.labToRgb({
        ...color.toLab(),
        a: xValue <= -128 ? -128 : xValue,
      })

      return generateColor(newColor)
    },
    className: "w-full h-[10px] rounded-full",
    direction: "x",
    layerGradientStyle: (color) => {
      const lab = color.toLab()
      const gradient = [
        Color.labToRgbString({ ...lab, a: -128 }),
        Color.labToRgbString({ ...lab, a: 0 }),
        Color.labToRgbString({ ...lab, a: 127 }),
      ].join(", ")

      return {
        backgroundImage: `linear-gradient(to right, ${gradient})`,
      }
    },
    layerGradientClassName:
      "rounded-full shadow-[inset_0_0_0_1px_rgba(0,0,0,0.08)]",
    float: (color) => <Float color={color.toRgbString()} />,
  },
  [ColorAtomSchemaType.LAB_B]: {
    colorToOffset: (
      { trackWidth, centerOffsetX, offsetY }: CalculateEvent,
      color: Color
    ) => {
      const lab = color.toLab()

      return {
        x: ((lab.b + 128) / 255) * trackWidth - centerOffsetX,
        y: offsetY,
      }
    },
    offsetToColor: (
      offset: TransformOffset,
      { centerOffsetX, trackWidth }: DragChangeEvent,
      color: Color
    ) => {
      let xValue = (offset.x + centerOffsetX) / trackWidth
      xValue = round(xValue * 255) - 128
      const newColor = Color.labToRgb({
        ...color.toLab(),
        b: xValue <= -128 ? -128 : xValue,
      })

      return generateColor(newColor)
    },
    className: "w-full h-[10px] rounded-full",
    direction: "x",
    layerGradientStyle: (color) => {
      const lab = color.toLab()
      const gradient = [
        Color.labToRgbString({ ...lab, b: -128 }),
        Color.labToRgbString({ ...lab, b: 0 }),
        Color.labToRgbString({ ...lab, b: 127 }),
      ].join(", ")

      return {
        backgroundImage: `linear-gradient(to right, ${gradient})`,
      }
    },
    layerGradientClassName:
      "rounded-full shadow-[inset_0_0_0_1px_rgba(0,0,0,0.08)]",
    float: (color) => <Float color={color.toRgbString()} />,
  },
}

export function getColorAtomPropsSchema(type: ColorAtomSchemaType) {
  return {
    ...commonPropsSchema,
    ...colorAtomPropsSchema[type],
  }
}
