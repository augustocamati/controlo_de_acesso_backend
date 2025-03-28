import { Router } from "express"
import { PrismaClient } from "@prisma/client"

const router = Router()
const prisma = new PrismaClient()

router.get("/", async (req, res) => {
  try {
    const pacientes = await prisma.paciente.findMany()
    res.json(pacientes)
  } catch (error) {
    res.status(500).json({ message: "Erro ao buscar pacientes", error })
  }
})

router.get("/:id", async (req, res) => {
  try {
    const paciente = await prisma.paciente.findUnique({
      where: { id: Number(req.params.id) },
    })

    paciente
      ? res.json(paciente)
      : res.status(404).json({ message: "Paciente não encontrado" })
  } catch (error) {
    res.status(400).json({ message: "Erro ao buscar paciente", error })
  }
})

router.post("/", async (req, res) => {
  try {
    const paciente = await prisma.paciente.create({
      data: req.body,
    })
    res.status(201).json(paciente)
  } catch (error) {
    res.status(400).json({ message: "Erro ao criar paciente", error })
  }
})

router.put("/:id", async (req, res) => {
  try {
    const paciente = await prisma.paciente.update({
      where: { id: Number(req.params.id) },
      data: req.body,
    })

    res.json(paciente)
  } catch (error) {
    res.status(400).json({ message: "Erro ao atualizar paciente", error })
  }
})

router.delete("/:id", async (req, res) => {
  try {
    await prisma.paciente.delete({
      where: { id: Number(req.params.id) },
    })
    res.status(204).send()
  } catch (error) {
    res.status(400).json({ message: "Erro ao excluir paciente", error })
  } 
})

export default router
