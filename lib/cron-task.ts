import prisma from "@/db"
import { StatisticDto } from "@/db/dto/statistic.dto"
import { subDays } from "date-fns"

import { getStatisticDataByJSON } from "@/lib/utils"
import { querySiteStatistic } from "@/app/_actions/statistic"

export async function cronTask() {
  "use server"
  try {
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
        dayDate: subDays(new Date(), 1),
        data: JSON.stringify(statisticData),
      },
    })

    return saveData
  } catch (error) {
    console.log("cron error", error)
    throw error
  }
}
