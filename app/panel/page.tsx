import { redirect } from "next/navigation"
import { StatisticDto } from "@/db/dto/statistic.dto"
import { currentUser } from "@clerk/nextjs"
import { Card, Metric, Text } from "@tremor/react"

import { isAdmin } from "@/lib/user"
import { Button } from "@/components/ui/button"

import { statisticCronTask } from "../_actions/cron"
import { querySiteStatistic } from "../_actions/statistic"
import ColorPaletteChartCard from "./_components/ColorPaletteChartCard"
import UserChartCard from "./_components/UserChartCard"

const statisticMap: {
  id: keyof Pick<StatisticDto, "userCount" | "colorCount" | "paletteCount">
  name: string
}[] = [
  {
    id: "userCount",
    name: "Total Users",
  },
  {
    id: "colorCount",
    name: "Total Colors",
  },
  {
    id: "paletteCount",
    name: "Total Palettes",
  },
]

const DashboardPage = async () => {
  const user = await currentUser()

  if (!isAdmin(user?.publicMetadata.role)) {
    return redirect("/panel/colors")
  }

  const statistic = await querySiteStatistic()

  return (
    <div className="h-full w-full bg-slate-50 p-4">
      <div className="flex items-center justify-between">
        <div className="text-xl font-bold">Dashboard</div>
        <form action={statisticCronTask}>
          <Button type="submit">Refresh Cron</Button>
        </form>
      </div>

      <div className="mt-5">
        <div className="grid grid-cols-3 gap-5">
          {statisticMap.map((item) => (
            <Card key={item.id} decoration="bottom" decorationColor="purple">
              <Text className="mb-2">{item.name}</Text>
              <Metric>{statistic?.[item.id] ?? "--"}</Metric>
            </Card>
          ))}
        </div>
        <div className="mt-5 space-y-4">
          <UserChartCard></UserChartCard>
          <ColorPaletteChartCard></ColorPaletteChartCard>
        </div>
      </div>
    </div>
  )
}

export default DashboardPage
