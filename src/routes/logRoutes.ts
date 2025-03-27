import { Router } from "express"
import { PrismaClient } from "@prisma/client"

const router = Router()
const prisma = new PrismaClient()

router.get("/", async (req, res) => {
  try {
    const logs = await prisma.log.findMany()
    res.json(logs)
  } catch (error) {
    res.status(500).json({ message: "Erro ao buscar logs", error })
  }
})

router.get("/:id", async (req, res) => {
  try {
    const log = await prisma.log.findUnique({
      where: { id: Number(req.params.id) },
    })
    log
      ? res.json(log)
      : res.status(404).json({ message: "Log não encontrado" })
  } catch (error) {
    res.status(500).json({ message: "Erro ao buscar log", error })
  }
})

router.post("/", async (req, res) => {
  try {
    const log = await prisma.log.create({
      data: req.body,
    })
    res.status(201).json(log)
  } catch (error) {
    res.status(400).json({ message: "Erro ao criar log", error })
  }
})

export default router
