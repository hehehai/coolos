import prisma from "@/db"
import { StatisticDto } from "@/db/dto/statistic.dto"
import { endOfDay, startOfDay, subDays } from "date-fns"
import SuperJSON from "superjson"

import { getStatisticDataByJSON } from "@/lib/utils"
import { querySiteStatistic } from "@/app/_actions/statistic"

export async function cronTask() {
  try {
    const yesterday = subDays(new Date().setHours(12, 0, 0, 0), 1)

    const targetData = await prisma.statistic.findFirst({
      where: {
        dayDate: {
          lte: endOfDay(yesterday),
          gte: startOfDay(yesterday),
        },
      },
    })
    if (targetData) {
      throw new Error("targetData is exists")
    }

    const latestStatisticItem = await prisma.statistic.findFirst({
      orderBy: {
        createAt: "desc",
      },
    })

    const latestStatisticData = getStatisticDataByJSON<StatisticDto>(
      latestStatisticItem?.data
    )
    const newData = await querySiteStatistic()
    if (!newData) {
      throw new Error("newData is null")
    }

    const statisticData: StatisticDto = {
      ...newData,
      userInc: newData.userCount - (latestStatisticData?.userCount || 0),
      colorInc: newData.colorCount - (latestStatisticData?.colorCount || 0),
      paletteInc:
        newData.paletteCount - (latestStatisticData?.paletteCount || 0),
    }

    const saveData = await prisma.statistic.create({
      data: {
        // 前一天 (数据有误差,cron 运行时间为 0点 ～ 1点)
        dayDate: yesterday,
        data: SuperJSON.stringify(statisticData),
      },
    })

    return saveData
  } catch (error) {
    console.error("cron task error", error)
    throw error
  }
}
