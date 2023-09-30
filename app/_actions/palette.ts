import { UpsetPaletteDto } from "@/db/dto/palette.dto"
import superjson from "superjson"

export async function savePalette(
  url: string,
  { arg }: { arg: UpsetPaletteDto }
) {
  const res = await fetch(url, {
    method: "POST",
    body: superjson.stringify(arg),
  })
  const data = await res.json()
  if (!res.ok) throw new Error(`${res.statusText}: ${data.error}`)
}
