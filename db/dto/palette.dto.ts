import Hashids from "hashids"
import { z } from "zod"

export const sortByOptions = ["trending", "latest", "popular"] as const

export const queryPaletteDtoSchema = z.object({
  keyword: z.string().optional(),
  sortBy: z.enum(sortByOptions).default("trending").optional(),
})
export type QueryPaletteDto = z.infer<typeof queryPaletteDtoSchema>

export const upsetPaletteDtoSchema = z.object({
  name: z
    .string()
    .min(1, { message: "Name is required" })
    .max(20, { message: "Name is max 20 characters" }),
  description: z
    .string()
    .max(200, { message: "Description is max 200 characters" }),
  tags: z
    .string()
    .min(1, { message: "Tags is required" })
    .max(12, { message: "tag is max 12 characters" })
    .array()
    .max(5, { message: "Maximum 5 tags" }),
  colors: z
    .string()
    .regex(/^[0-9a-f]{6}$/i, { message: "Color is invalid" })
    .array()
    .min(2, { message: "Minimum 2 colors" })
    .max(12, { message: "Maximum 12 colors" }),
  public: z.boolean().default(false).optional(),
  saveById: z.number().nullish().optional(),
})
export type UpsetPaletteDto = z.infer<typeof upsetPaletteDtoSchema>

export const PaletteHashids = new Hashids("xx_palette")
