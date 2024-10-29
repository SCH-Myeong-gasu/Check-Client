/*
  Warnings:

  - You are about to drop the column `eventCode` on the `Check` table. All the data in the column will be lost.
  - Added the required column `eventId` to the `Check` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Check" DROP CONSTRAINT "Check_eventCode_fkey";

-- AlterTable
ALTER TABLE "Check" DROP COLUMN "eventCode",
ADD COLUMN     "eventId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Check" ADD CONSTRAINT "Check_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("code") ON DELETE CASCADE ON UPDATE CASCADE;
