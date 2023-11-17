import Hashids from "hashids"
import { z } from "zod"

export const sortByOptions = ["trending", "latest", "popular"] as const

export const queryColorDtoSchema = z.object({
  userId: z.coerce.string().optional(),
  keyword: z.coerce.string().optional(),
  sortBy: z.enum(sortByOptions).default("trending").optional(),
  page: z.coerce.number().default(1),
  pageSize: z.coerce.number().default(24),
})
export type QueryColorDto = z.input<typeof queryColorDtoSchema>

export const upsetColorDtoSchema = z.object({
  id: z.coerce.number().optional(),
  name: z.coerce
    .string()
    .trim()
    .min(1, { message: "Name is required" })
    .max(20, { message: "Name is too long" }),
  color: z.coerce
    .string()
    .regex(/^#?([0-9a-f]{6})$/i, { message: "Color is invalid" }),
})
export type UpsetColorDto = z.infer<typeof upsetColorDtoSchema>

export const ColorHashids = new Hashids("xx_color")
