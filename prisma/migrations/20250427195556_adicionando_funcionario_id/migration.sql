/*
  Warnings:

  - You are about to drop the column `usuarioId` on the `logs_acesso` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "logs_acesso" DROP COLUMN "usuarioId",
ADD COLUMN     "funcionarioId" INTEGER;
