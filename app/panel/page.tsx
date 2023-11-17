import { redirect } from "next/navigation"
import { currentUser } from "@clerk/nextjs"

import { isAdmin } from "@/lib/user"

import { querySiteStatistic } from "../_actions/statistic"

const statisticMap = [
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
      </div>

      <div>
        <div className="grid grid-cols-3 gap-4">
          {statisticMap.map((item) => (
            <div
              key={item.id}
              className="mt-4 space-y-2 rounded-lg bg-white p-4"
            >
              <div className="text-lg text-gray-600">{item.name}</div>
              <div className="lining-num font-semi-bold text-4xl text-slate-900">
                {statistic?.[item.id] ?? "--"}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default DashboardPage
