import prisma from "@/db"
import { clerkClient } from "@clerk/nextjs"

export async function querySiteStatistic(): Promise<
  Record<string, number> | undefined
> {
  "use server"

  try {
    const userCount = await clerkClient.users.getCount()
    const colorCount = await prisma.color.count({ where: { deleteAt: null } })
    const paletteCount = await prisma.palette.count({
      where: { deleteAt: null },
    })

    return {
      userCount,
      colorCount,
      paletteCount,
    }
  } catch (error) {
    console.log("error", error)
  }
}
