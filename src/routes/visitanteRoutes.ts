import { Router } from "express"
import { PrismaClient } from "@prisma/client"

const router = Router()
const prisma = new PrismaClient()

router.get("/", async (req, res) => {
  try {
    const visitantes = await prisma.visitante.findMany()
    res.json(visitantes)
  } catch (error) {
    res.status(500).json({ message: "Erro ao buscar visitantes", error })
  }
})

router.get("/:id", async (req, res) => {
  try {
    const visitante = await prisma.visitante.findUnique({
      where: { id: Number(req.params.id) },
    })

    visitante
      ? res.json(visitante)
      : res.status(404).json({ message: "Visitante não encontrado" })
  } catch (error) {
    res.status(400).json({ message: "Erro ao buscar visitante", error })
  }
})

router.post("/", async (req, res) => {
  try {
    const visitante = await prisma.visitante.create({
      data: req.body,
    })
    res.status(201).json(visitante)
  } catch (error) {
    res.status(400).json({ message: "Erro ao criar visitante", error })
  }
})

router.put("/:id", async (req, res) => {
  try {
    const visitante = await prisma.visitante.update({
      where: { id: Number(req.params.id) },
      data: req.body,
    })

    res.json(visitante)
  } catch (error) {
    res.status(400).json({ message: "Erro ao atualizar visitante", error })
  }
})

router.delete("/:id", async (req, res) => {
  try {
    await prisma.visitante.delete({
      where: { id: Number(req.params.id) },
    })
    res.status(204).send()
  } catch (error) {
    res.status(400).json({ message: "Erro ao excluir visitante", error })
  }
})

export default router
