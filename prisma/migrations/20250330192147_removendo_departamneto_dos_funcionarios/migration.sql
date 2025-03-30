/*
  Warnings:

  - You are about to drop the column `departamento` on the `funcionarios` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "funcionarios" DROP COLUMN "departamento";

-- AlterTable
ALTER TABLE "pacientes" ALTER COLUMN "dataNascimento" SET DATA TYPE DATE;

-- AlterTable
ALTER TABLE "visitantes" ALTER COLUMN "dataEntrada" SET DATA TYPE DATE,
ALTER COLUMN "dataSaida" SET DATA TYPE DATE;
