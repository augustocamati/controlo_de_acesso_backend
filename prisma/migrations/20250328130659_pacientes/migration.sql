/*
  Warnings:

  - You are about to drop the column `dataAdmissao` on the `pacientes` table. All the data in the column will be lost.
  - You are about to drop the column `dataAlta` on the `pacientes` table. All the data in the column will be lost.
  - You are about to drop the column `rfid` on the `pacientes` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `pacientes` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "pacientes_rfid_key";

-- AlterTable
ALTER TABLE "pacientes" DROP COLUMN "dataAdmissao",
DROP COLUMN "dataAlta",
DROP COLUMN "rfid",
DROP COLUMN "status";
