import { NextRequest, NextResponse } from "next/server"

import { cronTask } from "@/lib/cron-task"

export async function GET(req: NextRequest) {
  console.log("start cron")
  if (
    req.headers.get("Authorization") !== `Bearer ${process.env.CRON_SECRET}`
  ) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }
  try {
    console.log("start cron task")
    const data = await cronTask()

    return NextResponse.json({ success: !!data, data }, { status: 200 })
  } catch (error) {
    console.error("cron error", error)
    let message = "Something went wrong"
    if (error instanceof Error) {
      message = error.message
    }
    return NextResponse.json(
      {
        success: false,
        error: message,
      },
      { status: 200 }
    )
  }
}
