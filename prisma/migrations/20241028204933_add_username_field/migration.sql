/*
  Warnings:

  - You are about to drop the column `uuid` on the `Check` table. All the data in the column will be lost.
  - You are about to drop the column `uuid` on the `Event` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[code]` on the table `Event` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `code` to the `Event` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Check_uuid_key";

-- DropIndex
DROP INDEX "Event_uuid_key";

-- AlterTable
ALTER TABLE "Check" DROP COLUMN "uuid";

-- AlterTable
ALTER TABLE "Event" DROP COLUMN "uuid",
ADD COLUMN     "code" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Event_code_key" ON "Event"("code");
