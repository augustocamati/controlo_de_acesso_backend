import { Router } from "express"
import { PrismaClient } from "@prisma/client"

const router = Router()
const prisma = new PrismaClient()

// Listar todos os funcionários
router.get("/", async (req, res) => {
  try {
    const funcionarios = await prisma.funcionario.findMany()
    res.json(funcionarios)
  } catch (error) {
    res.status(500).json({ message: "Erro ao buscar funcionários", error })
  }
})

// Buscar funcionário por ID
router.get("/:id", async (req, res) => {
  try {
    const funcionario = await prisma.funcionario.findUnique({
      where: { id: Number(req.params.id) },
    })
    funcionario
      ? res.json(funcionario)
      : res.status(404).json({ message: "Funcionário não encontrado" })
  } catch (error) {
    res.status(500).json({ message: "Erro ao buscar funcionário", error })
  }
})

// Criar novo funcionário
router.post("/", async (req, res) => {
  try {
    const funcionario = await prisma.funcionario.create({
      data: req.body,
    })
    res.status(201).json(funcionario)
  } catch (error) {
    res.status(400).json({ message: "Erro ao criar funcionário", error })
  }
})

// Atualizar funcionário
router.put("/:id", async (req, res) => {
  try {
    const funcionario = await prisma.funcionario.update({
      where: { id: Number(req.params.id) },
      data: req.body,
    })
    res.json(funcionario)
  } catch (error) {
    res.status(400).json({ message: "Erro ao atualizar funcionário", error })
  }
})

// Excluir funcionário
router.delete("/:id", async (req, res) => {
  try {
    await prisma.funcionario.delete({
      where: { id: Number(req.params.id) },
    })
    res.status(204).send()
  } catch (error) {
    res.status(400).json({ message: "Erro ao excluir funcionário", error })
  }
})

export default router
