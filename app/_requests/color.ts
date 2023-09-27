import { CreateColorDto } from "@/db/dto/color.dto"
import superjson from "superjson"

export async function likeColor(url: string, { arg }: { arg: CreateColorDto }) {
  try {
    const res = await fetch(url, {
      method: "POST",
      body: superjson.stringify(arg),
    })
    const data = await res.json()
    if (!res.ok) throw new Error(`${res.statusText}: ${data.error}`)
  } catch (err) {
    throw err
  }
}
