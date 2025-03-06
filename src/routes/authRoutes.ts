// import { Router } from "express"
// // import { login, register } from "../controllers/authController"

// import bcrypt from "bcrypt"
// import jwt from 'jsonwebtoken'
// import db from "../database"
// const router = Router()
// const SECRET_KEY = process.env.JWT_SECRET || "secret"
// router.post("/login", async (req, res) => {
//   const { email, password } = req.body
//   const user = await db("usuarios").where({ email }).first()

//   if (!user || !bcrypt.compareSync(password, user.password)) {
//     return res.status(401).json({ error: "Credenciais inválidas" })
//   }

//   const token = jwt.sign({ id: user.id, role: user.role }, SECRET_KEY, {
//     expiresIn: "1h",
//   })
//   return res.json({ token })
// })


// router.post("/register", async (req, res) => {
//   const { name, email, password, role } = req.body
//   const hashedPassword = bcrypt.hashSync(password, 10)

//   try {
//     const usuarioExistente = await db("funcionarios").where({ email }).first()
//     if (usuarioExistente) {
//       return res.status(400).json({ message: "E-mail já cadastrado" })
//     }
//     await db("usuarios").insert({ name, email, password: hashedPassword, role })
//     return res.status(201).json({ message: "Usuário registrado com sucesso" })
//   } catch (error) {
//     return res.status(500).json({ error: "Erro ao registrar usuário" })
//   }
// })

// export default router
