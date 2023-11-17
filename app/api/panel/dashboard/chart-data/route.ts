import { NextRequest, NextResponse } from "next/server"
import prisma from "@/db"
import { queryChartData } from "@/db/dto/statistic.dto"
import { auth, currentUser } from "@clerk/nextjs"
import { subDays } from "date-fns"
import { ZodError } from "zod"

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
    const params = queryChartData.parse(data)

    const chartData = await prisma.statistic.findMany({
      where: {
        dayDate: {
          gte: subDays(new Date(), params.dayIn),
        },
      },
    })

    return NextResponse.json(
      {
        data: chartData,
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
