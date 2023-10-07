import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/db"
import { UpsetPaletteDtoSchema } from "@/db/dto/palette.dto"
import { auth } from "@clerk/nextjs"
import { ZodError } from "zod"

export async function POST(req: NextRequest) {
  const { userId } = auth()

  if (!userId) {
    return new Response("Unauthorized", { status: 401 })
  }

  try {
    const data = await req.json()
    const validData = UpsetPaletteDtoSchema.parse(data?.json)
    if (!validData) {
      return new Response("Invalid data", { status: 400 })
    }

    const saveData = await prisma.palette.create({
      data: {
        name: validData.name,
        colors: validData.colors.toString(),
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
