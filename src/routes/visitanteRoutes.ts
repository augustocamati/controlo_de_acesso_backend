import { Router } from "express"
import db from "../database"

const router = Router()

router.get("/", async (req, res) => {
  const visitantes = await db("visitantes").select("*")
  res.json(visitantes)
})

router.get("/:id", async (req, res) => {
  const visitante = await db("visitantes").where({ id: req.params.id }).first()
  visitante
    ? res.json(visitante)
    : res.status(404).json({ message: "Visitante não encontrado" })
})

router.post("/", async (req, res) => {
  try {
    const [id] = await db("visitantes").insert(req.body)
    const visitante = await db("visitantes").where({ id }).first()
    res.status(201).json(visitante)
  } catch (error) {
    res.status(400).json({ message: "Erro ao criar visitante", error })
  }
})

router.put("/:id", async (req, res) => {
  try {
    await db("visitantes").where({ id: req.params.id }).update(req.body)
    const visitante = await db("visitantes")
      .where({ id: req.params.id })
      .first()
    res.json(visitante)
  } catch (error) {
    res.status(400).json({ message: "Erro ao atualizar visitante", error })
  }
})

router.delete("/:id", async (req, res) => {
  try {
    await db("visitantes").where({ id: req.params.id }).del()
    res.status(204).send()
  } catch (error) {
    res.status(400).json({ message: "Erro ao excluir visitante", error })
  }
})

export default router
