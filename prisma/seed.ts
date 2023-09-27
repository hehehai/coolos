import prisma from "@/db"

async function main() {
  await prisma.color.create({
    data: {
      name: "Demo",
      color: "000000",
      userId: "user_2VSTcgmFlfNJ0ZiF8VGWB38SsN7",
    },
  })
}

try {
  await main()
  await prisma.$disconnect()
} catch (e) {
  console.error(e)
  await prisma.$disconnect()
  process.exit(1)
}
