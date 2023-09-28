import Hashids from "hashids"
import { z } from "zod"

export const ColorColorDtoSchema = z.object({
  name: z
    .string()
    .min(1, { message: "Name is required" })
    .max(20, { message: "Name is too long" }),
  color: z.string().regex(/^[0-9a-f]{6}$/i, { message: "Color is invalid" }),
})
export type CreateColorDto = z.infer<typeof ColorColorDtoSchema>

export const ColorHashids = new Hashids("xx_color")
