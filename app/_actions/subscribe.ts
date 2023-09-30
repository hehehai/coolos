import { SubscribeDto } from "@/db/dto/subscribe.dto"
import superjson from "superjson"

export async function subscribe(url: string, { arg }: { arg: SubscribeDto }) {
  const res = await fetch(url, {
    method: "POST",
    body: superjson.stringify(arg),
  })
  const data = await res.json()
  if (!res.ok) throw new Error(`${res.statusText}: ${data.error}`)
}
