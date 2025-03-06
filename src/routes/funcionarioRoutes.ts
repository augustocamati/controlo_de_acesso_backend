import { Router } from "express"
import db from "../database"

const router = Router()

router.get("/", async (req, res) => {
  const funcionarios = await db("funcionarios").select("*")
  res.json(funcionarios)
})

router.get("/:id", async (req, res) => {
  
  const funcionario = await db("funcionarios").where({ id: req.params.id }).first()
  funcionario
    ? res.json(funcionario)
    : res.status(404).json({ message: "funcionario não encontrado" })
})

router.post("/", async (req, res) => {
  try {
    const [id] = await db("funcionarios").insert(req.body)
    const funcionario = await db("funcionarios").where({ id }).first()
    res.status(201).json(funcionario)
  } catch (error) {
    res.status(400).json({ message: "Erro ao criar funcionario", error })
  } 
})

router.put("/:id", async (req, res) => {
  try {
    await db("funcionarios").where({ id: req.params.id }).update(req.body)
    const funcionario = await db("funcionarios").where({ id: req.params.id }).first()
    res.json(funcionario)
  } catch (error) {
    res.status(400).json({ message: "Erro ao atualizar funcionario", error })
  }
})

router.delete("/:id", async (req, res) => {
  try {
    await db("funcionarios").where({ id: req.params.id }).del()
    res.status(204).send()
  } catch (error) {
    res.status(400).json({ message: "Erro ao excluir funcionario", error })
  }
})

export default router
