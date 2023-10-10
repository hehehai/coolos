/*
  Warnings:

  - The `colors` column on the `palette` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `tags` column on the `palette` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "palette" DROP COLUMN "colors",
ADD COLUMN     "colors" TEXT[],
DROP COLUMN "tags",
ADD COLUMN     "tags" TEXT[];
