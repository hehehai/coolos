import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/db"
import { upsetColorDtoSchema } from "@/db/dto/color.dto"
import { auth } from "@clerk/nextjs"
import { ZodError } from "zod"

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
