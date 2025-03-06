import { Router } from "express"
import db from "../database"

const router = Router()

router.get("/", async (req, res) => {
  const logs = await db("logs").select("*")
  res.json(logs)
})
 
router.get("/:id", async (req, res) => {
  const log = await db("logs").where({ id: req.params.id }).first()
  log ? res.json(log) : res.status(404).json({ message: "Log não encontrado" })
})

router.post("/", async (req, res) => {
  try {
    const [id] = await db("logs").insert(req.body)
    const log = await db("logs").where({ id }).first()
    res.status(201).json(log)
  } catch (error) {
    res.status(400).json({ message: "Erro ao criar log", error })
  }
})

export default router
