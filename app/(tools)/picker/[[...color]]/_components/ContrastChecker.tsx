import { memo } from "react"

import { cn } from "@/lib/utils"
import {
  Color,
  colorContrastCheck,
  generateColor,
} from "@/components/shared/color-picker"

import ShowCard from "./ShowCard"

const CheckerDemo = memo((props: { color: string; className?: string }) => {
  return (
    <div
      className={cn(
        "w-full space-y-4 rounded-lg border border-gray-200 px-5 py-8 text-center",
        props.className
      )}
      style={{ color: props.color }}
    >
      <p className="text-2xl">Quote n. 3</p>
      <p>
        Courage is not the absence of fear, but rather the judgement that
        something else is more important than fear.
      </p>
      <p className="font-medium">Ambrose Redmoon</p>
    </div>
  )
})

CheckerDemo.displayName = "CheckerDemo"

const ContrastChecker = memo(({ color }: { color: Color }) => {
  const lightCheck = colorContrastCheck(generateColor("#ffffff"), color)
  const darkCheck = colorContrastCheck(generateColor("#000000"), color)

  return (
    <div className="columns-2 gap-10">
      <ShowCard
        title="White background"
        extra={
          <div
            className={cn(
              "rounded-sm px-1 text-sm",
              lightCheck?.score.color,
              lightCheck?.score.bg
            )}
          >
            {lightCheck?.score.label} {lightCheck?.score.level}
          </div>
        }
      >
        <CheckerDemo color={color.toHexString()} className="bg-white" />
      </ShowCard>
      <ShowCard
        title="Black background"
        extra={
          <div
            className={cn(
              "rounded-sm px-1 text-sm",
              darkCheck?.score.color,
              darkCheck?.score.bg
            )}
          >
            {darkCheck?.score.label} {darkCheck?.score.level}
          </div>
        }
      >
        <CheckerDemo color={color.toHexString()} className="bg-black" />
      </ShowCard>
    </div>
  )
})

ContrastChecker.displayName = "ContrastChecker"

export default ContrastChecker
