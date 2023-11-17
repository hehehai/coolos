"use client"

import { useEffect, useMemo, useState } from "react"

import { convertToShortFormat } from "@/lib/utils"
import { generateColor } from "@/components/shared/color-picker"
import PaletteSaveDialog from "@/components/shared/PaletteSaveDialog"

const LikeButton = ({
  colors,
  likes,
  id,
  disabled = false,
}: {
  colors: string[]
  likes: number
  id: number
  disabled?: boolean
}) => {
  const [likeNum, setLikeNum] = useState(likes)

  useEffect(() => {
    setLikeNum(likes)
  }, [likes])

  const palette = useMemo(() => {
    return colors.map((c) => generateColor(c))
  }, [colors])

  const handleSuccess = () => {
    setLikeNum((prev) => prev + 1)
  }

  const saveButton = useMemo(() => {
    return (
      <div className="flex cursor-pointer items-center space-x-1 text-sm text-slate-500 hover:text-slate-800">
        <span className="i-ph-heart-bold" />
        <span>{convertToShortFormat(likeNum)}</span>
      </div>
    )
  }, [likeNum])

  if (disabled) {
    return saveButton
  }

  return (
    <PaletteSaveDialog
      palette={palette}
      tips="Save"
      defaultValues={{
        saveById: id,
      }}
      onSuccess={handleSuccess}
    >
      {saveButton}
    </PaletteSaveDialog>
  )
}

export default LikeButton
