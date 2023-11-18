import { memo } from "react"

const ChartTooltip = memo(({ payload, active }: any) => {
  if (!active || !payload) return null
  return (
    <div className="rounded-tremor-default text-tremor-default bg-tremor-background shadow-tremor-dropdown border-tremor-border w-56 border p-2">
      {payload.map((category: any, idx: number) => (
        <div key={idx} className="flex flex-1 space-x-2.5">
          <div
            className={`bg- flex w-1 flex-col${category.color}-500 rounded`}
          />
          <div className="space-y-1">
            <p className="text-tremor-content">{category.dataKey}</p>
            <p className="text-tremor-content-emphasis font-medium">
              {category.value}
            </p>
          </div>
        </div>
      ))}
    </div>
  )
})

ChartTooltip.displayName = "ChartTooltip"

export default ChartTooltip
