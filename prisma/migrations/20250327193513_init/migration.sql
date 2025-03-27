-- CreateTable
CREATE TABLE "usuarios" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "senha" TEXT NOT NULL,
    "cargo" TEXT NOT NULL,
    "departamento" TEXT,
    "rfid" TEXT,
    "dataAdmissao" TIMESTAMP(3) NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'ativo',
    "ultimoAcesso" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "usuarios_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pacientes" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "dataNascimento" TIMESTAMP(3) NOT NULL,
    "numeroQuarto" TEXT,
    "dataAdmissao" TIMESTAMP(3) NOT NULL,
    "dataAlta" TIMESTAMP(3),
    "rfid" TEXT,
    "status" TEXT NOT NULL DEFAULT 'internado',
    "observacoes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "quartoId" INTEGER,

    CONSTRAINT "pacientes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "visitantes" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "bi" TEXT NOT NULL,
    "motivoVisita" TEXT NOT NULL,
    "rfidTemporario" TEXT,
    "dataEntrada" TIMESTAMP(3) NOT NULL,
    "dataSaida" TIMESTAMP(3),
    "status" TEXT NOT NULL DEFAULT 'ativo',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "pacienteId" INTEGER,

    CONSTRAINT "visitantes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "areas" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "tipo" TEXT NOT NULL,
    "nivelAcesso" TEXT NOT NULL,
    "andar" TEXT,
    "capacidade" INTEGER,
    "status" TEXT NOT NULL DEFAULT 'ativo',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "areas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "quartos" (
    "id" SERIAL NOT NULL,
    "numero" TEXT NOT NULL,
    "andar" TEXT NOT NULL,
    "tipo" TEXT NOT NULL,
    "capacidade" INTEGER NOT NULL DEFAULT 1,
    "status" TEXT NOT NULL DEFAULT 'disponivel',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "quartos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "permissoes" (
    "id" SERIAL NOT NULL,
    "nivelAcesso" TEXT NOT NULL,
    "horarioInicio" TEXT,
    "horarioFim" TEXT,
    "diasSemana" TEXT,
    "status" TEXT NOT NULL DEFAULT 'ativo',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "usuarioId" INTEGER NOT NULL,
    "areaId" INTEGER,
    "quartoId" INTEGER,

    CONSTRAINT "permissoes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "logs_acesso" (
    "id" SERIAL NOT NULL,
    "rfid" TEXT NOT NULL,
    "tipoAcesso" TEXT NOT NULL,
    "dataHora" TIMESTAMP(3) NOT NULL,
    "status" TEXT NOT NULL,
    "dispositivoId" TEXT,
    "ipAddress" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "usuarioId" INTEGER,
    "pacienteId" INTEGER,
    "visitanteId" INTEGER,
    "areaId" INTEGER,
    "quartoId" INTEGER,
    "dispositivoIdRef" INTEGER,

    CONSTRAINT "logs_acesso_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "dispositivos" (
    "id" SERIAL NOT NULL,
    "codigo" TEXT NOT NULL,
    "tipo" TEXT NOT NULL,
    "localizacao" TEXT NOT NULL,
    "ipAddress" TEXT,
    "macAddress" TEXT,
    "status" TEXT NOT NULL DEFAULT 'ativo',
    "ultimaComunicacao" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "areaId" INTEGER,
    "quartoId" INTEGER,

    CONSTRAINT "dispositivos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "alertas" (
    "id" SERIAL NOT NULL,
    "tipo" TEXT NOT NULL,
    "mensagem" TEXT NOT NULL,
    "nivelSeveridade" TEXT NOT NULL,
    "rfid" TEXT,
    "dataHora" TIMESTAMP(3) NOT NULL,
    "resolvido" BOOLEAN NOT NULL DEFAULT false,
    "dataResolucao" TIMESTAMP(3),
    "observacoes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "usuarioId" INTEGER,
    "areaId" INTEGER,
    "quartoId" INTEGER,
    "dispositivoId" INTEGER,

    CONSTRAINT "alertas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "configuracoes" (
    "id" SERIAL NOT NULL,
    "chave" TEXT NOT NULL,
    "valor" TEXT NOT NULL,
    "descricao" TEXT,
    "tipo" TEXT NOT NULL,
    "categoria" TEXT NOT NULL,
    "modificavel" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "configuracoes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "cartoes_rfid" (
    "id" SERIAL NOT NULL,
    "codigo" TEXT NOT NULL,
    "tipo" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'disponivel',
    "dataEmissao" TIMESTAMP(3),
    "dataExpiracao" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "usuarioId" INTEGER,
    "pacienteId" INTEGER,
    "visitanteId" INTEGER,

    CONSTRAINT "cartoes_rfid_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "grupos_acesso" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "descricao" TEXT,
    "nivelAcesso" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "grupos_acesso_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "grupos_areas" (
    "grupoId" INTEGER NOT NULL,
    "areaId" INTEGER NOT NULL,

    CONSTRAINT "grupos_areas_pkey" PRIMARY KEY ("grupoId","areaId")
);

-- CreateTable
CREATE TABLE "usuarios_grupos" (
    "usuarioId" INTEGER NOT NULL,
    "grupoId" INTEGER NOT NULL,

    CONSTRAINT "usuarios_grupos_pkey" PRIMARY KEY ("usuarioId","grupoId")
);

-- CreateTable
CREATE TABLE "horarios_visita" (
    "id" SERIAL NOT NULL,
    "diaSemana" TEXT NOT NULL,
    "horaInicio" TEXT NOT NULL,
    "horaFim" TEXT NOT NULL,
    "tipoPaciente" TEXT,
    "status" TEXT NOT NULL DEFAULT 'ativo',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "areaId" INTEGER NOT NULL,

    CONSTRAINT "horarios_visita_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "relatorios" (
    "id" SERIAL NOT NULL,
    "titulo" TEXT NOT NULL,
    "tipo" TEXT NOT NULL,
    "parametros" JSONB,
    "dataGeracao" TIMESTAMP(3) NOT NULL,
    "arquivoPath" TEXT,
    "status" TEXT NOT NULL DEFAULT 'gerado',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "usuarioId" INTEGER NOT NULL,

    CONSTRAINT "relatorios_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "usuarios_email_key" ON "usuarios"("email");

-- CreateIndex
CREATE UNIQUE INDEX "usuarios_rfid_key" ON "usuarios"("rfid");

-- CreateIndex
CREATE UNIQUE INDEX "pacientes_rfid_key" ON "pacientes"("rfid");

-- CreateIndex
CREATE UNIQUE INDEX "visitantes_rfidTemporario_key" ON "visitantes"("rfidTemporario");

-- CreateIndex
CREATE UNIQUE INDEX "quartos_numero_key" ON "quartos"("numero");

-- CreateIndex
CREATE UNIQUE INDEX "dispositivos_codigo_key" ON "dispositivos"("codigo");

-- CreateIndex
CREATE UNIQUE INDEX "configuracoes_chave_key" ON "configuracoes"("chave");

-- CreateIndex
CREATE UNIQUE INDEX "cartoes_rfid_codigo_key" ON "cartoes_rfid"("codigo");

-- CreateIndex
CREATE UNIQUE INDEX "cartoes_rfid_usuarioId_key" ON "cartoes_rfid"("usuarioId");

-- CreateIndex
CREATE UNIQUE INDEX "cartoes_rfid_pacienteId_key" ON "cartoes_rfid"("pacienteId");

-- CreateIndex
CREATE UNIQUE INDEX "cartoes_rfid_visitanteId_key" ON "cartoes_rfid"("visitanteId");

-- AddForeignKey
ALTER TABLE "pacientes" ADD CONSTRAINT "pacientes_quartoId_fkey" FOREIGN KEY ("quartoId") REFERENCES "quartos"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "visitantes" ADD CONSTRAINT "visitantes_pacienteId_fkey" FOREIGN KEY ("pacienteId") REFERENCES "pacientes"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "permissoes" ADD CONSTRAINT "permissoes_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "usuarios"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "permissoes" ADD CONSTRAINT "permissoes_areaId_fkey" FOREIGN KEY ("areaId") REFERENCES "areas"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "permissoes" ADD CONSTRAINT "permissoes_quartoId_fkey" FOREIGN KEY ("quartoId") REFERENCES "quartos"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "logs_acesso" ADD CONSTRAINT "logs_acesso_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "usuarios"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "logs_acesso" ADD CONSTRAINT "logs_acesso_pacienteId_fkey" FOREIGN KEY ("pacienteId") REFERENCES "pacientes"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "logs_acesso" ADD CONSTRAINT "logs_acesso_visitanteId_fkey" FOREIGN KEY ("visitanteId") REFERENCES "visitantes"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "logs_acesso" ADD CONSTRAINT "logs_acesso_areaId_fkey" FOREIGN KEY ("areaId") REFERENCES "areas"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "logs_acesso" ADD CONSTRAINT "logs_acesso_quartoId_fkey" FOREIGN KEY ("quartoId") REFERENCES "quartos"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "logs_acesso" ADD CONSTRAINT "logs_acesso_dispositivoIdRef_fkey" FOREIGN KEY ("dispositivoIdRef") REFERENCES "dispositivos"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "dispositivos" ADD CONSTRAINT "dispositivos_areaId_fkey" FOREIGN KEY ("areaId") REFERENCES "areas"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "dispositivos" ADD CONSTRAINT "dispositivos_quartoId_fkey" FOREIGN KEY ("quartoId") REFERENCES "quartos"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "alertas" ADD CONSTRAINT "alertas_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "usuarios"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "alertas" ADD CONSTRAINT "alertas_areaId_fkey" FOREIGN KEY ("areaId") REFERENCES "areas"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "alertas" ADD CONSTRAINT "alertas_quartoId_fkey" FOREIGN KEY ("quartoId") REFERENCES "quartos"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "alertas" ADD CONSTRAINT "alertas_dispositivoId_fkey" FOREIGN KEY ("dispositivoId") REFERENCES "dispositivos"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cartoes_rfid" ADD CONSTRAINT "cartoes_rfid_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "usuarios"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cartoes_rfid" ADD CONSTRAINT "cartoes_rfid_pacienteId_fkey" FOREIGN KEY ("pacienteId") REFERENCES "pacientes"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cartoes_rfid" ADD CONSTRAINT "cartoes_rfid_visitanteId_fkey" FOREIGN KEY ("visitanteId") REFERENCES "visitantes"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "grupos_areas" ADD CONSTRAINT "grupos_areas_grupoId_fkey" FOREIGN KEY ("grupoId") REFERENCES "grupos_acesso"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "grupos_areas" ADD CONSTRAINT "grupos_areas_areaId_fkey" FOREIGN KEY ("areaId") REFERENCES "areas"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "usuarios_grupos" ADD CONSTRAINT "usuarios_grupos_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "usuarios"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "usuarios_grupos" ADD CONSTRAINT "usuarios_grupos_grupoId_fkey" FOREIGN KEY ("grupoId") REFERENCES "grupos_acesso"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "horarios_visita" ADD CONSTRAINT "horarios_visita_areaId_fkey" FOREIGN KEY ("areaId") REFERENCES "areas"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "relatorios" ADD CONSTRAINT "relatorios_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "usuarios"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
