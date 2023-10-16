import { readFile } from "fs/promises"
import { resolve } from "path"
import prisma from "@/db"
import { Prisma } from "@prisma/client"

import { getRandomNumber } from "@/lib/utils"

async function getPaletteJson() {
  const palette = await readFile(resolve(__dirname, "./palettes.json"), "utf-8")

  return JSON.parse(palette) as Array<string[]>
}

function createPalette(palette: string[]): Prisma.PaletteCreateManyInput {
  return {
    userId: "user_2VSTcgmFlfNJ0ZiF8VGWB38SsN7",
    name: Date.now().toString(),
    colors: palette,
    public: true,
    tags: [],
    likes: getRandomNumber(100, 1000000),
  }
}

export async function savePalettes() {
  try {
    const palettes = await getPaletteJson()

    const mergePalettes = palettes.map((palette) => {
      return createPalette(palette)
    })

    await prisma.palette.createMany({
      data: mergePalettes,
    })
  } catch (err) {
    console.log("============== seeds palette error ==============")
    console.log(err)
  }
}
