import { Router } from "express"
import { PrismaClient } from "@prisma/client"

const router = Router()
const prisma = new PrismaClient()


router.get("/", async (req, res) => {
  try {
    const quartos = await prisma.quarto.findMany()
    res.json(quartos)
  } catch (error) {
    res.status(500).json({ message: "Erro ao buscar quarto", error })
  }
})

// Buscar quarto por ID
router.get("/:id", async (req, res) => {
  try {
    const quarto = await prisma.quarto.findUnique({
      where: { id: Number(req.params.id) },
    })
    quarto
      ? res.json(quarto)
      : res.status(404).json({ message: "quarto não encontrado" })
  } catch (error) {
    res.status(500).json({ message: "Erro ao buscar quarto", error })
  }
})

// Criar novo quarto
router.post("/", async (req, res) => {
  try {
    const quarto = await prisma.quarto.create({
      data: req.body,
    })
    res.status(201).json(quarto)
  } catch (error) {
    res.status(400).json({ message: "Erro ao criar quarto", error })
  }
})

// Atualizar quarto
router.put("/:id", async (req, res) => {
  try {
    const quarto = await prisma.quarto.update({
      where: { id: Number(req.params.id) },
      data: req.body,
    })
    res.json(quarto)
  } catch (error) {
    res.status(400).json({ message: "Erro ao atualizar quarto", error })
  }
})

// Excluir quarto
router.delete("/:id", async (req, res) => {
  try {
    await prisma.quarto.delete({
      where: { id: Number(req.params.id) },
    })
    res.status(204).send()
  } catch (error) {
    res.status(400).json({ message: "Erro ao excluir quarto", error })
  }
})

export default router
