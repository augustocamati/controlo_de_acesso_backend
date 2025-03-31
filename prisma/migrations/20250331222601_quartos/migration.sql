/*
  Warnings:

  - You are about to drop the column `quarto` on the `permissoes` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "permissoes" DROP COLUMN "quarto",
ADD COLUMN     "quartos" TEXT[];
