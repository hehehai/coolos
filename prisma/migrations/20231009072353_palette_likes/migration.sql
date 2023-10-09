/*
  Warnings:

  - Added the required column `updateAt` to the `color` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updateAt` to the `palette` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "color" ADD COLUMN     "updateAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "palette" ADD COLUMN     "deleteAt" TIMESTAMP(3),
ADD COLUMN     "description" TEXT,
ADD COLUMN     "likes" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "public" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "tag" TEXT,
ADD COLUMN     "updateAt" TIMESTAMP(3) NOT NULL;
