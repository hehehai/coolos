"use client"

import { convertToShortFormat } from "@/lib/utils"
import { generateColor } from "@/components/shared/color-picker"
import PaletteSaveDialog from "@/components/shared/PaletteSaveDialog"

const LikeButton = ({ colors, likes }: { colors: string[]; likes: number }) => {
  return (
    <PaletteSaveDialog
      palette={colors.map((c) => generateColor(c))}
      tips="Save"
    >
      <div className="flex cursor-pointer items-center space-x-1 text-sm text-slate-500 hover:text-slate-800">
        <span className="i-ph-heart-bold" />
        <span>{convertToShortFormat(likes)}</span>
      </div>
    </PaletteSaveDialog>
  )
}

export default LikeButton
