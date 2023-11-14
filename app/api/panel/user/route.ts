import { NextRequest, NextResponse } from "next/server"
import {
  createUserDtoSchema,
  getUserVO,
  queryUserDtoSchema,
  QueryUserVO,
  UpdateUserDto,
  updateUserDtoSchema,
} from "@/db/dto/user.dto"
import { auth, clerkClient, currentUser } from "@clerk/nextjs"
import { User } from "@clerk/nextjs/server"
import { ZodError } from "zod"

import { pagination } from "@/lib/pagination"
import { isAdmin } from "@/lib/user"
import { queryStringToObject } from "@/lib/utils"

export async function GET(req: NextRequest) {
  const { userId } = auth()

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const user = await currentUser()
  if (!isAdmin(user?.publicMetadata?.role)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 })
  }

  try {
    const data = queryStringToObject(req.url)
    const params = queryUserDtoSchema.parse(data)

    const queryParams: Record<string, unknown> = {
      limit: params.pageSize,
      offset: params.page * params.pageSize,
      query: params.query,
    }
    if (params.orderBy) {
      queryParams.orderBy = params.orderBy
    }

    const count = await clerkClient.users.getCount(queryParams)
    const users = await clerkClient.users.getUserList(queryParams)

    const userVO = users.map((user) => getUserVO(user))

    return NextResponse.json<QueryUserVO>({
      data: userVO,
      ...pagination(params.page, params.pageSize, count),
    })
  } catch (error) {
    console.log("error", error)
    let message = "Something went wrong"
    if (error instanceof ZodError) {
      message = error.issues.at(0)?.message || message
    }
    return NextResponse.json({ error: message }, { status: 400 })
  }
}

export async function POST(req: NextRequest) {
  const { userId } = auth()

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const user = await currentUser()
  if (!isAdmin(user?.publicMetadata?.role)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 })
  }

  try {
    const jsonData = await req.json()
    const data = jsonData?.json

    const { id } = data as unknown as UpdateUserDto
    let saveData: User | null = null
    if (id) {
      const updateData = updateUserDtoSchema.parse(data)
      const hasUser = await clerkClient.users.getUser(id)
      if (!hasUser) {
        return NextResponse.json({ error: "User not found" }, { status: 404 })
      }
      const params: Record<string, unknown> = {
        username: updateData.username,
      }
      if (updateData.password) {
        params["password"] = updateData.password
      }
      saveData = await clerkClient.users.updateUser(id, params)
    } else {
      const createData = createUserDtoSchema.parse(data)
      const params = {
        username: createData.username,
        password: createData.password,
        emailAddress: [createData.email],
      }
      saveData = await clerkClient.users.createUser(params)
    }

    return NextResponse.json(
      { data: getUserVO(saveData) },
      { status: id ? 200 : 201 }
    )
  } catch (error) {
    console.log("error", error)
    let message = "Something went wrong"
    if (error instanceof ZodError) {
      message = error.issues.at(0)?.message || message
    }
    return NextResponse.json({ error: message }, { status: 400 })
  }
}
