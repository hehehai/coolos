import { NextRequest, NextResponse } from "next/server"
import prisma from "@/db"
import { SubscribeDtoSchema } from "@/db/dto/subscribe.dto"
import { Resend } from "resend"

import { EmailTemplate } from "@/components/template/demo"

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(req: NextRequest) {
  try {
    const data = await req.json()
    const { email } = SubscribeDtoSchema.parse(data?.json)

    const isSubscribe = await prisma.subscribe.findUnique({
      where: {
        email,
        status: 1,
      },
    })

    if (isSubscribe) {
      return NextResponse.json({ success: true })
    }

    const res = await resend.emails.send({
      from: "Acme <onboarding@resend.dev>",
      to: [email],
      subject: "Coolos Subscribe",
      text: "Thank you for subscribing!",
      react: EmailTemplate({ firstName: "John" }),
    })

    await prisma.subscribe.create({
      data: {
        email,
        status: 1,
        cancelId: res.id,
      },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 400 }
    )
  }
}
