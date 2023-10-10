import { QueryPaletteDto, sortByOptions } from "@/db/dto/palette.dto"

import { queryExplorePalette } from "@/app/_actions/palette"

import PaletteCard from "./_components/PaletteCard"
import QueryForm from "./_components/QueryForm"

const ExplorePalettePage = async ({
  searchParams,
}: {
  searchParams: Partial<QueryPaletteDto>
}) => {
  const keyword = searchParams["keyword"]
  const sortBy = searchParams["sortBy"] ?? sortByOptions[0]

  const palettes = await queryExplorePalette({
    keyword,
    sortBy,
  })

  return (
    <div className="mx-auto max-w-7xl">
      <QueryForm />
      <div className="grid grid-cols-4 gap-x-8 gap-y-6">
        {palettes.map((palette) => (
          <PaletteCard
            palette={palette}
            key={palette.id}
            paletteClassname="h-32"
          />
        ))}
      </div>
    </div>
  )
}

export default ExplorePalettePage
