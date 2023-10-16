import prisma from "@/db"

import { savePalettes } from "./palette"

async function main() {
  // empty
  await savePalettes()
}

try {
  await main()
  await prisma.$disconnect()
} catch (e) {
  console.error(e)
  await prisma.$disconnect()
  process.exit(1)
}
