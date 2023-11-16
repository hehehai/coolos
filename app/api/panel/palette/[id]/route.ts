import { NextRequest, NextResponse } from "next/server"
import prisma from "@/db"
import {
  queryPaletteDtoSchema,
  upsetPaletteDtoSchema,
} from "@/db/dto/palette.dto"
import { auth } from "@clerk/nextjs"
import { ZodError } from "zod"

import { pagination } from "@/lib/pagination"
import { queryStringToObject } from "@/lib/utils"
import { queryExplorePalette } from "@/app/_actions/palette"

export async function GET(
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
    const data = queryStringToObject(req.url)
    const dataParams = queryPaletteDtoSchema.parse(data)

    const palette = await queryExplorePalette({
      ...dataParams,
      userId: params.id,
    })

    return NextResponse.json(
      {
        data: palette,
        ...pagination(dataParams.page, dataParams.pageSize, palette.count),
      },
      { status: 200 }
    )
  } catch (error) {
    console.log("error", error)
    console.log(error)
    let message = "Something went wrong"
    if (error instanceof ZodError) {
      message = error.issues.at(0)?.message || message
    }
    return NextResponse.json({ error: message }, { status: 400 })
  }
}

// edit palette
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
      colors = [],
      description,
      tags = [],
      public: isPublic,
    } = upsetPaletteDtoSchema.parse({
      ...data?.json,
      id: params.id,
    })

    const palette = await prisma.palette.findUnique({ where: { id, userId } })
    if (!palette) {
      return NextResponse.json({ error: "Palette not found" }, { status: 404 })
    }

    const saveData = await prisma.palette.update({
      where: {
        id,
      },
      data: {
        name,
        description,
        tags,
        colors,
        userId,
        public: isPublic,
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
    const palette = await prisma.palette.findUnique({ where: { id, userId } })
    if (!palette) {
      return NextResponse.json({ error: "Palette not found" }, { status: 404 })
    }
    await prisma.palette.delete({ where: { id } })

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
