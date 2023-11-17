import { prisma } from "@/db"
import { QueryColorDto } from "@/db/dto/color.dto"
import { Prisma } from "@prisma/client"
import { subDays } from "date-fns"
import { match } from "ts-pattern"

export async function queryExploreColor(query: QueryColorDto) {
  "use server"

  const { keyword, sortBy, page = 0, pageSize = 24, userId } = query

  const whereIs: Prisma.ColorWhereInput = {
    deleteAt: null,
    userId,
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
        color: {
          equals: text,
          mode: "insensitive",
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

  const data = await prisma.color.findMany(queryParams)
  const count = await prisma.color.count({
    where: whereIs,
  })

  return {
    data,
    count,
  }
}
