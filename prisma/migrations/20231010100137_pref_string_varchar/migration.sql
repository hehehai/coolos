/*
  Warnings:

  - You are about to alter the column `name` on the `color` table. The data in that column could be lost. The data in that column will be cast from `Text` to `Char(255)`.
  - You are about to alter the column `color` on the `color` table. The data in that column could be lost. The data in that column will be cast from `Text` to `Char(100)`.
  - You are about to alter the column `name` on the `palette` table. The data in that column could be lost. The data in that column will be cast from `Text` to `Char(255)`.
  - You are about to alter the column `description` on the `palette` table. The data in that column could be lost. The data in that column will be cast from `Text` to `Char(500)`.
  - You are about to alter the column `colors` on the `palette` table. The data in that column could be lost. The data in that column will be cast from `Text` to `Char(500)`.
  - You are about to alter the column `tags` on the `palette` table. The data in that column could be lost. The data in that column will be cast from `Text` to `Char(2000)`.
  - You are about to alter the column `email` on the `subscribe` table. The data in that column could be lost. The data in that column will be cast from `Text` to `Char(500)`.
  - You are about to alter the column `cancelId` on the `subscribe` table. The data in that column could be lost. The data in that column will be cast from `Text` to `Char(255)`.

*/
-- AlterTable
ALTER TABLE "color" ALTER COLUMN "name" SET DATA TYPE CHAR(255),
ALTER COLUMN "color" SET DATA TYPE CHAR(100);

-- AlterTable
ALTER TABLE "palette" ALTER COLUMN "name" SET DATA TYPE CHAR(255),
ALTER COLUMN "description" SET DATA TYPE CHAR(500),
ALTER COLUMN "colors" SET DATA TYPE CHAR(500)[],
ALTER COLUMN "tags" SET DATA TYPE CHAR(2000)[];

-- AlterTable
ALTER TABLE "subscribe" ALTER COLUMN "email" SET DATA TYPE CHAR(500),
ALTER COLUMN "cancelId" SET DATA TYPE CHAR(255);
