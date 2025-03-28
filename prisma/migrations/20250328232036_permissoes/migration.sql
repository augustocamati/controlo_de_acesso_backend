/*
  Warnings:

  - You are about to drop the column `areaId` on the `permissoes` table. All the data in the column will be lost.
  - You are about to drop the column `diasSemana` on the `permissoes` table. All the data in the column will be lost.
  - You are about to drop the column `horarioFim` on the `permissoes` table. All the data in the column will be lost.
  - You are about to drop the column `horarioInicio` on the `permissoes` table. All the data in the column will be lost.
  - You are about to drop the column `nivelAcesso` on the `permissoes` table. All the data in the column will be lost.
  - You are about to drop the column `quartoId` on the `permissoes` table. All the data in the column will be lost.
  - You are about to drop the column `usuarioId` on the `permissoes` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[rfid]` on the table `permissoes` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `cargo` to the `permissoes` table without a default value. This is not possible if the table is not empty.
  - Added the required column `rfid` to the `permissoes` table without a default value. This is not possible if the table is not empty.
  - Added the required column `salas` to the `permissoes` table without a default value. This is not possible if the table is not empty.
  - Added the required column `usuario` to the `permissoes` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "permissoes" DROP CONSTRAINT "permissoes_areaId_fkey";

-- DropForeignKey
ALTER TABLE "permissoes" DROP CONSTRAINT "permissoes_id_fkey";

-- DropForeignKey
ALTER TABLE "permissoes" DROP CONSTRAINT "permissoes_quartoId_fkey";

-- AlterTable
ALTER TABLE "permissoes" DROP COLUMN "areaId",
DROP COLUMN "diasSemana",
DROP COLUMN "horarioFim",
DROP COLUMN "horarioInicio",
DROP COLUMN "nivelAcesso",
DROP COLUMN "quartoId",
DROP COLUMN "usuarioId",
ADD COLUMN     "cargo" TEXT NOT NULL,
ADD COLUMN     "quarto" TEXT,
ADD COLUMN     "rfid" TEXT NOT NULL,
ADD COLUMN     "salas" TEXT NOT NULL,
ADD COLUMN     "usuario" TEXT NOT NULL,
ALTER COLUMN "status" DROP DEFAULT;

-- CreateIndex
CREATE UNIQUE INDEX "permissoes_rfid_key" ON "permissoes"("rfid");
