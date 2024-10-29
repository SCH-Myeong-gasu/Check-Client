/*
  Warnings:

  - You are about to drop the column `eventId` on the `Check` table. All the data in the column will be lost.
  - Added the required column `eventCode` to the `Check` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Check" DROP CONSTRAINT "Check_eventId_fkey";

-- AlterTable
ALTER TABLE "Check" DROP COLUMN "eventId",
ADD COLUMN     "eventCode" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Check" ADD CONSTRAINT "Check_eventCode_fkey" FOREIGN KEY ("eventCode") REFERENCES "Event"("code") ON DELETE CASCADE ON UPDATE CASCADE;
