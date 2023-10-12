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
    <div className="mx-16">
      <QueryForm />
      <div className="mt-20 grid grid-cols-5 gap-x-10 gap-y-8 lg:grid-cols-3 2xl:grid-cols-4">
        {palettes.map((palette) => (
          <PaletteCard
            palette={palette}
            key={palette.id}
            paletteClassname="h-[138px]"
          />
        ))}
      </div>
    </div>
  )
}

export default ExplorePalettePage
