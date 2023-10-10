import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/db"
import { upsetPaletteDtoSchema } from "@/db/dto/palette.dto"
import { auth } from "@clerk/nextjs"
import { ZodError } from "zod"

// save palette
export async function POST(req: NextRequest) {
  const { userId } = auth()

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const data = await req.json()
    const {
      name = "",
      colors = [],
      description,
      tags = [],
      public: isPublic,
    } = upsetPaletteDtoSchema.parse(data?.json)

    const saveData = await prisma.palette.create({
      data: {
        name,
        description,
        tags,
        colors,
        userId,
        public: isPublic,
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
