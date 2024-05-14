/*
  Warnings:

  - You are about to drop the column `appointment` on the `Appointment` table. All the data in the column will be lost.
  - Added the required column `appointmentDate` to the `Appointment` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Appointment" DROP COLUMN "appointment",
ADD COLUMN     "appointmentDate" TEXT NOT NULL;
