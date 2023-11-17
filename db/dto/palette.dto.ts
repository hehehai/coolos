import Hashids from "hashids"
import { z } from "zod"

export const sortByOptions = ["trending", "latest", "popular"] as const

export const queryPaletteDtoSchema = z.object({
  userId: z.coerce.string().optional(),
  public: z.coerce.boolean().default(true).optional(),
  keyword: z.coerce.string().optional(),
  sortBy: z.enum(sortByOptions).default("trending").optional(),
  page: z.coerce.number().default(1),
  pageSize: z.coerce.number().default(24),
})
export type QueryPaletteDto = z.input<typeof queryPaletteDtoSchema>

export const upsetPaletteDtoSchema = z.object({
  id: z.coerce.number().optional(),
  name: z.coerce
    .string()
    .trim()
    .min(1, { message: "Name is required" })
    .max(20, { message: "Name is max 20 characters" }),
  description: z.coerce
    .string()
    .max(200, { message: "Description is max 200 characters" })
    .optional(),
  tags: z.coerce
    .string()
    .min(1, { message: "Tag is required" })
    .max(12, { message: "Tag is max 12 characters" })
    .array()
    .max(5, { message: "Maximum 5 tags" }),
  colors: z.coerce
    .string()
    .regex(/^#?[0-9a-f]{6}$/i, { message: "Color is invalid" })
    .array()
    .min(2, { message: "Minimum 2 colors" })
    .max(12, { message: "Maximum 12 colors" }),
  public: z.coerce.boolean().default(false).optional(),
  saveById: z.number().nullish().optional(),
})
export type UpsetPaletteDto = z.infer<typeof upsetPaletteDtoSchema>

export const PaletteHashids = new Hashids("xx_palette")
