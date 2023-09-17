"use client"

import { MoreHorizontal } from "lucide-react"

import { cn } from "@/lib/utils"
import { Color, generateColor } from "@/components/shared/color-picker"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const colorPalettes = [
  {
    colors: ["#606C38", "#283618", "#FEFAE0", "#DDA15E", "#bc6c25"],
    likes: 21301,
  },
  {
    colors: ["#cdb4db", "#ffc8dd", "#ffafcc", "#bde0fe", "#a2d2ff"],
    likes: 20111,
  },
  {
    colors: ["#8ecae6", "#219ebc", "#023047", "#ffb703", "#fb8500"],
    likes: 18736,
  },
  {
    colors: ["#edede9", "#219ebc", "#f5ebe0", "#e3d5ca", "#d5bdaf"],
    likes: 16782,
  },
  {
    colors: ["#edede9", "#219ebc", "#f5ebe0", "#e3d5ca", "#d5bdaf"],
    likes: 16209,
  },
  {
    colors: ["#264653", "#2a9d8f", "#e9c46a", "#f4a261", "#e76f51"],
    likes: 70209,
  },
  {
    colors: ["#000814", "#001d3d", "#003566", "#ffc300", "#ffd60a"],
    likes: 28209,
  },
  {
    colors: [
      "#001219",
      "#005f73",
      "#0a9396",
      "#94d2bd",
      "#e9d8a6",
      "#ee9b00",
      "#ca6702",
      "#bb3e03",
      "#ae2012",
      "#9b2226",
    ],
    likes: 26081,
  },
]

interface PaletteColorItemProps
  extends Omit<React.ComponentPropsWithoutRef<"div">, "color"> {
  color: Color
}

const PaletteColorItem = ({ color, ...props }: PaletteColorItemProps) => {
  return (
    <div
      {...props}
      className={cn(
        "flex h-full grow items-center justify-center",
        props.className
      )}
      style={{ backgroundColor: color.toHexString() }}
    >
      <div className="hidden">{color.toHex()}</div>
    </div>
  )
}

interface PaletteCardProps extends React.ComponentPropsWithoutRef<"div"> {
  palette: (typeof colorPalettes)[0]
  paletteClassname?: string
}

const PaletteCard = ({
  palette,
  className,
  paletteClassname,
}: PaletteCardProps) => {
  return (
    <div className={cn(className)}>
      <div className={cn("flex h-full items-stretch", paletteClassname)}>
        {palette.colors.map((color, idx) => (
          <PaletteColorItem key={idx} color={generateColor(color)} />
        ))}
      </div>
      <div className="flex items-center justify-end space-x-2 py-1">
        <div className="text-sm text-slate-900">{palette.likes}</div>
        <div>
          <MoreHorizontal />
        </div>
      </div>
    </div>
  )
}

const ExplorePalettePage = () => {
  return (
    <div className="mx-auto max-w-7xl">
      <div className="mx-auto mb-12 flex max-w-3xl items-center space-x-4">
        <Input placeholder="Search by topic, color name, hex"></Input>
        <Select>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="light">Popular</SelectItem>
            <SelectItem value="dark">Likes</SelectItem>
            <SelectItem value="system">Latest</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="grid grid-cols-4 gap-x-8 gap-y-6">
        {colorPalettes.map((palette, idx) => (
          <PaletteCard palette={palette} key={idx} paletteClassname="h-32" />
        ))}
      </div>
    </div>
  )
}

export default ExplorePalettePage
