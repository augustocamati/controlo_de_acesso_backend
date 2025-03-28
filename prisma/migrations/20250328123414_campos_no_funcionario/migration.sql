/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `funcionarios` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `email` to the `funcionarios` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nome` to the `funcionarios` table without a default value. This is not possible if the table is not empty.
  - Made the column `rfid` on table `funcionarios` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "funcionarios" ADD COLUMN     "email" TEXT NOT NULL,
ADD COLUMN     "nome" TEXT NOT NULL,
ALTER COLUMN "rfid" SET NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "funcionarios_email_key" ON "funcionarios"("email");
