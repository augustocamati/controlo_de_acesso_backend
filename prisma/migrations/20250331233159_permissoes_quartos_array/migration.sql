/*
  Warnings:

  - The `quartos` column on the `permissoes` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "permissoes" DROP COLUMN "quartos",
ADD COLUMN     "quartos" TEXT[];
