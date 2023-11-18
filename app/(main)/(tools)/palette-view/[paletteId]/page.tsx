import { Metadata } from "next"
import { notFound } from "next/navigation"
import prisma from "@/db"

import { Badge } from "@/components/ui/badge"

import ColorBlock from "./_components/ColorBlock"
import LikeButton from "./_components/LikeButton"

export const metadata: Metadata = {
  title: "Palette view",
}

const PaletteViewPage = async ({
  params,
}: {
  params: { paletteId: string }
}) => {
  if (!params.paletteId || Number.isNaN(Number(params.paletteId))) {
    notFound()
  }

  const palette = await prisma.palette.findUnique({
    where: {
      id: Number(params.paletteId),
    },
  })

  if (!palette) {
    notFound()
  }

  return (
    <div className="mx-12">
      <div className="flex items-center justify-between">
        <div className="flex h-52 items-center space-x-10">
          <h3 className="text-4xl font-bold">{palette.name}</h3>
          <div>
            <LikeButton
              colors={palette.colors}
              likes={palette.likes}
              id={palette.id}
            />
          </div>
        </div>
        <div>
          {palette.tags.map((tag, idx) => (
            <Badge key={idx}>{tag}</Badge>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-5 overflow-hidden rounded-xl">
        {palette.colors.map((color, idx) => (
          <ColorBlock color={color} key={idx} />
        ))}
      </div>
    </div>
  )
}

export default PaletteViewPage
