"use client"

import { useState } from "react"
import { StatisticDto } from "@/db/dto/statistic.dto"
import { Statistic } from "@prisma/client"
import { AreaChart, Card, Title } from "@tremor/react"
import { format } from "date-fns"
import toast from "react-hot-toast"
import useSWR from "swr"

import { getFetchAction } from "@/lib/fetch-action"
import { getStatisticDataByJSON } from "@/lib/utils"
import { Spinners } from "@/components/icons"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import ChartTooltip from "./ChartTooltip"

const UserChartCard = () => {
  const [timeRange, setTimeRange] = useState("7")

  const { data, isLoading } = useSWR<any[]>(
    `/api/panel/dashboard/chart-data?dayIn=${timeRange}`,
    getFetchAction<any[], { data: Statistic[] }>(
      { method: "GET" },
      (resData) => {
        const data = resData.data
        return data.map((item) => {
          const statistic = getStatisticDataByJSON<StatisticDto>(item?.data)
          return {
            dayDate: format(item.dayDate, "dd"),
            userCount: statistic?.userCount,
            userInc: statistic?.userInc,
          }
        })
      }
    ),
    {
      keepPreviousData: true,
      onError: (err) => {
        toast.error(err.message)
      },
    }
  )

  return (
    <Card>
      <div className="mb-5 flex items-center justify-between">
        <Title>Daily Users</Title>
        <Select
          onValueChange={(val) => setTimeRange(val)}
          defaultValue={timeRange}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select a time range" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="7">Last 7 days</SelectItem>
            <SelectItem value="30">Last 30 days</SelectItem>
            <SelectItem value="90">Last 90 days</SelectItem>
          </SelectContent>
        </Select>
      </div>
      {isLoading ? (
        <div className="flex h-72 w-full items-center justify-center">
          <Spinners className="animate-spin text-2xl"></Spinners>
        </div>
      ) : (
        <AreaChart
          className="h-72"
          data={data ?? []}
          index="dayDate"
          categories={["userCount"]}
          colors={["purple"]}
          yAxisWidth={30}
          customTooltip={ChartTooltip}
        />
      )}
    </Card>
  )
}

export default UserChartCard
