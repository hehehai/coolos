import { z } from "zod"

import { Pagination } from "@/lib/pagination"

export const queryUserDtoSchema = z.object({
  query: z.coerce.string().max(30, { message: "Query is too long" }).optional(),
  page: z.coerce.number().int().gte(0).default(0),
  pageSize: z.coerce.number().int().gte(1).lte(50).default(10),
  // 开头 - 或 +
  orderBy: z
    .string()
    .regex(/^(-|\+)(created_at|updated_at)$/, { message: "Invalid orderBy" })
    .optional(),
})
export type QueryUserDto = z.infer<typeof queryUserDtoSchema>

export interface UserVO {
  id: string
  username: string | null
  email: string | null
  avatar: string | null
  createAt: number
  lastSignInAt: number | null
  externalId: string | null
}

export interface QueryUserVO extends Pagination {
  data: UserVO[]
}
