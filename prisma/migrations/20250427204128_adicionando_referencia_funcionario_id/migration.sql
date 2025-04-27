-- DropForeignKey
ALTER TABLE "logs_acesso" DROP CONSTRAINT "logs_acesso_id_fkey";

-- AddForeignKey
ALTER TABLE "logs_acesso" ADD CONSTRAINT "logs_acesso_funcionarioId_fkey" FOREIGN KEY ("funcionarioId") REFERENCES "funcionarios"("id") ON DELETE SET NULL ON UPDATE CASCADE;
