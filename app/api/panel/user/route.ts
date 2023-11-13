import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/db"
import { upsetColorDtoSchema } from "@/db/dto/color.dto"
import { queryUserDtoSchema, QueryUserVO } from "@/db/dto/user.dto"
import { auth, clerkClient, currentUser } from "@clerk/nextjs"
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

    const userVO = users.map((user) => {
      const email =
        user.emailAddresses.find(
          (email) => email.id === user.primaryEmailAddressId
        )?.emailAddress ?? null

      return {
        id: user.id,
        username: user.username,
        email: email,
        avatar: user.imageUrl,
        createAt: user.createdAt,
        lastSignInAt: user.lastSignInAt,
        externalId: user.externalId,
      }
    })

    return NextResponse.json<QueryUserVO>({
      data: userVO,
      ...pagination(params.page, params.pageSize, count),
    })
  } catch (error) {
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

  try {
    const data = await req.json()
    const { name, color } = upsetColorDtoSchema.parse(data?.json)

    const saveData = await prisma.color.create({
      data: {
        name,
        color,
        userId,
      },
    })

    return NextResponse.json({ saveData }, { status: 201 })
  } catch (error) {
    let message = "Something went wrong"
    if (error instanceof ZodError) {
      message = error.issues.at(0)?.message || message
    }
    return NextResponse.json({ error: message }, { status: 400 })
  }
}
