import prisma from "@/db"

async function main() {
  // empty
}

try {
  await main()
  await prisma.$disconnect()
} catch (e) {
  console.error(e)
  await prisma.$disconnect()
  process.exit(1)
}
