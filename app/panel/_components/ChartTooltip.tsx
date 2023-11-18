import { memo } from "react"

const ChartTooltip = memo(({ payload, active }: any) => {
  if (!active || !payload) return null
  return (
    <div className="rounded-tremor-default text-tremor-default bg-tremor-background shadow-tremor-dropdown border-tremor-border w-56 space-y-0.5 border p-2">
      {payload.map((category: any, idx: number) => (
        <div key={idx} className="flex flex-1 space-x-2.5">
          <div
            className={`bg-${category.color}-500 flex w-1 flex-col rounded`}
          />
          <div className="space-y-0.5">
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
