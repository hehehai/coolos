import { User } from "@clerk/nextjs/server"
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

export const createUserDtoSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Email is required" })
    .email({ message: "Invalid email" }),
  username: z
    .string()
    .trim()
    .min(1, { message: "Username is required" })
    .max(30, { message: "Username is too long" }),
  password: z
    .string()
    .min(8, { message: "Password is too short" })
    .max(32, { message: "Password is too long" }),
})
export type CreateUserDto = z.infer<typeof createUserDtoSchema>

export const updateUserDtoSchema = z.object({
  id: z.string(),
  username: z
    .string()
    .trim()
    .min(1, { message: "Username is required" })
    .max(30, { message: "Username is too long" }),
  password: z
    .string()
    .min(8, { message: "Password is too short" })
    .max(32, { message: "Password is too long" })
    .optional()
    .or(z.string().refine((val) => val === "")),
})
export type UpdateUserDto = z.infer<typeof updateUserDtoSchema>

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

export function getUserVO(user: User): UserVO {
  const email =
    user.emailAddresses.find((email) => email.id === user.primaryEmailAddressId)
      ?.emailAddress ?? null

  return {
    id: user.id,
    username: user.username,
    email: email,
    avatar: user.imageUrl,
    createAt: user.createdAt,
    lastSignInAt: user.lastSignInAt,
    externalId: user.externalId,
  }
}
