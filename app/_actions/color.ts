import { UpsetColorDto } from "@/db/dto/color.dto"
import superjson from "superjson"

export async function likeColor(url: string, { arg }: { arg: UpsetColorDto }) {
  const res = await fetch(url, {
    method: "POST",
    body: superjson.stringify(arg),
  })
  const data = await res.json()
  if (!res.ok) throw new Error(`${res.statusText}: ${data.error}`)
}
