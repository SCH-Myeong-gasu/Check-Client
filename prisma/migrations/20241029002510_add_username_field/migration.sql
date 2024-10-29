/*
  Warnings:

  - Changed the type of `code` on the `Event` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "Check" DROP CONSTRAINT "Check_eventId_fkey";

-- AlterTable
ALTER TABLE "Event" DROP COLUMN "code",
ADD COLUMN     "code" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Event_code_key" ON "Event"("code");

-- AddForeignKey
ALTER TABLE "Check" ADD CONSTRAINT "Check_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("code") ON DELETE CASCADE ON UPDATE CASCADE;
