"use client"

import { useMemo } from "react"
import { isReadable } from "@ctrl/tinycolor"

import { cn } from "@/lib/utils"
import { defaultColor, generateColor } from "@/components/shared/color-picker"
import ColorPicker from "@/components/shared/color-picker/ColorPicker"
import { colorNames } from "@/components/shared/color-picker/data"
import useColorState from "@/components/shared/color-picker/hooks/useColorState"
import DisplayDesk from "@/components/shared/DisplayDesk"
import SectionCard from "@/components/shared/SectionCard"

import NavBar from "./_components/NavBar"
import { navItems } from "./constants.schema"

const PickerPage = ({ params }: { params: { color?: string[] } }) => {
  // route color params
  const firstColor = useMemo(() => {
    if (!params.color?.length) return defaultColor
    const routeColor = generateColor(params.color[0])
    return routeColor.isValid ? routeColor : defaultColor
  }, [params.color])
  const [color, setColor] = useColorState(firstColor)
  const boardTextIsReadable = useMemo(() => {
    return isReadable(color, "#fff", { level: "AA", size: "large" })
  }, [color])

  return (
    <div>
      <div className="mx-auto mb-28 flex max-w-7xl items-center justify-center space-x-5">
        <DisplayDesk
          className="flex h-[320px] w-full items-center justify-center rounded-2xl shadow-[inset_rgba(0,0,0,0.05)_0_0_0_1px]"
          color={color}
          showLike
        >
          <div
            className={cn(
              "text-center",
              boardTextIsReadable ? "text-white" : "text-black"
            )}
          >
            <p
              className={cn(
                "mb-5 text-xl",
                boardTextIsReadable ? "text-white/50" : "text-black/50"
              )}
            >
              {color.toHex()}
            </p>
            <p className="text-4xl font-bold">
              {color.findClosestColor(colorNames)}
            </p>
          </div>
        </DisplayDesk>
        <ColorPicker value={color} onChange={setColor}></ColorPicker>
      </div>

      <NavBar navItems={navItems} />
      <div className="mt-24 space-y-10 px-4">
        {Object.entries(navItems).map(([key, item]) => (
          <SectionCard
            key={key}
            id={key}
            title={item.label}
            description={item.description}
          >
            <item.Component color={color} />
          </SectionCard>
        ))}
      </div>
    </div>
  )
}

export default PickerPage
