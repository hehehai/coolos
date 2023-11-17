"use client"

import { memo } from "react"
import { Palette } from "@prisma/client"

import { cn } from "@/lib/utils"

import LikeButton from "./LikesButton"
import PaletteColorItem from "./PaletteColorItem"
import PaletteMore from "./PaletteMore"

interface PaletteCardProps extends React.ComponentPropsWithoutRef<"div"> {
  palette: Palette
  paletteClassname?: string
  isEdit?: boolean
}

const PaletteCard = memo(
  ({
    palette,
    className,
    paletteClassname,
    isEdit = false,
  }: PaletteCardProps) => {
    return (
      <div className={cn(className)}>
        <div
          className={cn(
            "flex h-full items-stretch overflow-hidden",
            paletteClassname
          )}
        >
          {palette.colors?.map((color, idx) => (
            <PaletteColorItem
              key={idx}
              hexString={color}
              style={
                {
                  "--item-width": `calc(100% / ${palette.colors.length})`,
                } as React.CSSProperties
              }
              className="first:rounded-l-xl first:shadow-[inset_rgba(0,_0,_0,_0.05)_1px_1px,_inset_rgba(0,_0,_0,_0.05)_0_-1px] last:rounded-r-xl last:shadow-[inset_rgba(0,_0,_0,_0.05)_-1px_1px,_inset_rgba(0,_0,_0,_0.05)_0_-1px] hover:w-[128px]"
            />
          ))}
        </div>
        <div className="flex items-center justify-between space-x-2 py-1">
          <div className="text-sm text-slate-900">{palette.name}</div>
          {palette.colors?.length && (
            <div className="flex items-center space-x-2">
              <LikeButton
                colors={palette.colors}
                likes={palette.likes}
                id={palette.id}
                disabled={isEdit}
              />
              <PaletteMore
                colors={palette.colors}
                id={palette.id}
                isEdit={isEdit}
              />
            </div>
          )}
        </div>
      </div>
    )
  }
)

PaletteCard.displayName = "PaletteCard"

export default PaletteCard
