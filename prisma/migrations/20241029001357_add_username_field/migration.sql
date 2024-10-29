/*
  Warnings:

  - You are about to drop the `ParticipantCheck` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[name,studentId,department,eventId,checkCode]` on the table `Participant` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `checkCode` to the `Participant` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "ParticipantCheck" DROP CONSTRAINT "ParticipantCheck_checkId_fkey";

-- DropForeignKey
ALTER TABLE "ParticipantCheck" DROP CONSTRAINT "ParticipantCheck_participantId_fkey";

-- DropIndex
DROP INDEX "Participant_name_studentId_department_eventId_key";

-- AlterTable
ALTER TABLE "Participant" ADD COLUMN     "checkCode" INTEGER NOT NULL;

-- DropTable
DROP TABLE "ParticipantCheck";

-- CreateIndex
CREATE UNIQUE INDEX "Participant_name_studentId_department_eventId_checkCode_key" ON "Participant"("name", "studentId", "department", "eventId", "checkCode");
