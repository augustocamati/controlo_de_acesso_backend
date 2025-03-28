import { Request, Response, Router } from "express"
import { PrismaClient } from "@prisma/client"

const router = Router()
const prisma = new PrismaClient()

// Criar uma permissão
router.post("/", async (req, res) => {
  try {
    const { usuario, cargo, salas, quarto, rfid, status } = req.body

    const novaPermissao = await prisma.permissao.create({
      data: {
        usuario,
        cargo,
        salas: JSON.stringify(salas), // Armazena salas como string JSON
        quarto,
        rfid,
        status,
      },
    })

    res.status(201).json(novaPermissao)
  } catch (error) {
    res.status(500).json({ error: "Erro ao criar permissão." })
  }
})

// Listar todas as permissões
router.get("/", async (req, res) => {
  try {
    const permissoes = await prisma.permissao.findMany()

    // Converter a string JSON das salas para array antes de retornar
    const permissoesFormatadas = permissoes.map((permissao) => ({
      ...permissao,
      salas: JSON.parse(permissao.salas),
    }))

    res.json(permissoesFormatadas)
  } catch (error) {
    res.status(500).json({ error: "Erro ao listar permissões." })
  }
})


// Atualizar uma permissão
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params
    const { usuario, cargo, salas, quarto, rfid, status } = req.body

    const permissaoAtualizada = await prisma.permissao.update({
      where: { id: Number(id) },
      data: {
        usuario,
        cargo,
        salas: JSON.stringify(salas), // Salvar array como JSON string
        quarto,
        rfid,
        status,
      },
    })

    res.json(permissaoAtualizada)
  } catch (error) {
    res.status(500).json({ error: "Erro ao atualizar permissão." })
  }
})

// Deletar uma permissão
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params

    await prisma.permissao.delete({ where: { id: Number(id) } })

    res.status(204).send()
  } catch (error) {
    res.status(500).json({ error: "Erro ao deletar permissão." })
  }
})

export default router
