import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/db"
import {
  queryPaletteDtoSchema,
  upsetPaletteDtoSchema,
} from "@/db/dto/palette.dto"
import { auth } from "@clerk/nextjs"
import { ZodError } from "zod"

import { queryStringToObject } from "@/lib/utils"
import { queryExplorePalette } from "@/app/_actions/palette"

export async function GET(req: NextRequest) {
  try {
    const data = queryStringToObject(req.url)
    const params = queryPaletteDtoSchema.parse(data)

    const platte = await queryExplorePalette(params)

    return NextResponse.json(platte.data)
  } catch (error) {
    let message = "Something went wrong"
    if (error instanceof ZodError) {
      message = error.issues.at(0)?.message || message
    }
    console.log(error)
    return NextResponse.json({ error: message }, { status: 400 })
  }
}

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
      saveById,
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

    if (saveById) {
      await prisma.palette.update({
        where: {
          id: saveById,
        },
        data: {
          likes: {
            increment: 1,
          },
        },
      })
    }

    return NextResponse.json({ data: saveData }, { status: 201 })
  } catch (error) {
    let message = "Something went wrong"
    if (error instanceof ZodError) {
      message = error.issues.at(0)?.message || message
    }
    return NextResponse.json({ error: message }, { status: 400 })
  }
}
