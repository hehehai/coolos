import Hashids from "hashids"
import { z } from "zod"

export const SubscribeDtoSchema = z.object({
  email: z.string().email({ message: "Email is valid" }),
})
export type SubscribeDto = z.infer<typeof SubscribeDtoSchema>

export const SubscribeHashids = new Hashids("xx_subscribe")
