// Exemplo de rota em Node.js com Express e Prisma para o sistema de controle de acesso hospitalar

import express from "express"
import { PrismaClient } from "@prisma/client"

const router = express.Router()
const prisma = new PrismaClient()

// // Rota para obter todos os logs de acesso com filtros
router.get("/logs", async (req, res) => {
  try {
    const {
      startDate,
      endDate,
      userType,
      status,
      accessType,
      roomId,
      page = "1",
      limit = "50",
    } = req.query as { [key: string]: string }

    // Construir o objeto de filtro
    const where: {
      dataHora?: { gte?: Date; lte?: Date };
      tipoUsuario?: string;
      status?: string;
      tipoAcesso?: string;
      quartoId?: number;
    } = {}

    // Filtro de data
    if (startDate || endDate) {
      where.dataHora = {}
      if (startDate && typeof startDate === "string") where.dataHora.gte = new Date(startDate)
      if (endDate && typeof endDate === "string") where.dataHora.lte = new Date(endDate)
    }

    // Filtro de tipo de usuário
    if (userType && userType !== "todos") {
      where.tipoUsuario = typeof userType === "string" ? userType : undefined
    }

    // Filtro de status
    if (status) {
      where.status = typeof status === "string" ? status : undefined
    }

    // Filtro de tipo de acesso
    if (accessType) {
      where.tipoAcesso = typeof accessType === "string" ? accessType : undefined
    }

    // Filtro de quarto
    if (roomId) {
      where.quartoId = Number.parseInt(roomId)
    }

    // Calcular paginação
    const skip = (Number.parseInt(page) - 1) * Number.parseInt(limit)

    // Buscar logs de acesso com filtros e paginação
    const logs = await prisma.logAcesso.findMany({
      where,
      include: {
        funcionario: true,
        paciente: true,    
        visitante: true,
        quarto: true,
      },
      orderBy: {
        dataHora: "desc",
      },
      skip,
      take: Number.parseInt(limit),
    })

    // Contar total de registros para paginação
    const total = await prisma.logAcesso.count({ where })

    // Formatar os dados para o frontend
    const formattedLogs = logs.map((log) => {
      // Determinar o nome do usuário com base no tipo
      let usuarioNome = "Desconhecido"
      let tipoUsuario = "desconhecido"

      if (log.funcionario) {
        usuarioNome = log.funcionario.nome
        tipoUsuario = log.funcionario.cargo || "medico"
      } else if (log.paciente) {
        usuarioNome = log.paciente.nome
        tipoUsuario = "enfermeiro"
      } else if (log.visitante) {
        usuarioNome = log.visitante.nome
        tipoUsuario =  "visitante"
      }

      return {
        id: log.id,
        rfid: log.rfid,
        tipoAcesso: log.tipoAcesso,
        dataHora: log.dataHora,
        status: log.status,
        createdAt: log.createdAt,
        usuarioId: log.usuarioId,
        pacienteId: log.pacienteId,
        visitanteId: log.visitanteId,
        quartoId: log.quartoId,
        usuarioNome,
        tipoUsuario,
        quartoNumero: log.quarto ? log.quarto.numero : null,
      }
    })

    res.json({
      data: formattedLogs,
      pagination: {
        total,
        page: Number.parseInt(page),
        limit: Number.parseInt(limit),
        totalPages: Math.ceil(total / Number.parseInt(limit)),
      },
    })
  } catch (error) {
    console.error("Erro ao buscar logs de acesso:", error)
    res.status(500).json({ error: "Erro ao buscar logs de acesso" })
  }
})

// Rota para obter o log de acesso mais recente (para monitoramento em tempo real)
router.get("/latest", async (req, res) => {
  try { 
    const latestLog = await prisma.logAcesso.findFirst({
      orderBy: {
        dataHora: "desc",
      },
      include: {
        funcionario: true,
        paciente: true,
        visitante: true,
        quarto: true,
      },
    })

    if (!latestLog) {
      throw new Error("Nenhum log de acesso encontrado")
    }

    // Determinar o nome do usuário com base no tipo
    let usuarioNome = "Desconhecido"
    let tipoUsuario = "desconhecido"

    if (latestLog.funcionario) {
      usuarioNome = latestLog.funcionario.nome
      tipoUsuario = latestLog.funcionario.cargo || "medico"
    } else if (latestLog.paciente) {
      usuarioNome = latestLog.paciente.nome
      tipoUsuario = "enfermeiro"
    } else if (latestLog.visitante) {
      usuarioNome = latestLog.visitante.nome
      tipoUsuario = "visitante"
    }

    res.json({
      id: latestLog.id,
      rfid: latestLog.rfid,
      tipoAcesso: latestLog.tipoAcesso,
      dataHora: latestLog.dataHora,
      status: latestLog.status,
      createdAt: latestLog.createdAt,
      usuarioId: latestLog.usuarioId,
      pacienteId: latestLog.pacienteId,
      visitanteId: latestLog.visitanteId,
      quartoId: latestLog.quartoId,
      usuarioNome,
      tipoUsuario,
      quartoNumero: latestLog.quarto ? latestLog.quarto.numero : null,
    })
  } catch (error: any) {
    console.error("Erro ao buscar log de acesso mais recente:", error)
    res.status(500).json({ error: "Erro ao buscar log de acesso mais recente", message: error.message })
  }
})

// Rota para criar um novo log de acesso (usado pelo sistema de controle de acesso)
router.post("/", async (req, res) => {
  try {
    const {  
      rfid,
      tipoAcesso,
      status,
      usuarioId,
      funcionarioId,
      pacienteId,
      visitanteId,
      quartoId,
    } = req.body

    const newLog = await prisma.logAcesso.create({
      data: {
        rfid,
        tipoAcesso,
        dataHora: new Date(),
        status,
        funcionarioId: funcionarioId||usuarioId || null, // Defina o ID do funcionário se necessário
        usuarioId: usuarioId || null,
        pacienteId: pacienteId || null,
        visitanteId: visitanteId || null,
        quartoId: quartoId || null,
      },
      include: {
        funcionario: true,
        paciente: true,
        visitante: true,
        quarto: true,
      },
    })

    res.status(201).json(newLog)
  } catch (error) {
    console.error("Erro ao criar log de acesso:", error)
    res.status(500).json({ error: "Erro ao criar log de acesso" })
  }
})

export default router
