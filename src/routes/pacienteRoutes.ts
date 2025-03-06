import { Router } from "express"
import db from "../database"

const router = Router()

router.get("/", async (req, res) => {
  const pacientes = await db("pacientes").select("*")
  res.json(pacientes)
})
 
router.get("/:id", async (req, res) => {
  const paciente = await db("pacientes").where({ id: req.params.id }).first()
  paciente
    ? res.json(paciente)
    : res.status(404).json({ message: "Paciente não encontrado" })
})

router.post("/", async (req, res) => {
  try {
    const [id] = await db("pacientes").insert(req.body)
    const paciente = await db("pacientes").where({ id }).first()
    res.status(201).json(paciente)
  } catch (error) {
    res.status(400).json({ message: "Erro ao criar paciente", error })
  }
})

router.put("/:id", async (req, res) => {
  try {
    await db("pacientes").where({ id: req.params.id }).update(req.body)
    const paciente = await db("pacientes").where({ id: req.params.id }).first()
    res.json(paciente)
  } catch (error) {
    res.status(400).json({ message: "Erro ao atualizar paciente", error })
  }
})

router.delete("/:id", async (req, res) => {
  try {
    await db("pacientes").where({ id: req.params.id }).del()
    res.status(204).send()
  } catch (error) {
    res.status(400).json({ message: "Erro ao excluir paciente", error })
  }
})

export default router
