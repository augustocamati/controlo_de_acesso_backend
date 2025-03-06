import { Request, Response } from "express"
import bcrypt from "bcrypt"
import jwt from 'jsonwebtoken'
import db from "../database"

const SECRET_KEY = process.env.JWT_SECRET || "secret"

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body
  const user = await db("usuarios").where({ email }).first()

  if (!user || !bcrypt.compareSync(password, user.password)) {
    return res.status(401).json({ error: "Credenciais inválidas" })
  }

  const token = jwt.sign({ id: user.id, role: user.role }, SECRET_KEY, {
    expiresIn: "1h",
  })
  return res.json({ token })
}

export const register = async (req: Request, res: Response) => {
  const { name, email, password, role } = req.body
  const hashedPassword = bcrypt.hashSync(password, 10)

  try {
    await db("usuarios").insert({ name, email, password: hashedPassword, role })
    return res.status(201).json({ message: "Usuário registrado com sucesso" })
  } catch (error) {
    return res.status(500).json({ error: "Erro ao registrar usuário" })
  }
}
