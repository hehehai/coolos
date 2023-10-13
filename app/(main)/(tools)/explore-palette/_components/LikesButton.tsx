"use client"

import { useMemo } from "react"

import { convertToShortFormat } from "@/lib/utils"
import { generateColor } from "@/components/shared/color-picker"
import PaletteSaveDialog from "@/components/shared/PaletteSaveDialog"

const LikeButton = ({
  colors,
  likes,
  id,
}: {
  colors: string[]
  likes: number
  id: number
}) => {
  const palette = useMemo(() => {
    return colors.map((c) => generateColor(c))
  }, [colors])

  return (
    <PaletteSaveDialog
      palette={palette}
      tips="Save"
      defaultValues={{
        saveById: id,
      }}
    >
      <div className="flex cursor-pointer items-center space-x-1 text-sm text-slate-500 hover:text-slate-800">
        <span className="i-ph-heart-bold" />
        <span>{convertToShortFormat(likes)}</span>
      </div>
    </PaletteSaveDialog>
  )
}

export default LikeButton
