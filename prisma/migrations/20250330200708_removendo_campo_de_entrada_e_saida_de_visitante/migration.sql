/*
  Warnings:

  - You are about to drop the column `dataEntrada` on the `visitantes` table. All the data in the column will be lost.
  - You are about to drop the column `dataSaida` on the `visitantes` table. All the data in the column will be lost.
  - You are about to drop the column `rfidTemporario` on the `visitantes` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `visitantes` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[rfid]` on the table `visitantes` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "visitantes_rfidTemporario_key";

-- AlterTable
ALTER TABLE "visitantes" DROP COLUMN "dataEntrada",
DROP COLUMN "dataSaida",
DROP COLUMN "rfidTemporario",
DROP COLUMN "status",
ADD COLUMN     "rfid" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "visitantes_rfid_key" ON "visitantes"("rfid");
