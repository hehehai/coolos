import { NextRequest, NextResponse } from "next/server"
import { queryColorDtoSchema } from "@/db/dto/color.dto"
import { auth } from "@clerk/nextjs"
import { ZodError } from "zod"

import { pagination } from "@/lib/pagination"
import { queryStringToObject } from "@/lib/utils"
import { queryExploreColor } from "@/app/_actions/color"

export async function GET(req: NextRequest) {
  const { userId } = auth()

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const data = queryStringToObject(req.url)
    const dataParams = queryColorDtoSchema.parse(data)

    const palette = await queryExploreColor({
      ...dataParams,
      userId,
    })

    return NextResponse.json(
      {
        data: palette.data,
        ...pagination(dataParams.page, dataParams.pageSize, palette.count),
      },
      { status: 200 }
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
