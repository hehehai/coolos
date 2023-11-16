import { prisma } from "@/db"
import { QueryPaletteDto } from "@/db/dto/palette.dto"
import { Prisma } from "@prisma/client"
import { subDays } from "date-fns"
import { match } from "ts-pattern"

export async function queryExplorePalette(query: QueryPaletteDto) {
  "use server"

  const { keyword, sortBy, page = 0, pageSize = 24, userId } = query

  const whereIs: Partial<Prisma.PaletteWhereInput> = {
    deleteAt: null,
    userId,
    public: query.public,
  }

  if (keyword?.trim()) {
    const text = keyword.trim()
    whereIs.OR = [
      {
        name: {
          contains: text,
          mode: "insensitive",
        },
      },
      {
        description: {
          contains: text,
          mode: "insensitive",
        },
      },
      {
        tags: {
          has: text,
        },
      },
      {
        colors: {
          has: text.toLowerCase(),
        },
      },
    ]
  }

  const orderByIs: Prisma.PaletteOrderByWithRelationInput = {}

  if (sortBy) {
    match(sortBy)
      .with("trending", () => {
        orderByIs.likes = "desc"
      })
      .with("latest", () => {
        orderByIs.createdAt = "desc"
      })
      .with("popular", () => {
        orderByIs.likes = "desc"
        whereIs.createdAt = {
          // 30 天内
          gte: subDays(new Date(), 30),
        }
      })
      .exhaustive()
  }

  const queryParams = {
    where: whereIs,
    orderBy: orderByIs,
    skip: page * pageSize,
    take: pageSize,
  }

  const data = await prisma.palette.findMany(queryParams)
  const count = await prisma.palette.count(queryParams)

  return {
    data,
    count,
  }
}
