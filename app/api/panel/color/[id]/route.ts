import { NextRequest, NextResponse } from "next/server"
import prisma from "@/db"
import { upsetColorDtoSchema } from "@/db/dto/color.dto"
import { auth } from "@clerk/nextjs"
import { ZodError } from "zod"

// edit color
export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { userId } = auth()

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  if (!params.id) {
    return NextResponse.json({ error: "id is required" }, { status: 400 })
  }

  try {
    const data = await req.json()
    const {
      id,
      name = "",
      color,
    } = upsetColorDtoSchema.parse({
      ...data?.json,
      id: params.id,
    })

    const hasColor = await prisma.color.findUnique({ where: { id, userId } })
    if (!hasColor) {
      return NextResponse.json({ error: "Color not found" }, { status: 404 })
    }

    const saveData = await prisma.color.update({
      where: {
        id,
      },
      data: {
        name,
        color,
        userId,
      },
    })

    return NextResponse.json({ data: saveData }, { status: 200 })
  } catch (error) {
    console.log(error)
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

  if (!params.id) {
    return NextResponse.json({ error: "id is required" }, { status: 400 })
  }

  const id = Number(params.id)

  try {
    const hasColor = await prisma.color.findUnique({ where: { id, userId } })
    if (!hasColor) {
      return NextResponse.json({ error: "Color not found" }, { status: 404 })
    }
    await prisma.color.update({ where: { id }, data: { deleteAt: new Date() } })

    return NextResponse.json({}, { status: 200 })
  } catch (error) {
    console.log(error)
    let message = "Something went wrong"
    if (error instanceof ZodError) {
      message = error.issues.at(0)?.message || message
    }
    return NextResponse.json({ error: message }, { status: 400 })
  }
}
