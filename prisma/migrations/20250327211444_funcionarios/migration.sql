/*
  Warnings:

  - You are about to drop the column `usuarioId` on the `relatorios` table. All the data in the column will be lost.
  - You are about to drop the `usuarios` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "alertas" DROP CONSTRAINT "alertas_usuarioId_fkey";

-- DropForeignKey
ALTER TABLE "cartoes_rfid" DROP CONSTRAINT "cartoes_rfid_usuarioId_fkey";

-- DropForeignKey
ALTER TABLE "logs_acesso" DROP CONSTRAINT "logs_acesso_usuarioId_fkey";

-- DropForeignKey
ALTER TABLE "permissoes" DROP CONSTRAINT "permissoes_usuarioId_fkey";

-- DropForeignKey
ALTER TABLE "relatorios" DROP CONSTRAINT "relatorios_usuarioId_fkey";

-- DropForeignKey
ALTER TABLE "usuarios_grupos" DROP CONSTRAINT "usuarios_grupos_usuarioId_fkey";

-- AlterTable
ALTER TABLE "relatorios" DROP COLUMN "usuarioId";

-- DropTable
DROP TABLE "usuarios";

-- CreateTable
CREATE TABLE "Usuario" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "senha" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'ativo',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Usuario_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "funcionarios" (
    "id" SERIAL NOT NULL,
    "cargo" TEXT NOT NULL,
    "departamento" TEXT,
    "rfid" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "funcionarios_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_email_key" ON "Usuario"("email");

-- CreateIndex
CREATE UNIQUE INDEX "funcionarios_rfid_key" ON "funcionarios"("rfid");

-- AddForeignKey
ALTER TABLE "permissoes" ADD CONSTRAINT "permissoes_id_fkey" FOREIGN KEY ("id") REFERENCES "funcionarios"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "logs_acesso" ADD CONSTRAINT "logs_acesso_id_fkey" FOREIGN KEY ("id") REFERENCES "funcionarios"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "alertas" ADD CONSTRAINT "alertas_id_fkey" FOREIGN KEY ("id") REFERENCES "funcionarios"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cartoes_rfid" ADD CONSTRAINT "cartoes_rfid_id_fkey" FOREIGN KEY ("id") REFERENCES "funcionarios"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "usuarios_grupos" ADD CONSTRAINT "usuarios_grupos_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "funcionarios"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
