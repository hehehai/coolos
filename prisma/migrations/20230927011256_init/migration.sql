/*
  Warnings:

  - You are about to drop the `Palette` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Palette";

-- CreateTable
CREATE TABLE "palette" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "colors" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT NOT NULL,

    CONSTRAINT "palette_pkey" PRIMARY KEY ("id")
);
