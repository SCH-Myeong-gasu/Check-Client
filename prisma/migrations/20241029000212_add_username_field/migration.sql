/*
  Warnings:

  - A unique constraint covering the columns `[name,studentId,department,eventId]` on the table `Participant` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Participant_name_studentId_department_eventId_key" ON "Participant"("name", "studentId", "department", "eventId");
