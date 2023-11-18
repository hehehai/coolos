import { NextRequest, NextResponse } from "next/server"
import { auth, currentUser } from "@clerk/nextjs"

import { cronTask } from "@/lib/cron-task"
import { isAdmin } from "@/lib/user"

export async function GET() {
  const { userId } = auth()

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const user = await currentUser()
  if (!isAdmin(user?.publicMetadata?.role)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 })
  }

  try {
    console.log("start ron task")
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
