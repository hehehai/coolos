import { NextResponse } from "next/server"
import { auth, currentUser } from "@clerk/nextjs"

import { isAdmin } from "@/lib/user"
import { querySiteStatistic } from "@/app/_actions/statistic"

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
    const data = await querySiteStatistic()

    return NextResponse.json({ data }, { status: 200 })
  } catch (error) {
    console.log("error", error)
    const message = "Something went wrong"
    return NextResponse.json({ error: message }, { status: 400 })
  }
}
