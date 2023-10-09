/*
  Warnings:

  - You are about to drop the column `tag` on the `palette` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "palette" DROP COLUMN "tag",
ADD COLUMN     "tags" TEXT;
