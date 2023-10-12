import { memo } from "react"
import toast from "react-hot-toast"

import { copyText } from "@/lib/copy-text"
import { cn } from "@/lib/utils"
import { IconCopy } from "@/components/icons"
import { Color } from "@/components/shared/color-picker"

interface ConversionBlockProps extends React.ComponentPropsWithoutRef<"div"> {
  colorStr: string
  label: string
}

const ConversionBlock = memo((props: ConversionBlockProps) => {
  const { colorStr, label, ...otherProps } = props
  return (
    <div
      {...otherProps}
      className={cn(
        "group flex cursor-pointer items-center justify-between px-5 py-4",
        otherProps.className
      )}
    >
      <div>{label}</div>
      <div className="flex items-center space-x-3">
        <IconCopy className="hidden group-hover:block" />
        <div>{colorStr}</div>
      </div>
    </div>
  )
})

ConversionBlock.displayName = "ConversionBlock"

const conversionMap: {
  key: string
  bg: string
  get: (color: Color) => string
}[] = [
  {
    key: "HEX",
    bg: "bg-gray-100",
    get: (color: Color) =>
      `${color.toHexString().toUpperCase().replace("#", "")}`,
  },
  {
    key: "LAB",
    bg: "bg-white",
    get: (color: Color) => {
      const lab = color.toLab()
      return `${lab.l.toFixed(0)}, ${lab.a.toFixed(0)}, ${lab.b.toFixed(0)}`
    },
  },
  {
    key: "RGB",
    bg: "bg-gray-100",
    get: (color: Color) => {
      const rgb = color.toRgb()
      return `${rgb.r}, ${rgb.g}, ${rgb.b}`
    },
  },
  // {
  //   key: 'XYZ',
  //   get: (color: Color) => {
  //     const xyz = color.toXYZ();
  //     return `${xyz.x}, ${xyz.y}, ${xyz.z}`
  //   },
  // },
  {
    key: "CMYK",
    bg: "bg-gray-100",
    get: (color: Color) => {
      const cmyk = color.toCmyk()
      return `${cmyk.c}, ${cmyk.m}, ${cmyk.y}, ${cmyk.k}`
    },
  },
  {
    key: "HSB",
    bg: "bg-white",
    get: (color: Color) => {
      const hsb = color.toHsb()
      return `${hsb.h.toFixed(0)}, ${hsb.s.toFixed(0)}, ${hsb.b.toFixed(0)}`
    },
  },
  {
    key: "HSL",
    bg: "bg-gray-100",
    get: (color: Color) => {
      const hsl = color.toHsl()
      return `${hsl.h.toFixed(0)}, ${hsl.s.toFixed(0)}, ${hsl.l.toFixed(0)}`
    },
  },
]

const Conversion = memo(({ color }: { color: Color }) => {
  const handleCopyColor = async (val: string) => {
    const success = await copyText(val)
    if (success) {
      toast.success("color copy success")
    }
  }

  return (
    <div className="columns-2 gap-10">
      {conversionMap.map((item) => (
        <ConversionBlock
          key={item.key}
          className={item.bg}
          label={item.key}
          colorStr={item.get(color)}
          onClick={() => handleCopyColor(item.get(color))}
        />
      ))}
    </div>
  )
})

Conversion.displayName = "Conversion"

export default Conversion
