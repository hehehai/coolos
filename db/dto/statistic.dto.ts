import { z } from "zod"

export const statisticDtoSchema = z.object({
  userCount: z.coerce.number(),
  userInc: z.coerce.number(),
  paletteCount: z.coerce.number(),
  paletteInc: z.coerce.number(),
  colorCount: z.coerce.number(),
  colorInc: z.coerce.number(),
})
export type StatisticDto = z.input<typeof statisticDtoSchema>

export const queryChartData = z.object({
  dayIn: z.coerce.number().min(7).max(30),
})

export type QueryChartData = z.infer<typeof queryChartData>
