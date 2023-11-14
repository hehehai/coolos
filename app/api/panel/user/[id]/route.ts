import { NextRequest, NextResponse } from "next/server"
import { getUserVO } from "@/db/dto/user.dto"
import { auth, clerkClient, currentUser } from "@clerk/nextjs"
import { ZodError } from "zod"

import { isAdmin } from "@/lib/user"

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const { userId } = auth()

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const user = await currentUser()
  if (!isAdmin(user?.publicMetadata?.role)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 })
  }

  try {
    const id = params.id
    if (!id) {
      return NextResponse.json({ error: "id is required" }, { status: 400 })
    }
    const userData = await clerkClient.users.getUser(id)
    if (!userData) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    return NextResponse.json({ data: getUserVO(userData) }, { status: 200 })
  } catch (error) {
    let message = "Something went wrong"
    if (error instanceof ZodError) {
      message = error.issues.at(0)?.message || message
    }
    return NextResponse.json({ error: message }, { status: 400 })
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { userId } = auth()

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const user = await currentUser()
  if (!isAdmin(user?.publicMetadata?.role)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 })
  }

  try {
    const id = params.id
    if (!id) {
      return NextResponse.json({ error: "id is required" }, { status: 400 })
    }
    console.log("id", id)
    const hasUser = await clerkClient.users.getUser(id)
    if (!hasUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }
    await clerkClient.users.deleteUser(id)

    return NextResponse.json({}, { status: 200 })
  } catch (error) {
    console.log("error", error)
    let message = "Something went wrong"
    if (error instanceof ZodError) {
      message = error.issues.at(0)?.message || message
    }
    return NextResponse.json({ error: message }, { status: 400 })
  }
}
