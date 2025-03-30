/*
  Warnings:

  - You are about to drop the column `rfid` on the `funcionarios` table. All the data in the column will be lost.
  - You are about to drop the column `rfid` on the `visitantes` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "funcionarios_rfid_key";

-- DropIndex
DROP INDEX "visitantes_rfid_key";

-- AlterTable
ALTER TABLE "funcionarios" DROP COLUMN "rfid";

-- AlterTable
ALTER TABLE "visitantes" DROP COLUMN "rfid";
