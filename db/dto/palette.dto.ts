import Hashids from "hashids"
import { z } from "zod"

export const UpsetPaletteDtoSchema = z.object({
  name: z
    .string()
    .min(1, { message: "Name is required" })
    .max(20, { message: "Name is too long" }),
  description: z
    .string()
    .max(200, { message: "Description is max 200 characters" }),
  tags: z.string().array().max(5, { message: "Maximum 5 tags" }),
  colors: z
    .string()
    .regex(/^[0-9a-f]{6}$/i, { message: "Color is invalid" })
    .array()
    .min(2, { message: "Minimum 2 colors" })
    .max(12, { message: "Maximum 12 colors" }),
})
export type UpsetPaletteDto = z.infer<typeof UpsetPaletteDtoSchema>

export const PaletteHashids = new Hashids("xx_palette")
