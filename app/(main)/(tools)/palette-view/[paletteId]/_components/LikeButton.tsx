"use client"

import { useEffect, useMemo, useState } from "react"

import { convertToShortFormat } from "@/lib/utils"
import { generateColor } from "@/components/shared/color-picker"
import PaletteSaveDialog from "@/components/shared/PaletteSaveDialog"
import { Button } from "@/components/ui/button"

const LikeButton = ({
  colors,
  likes,
  id,
}: {
  colors: string[]
  likes: number
  id: number
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

  return (
    <PaletteSaveDialog
      palette={palette}
      tips="Save"
      defaultValues={{
        saveById: id,
      }}
      onSuccess={handleSuccess}
    >
      <div>
        <Button variant="outline" className="space-x-1">
          <span className="i-ph-heart-bold" />
          <span>{convertToShortFormat(likeNum)}</span>
        </Button>
      </div>
    </PaletteSaveDialog>
  )
}

export default LikeButton
