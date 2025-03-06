import { Router } from "express"
// import authRoutes from "./authRoutes"
import pacienteRoutes from "./pacienteRoutes"
import funcionarioRoutes from "./funcionarioRoutes"
import visitanteRoutes from "./visitanteRoutes"
import logRoutes from "./logRoutes"

const router = Router()
// router.use("/auth", authRoutes)
router.use("/pacientes", pacienteRoutes)
router.use("/funcionarios", funcionarioRoutes)
router.use("/visitantes", visitanteRoutes)
router.use("/logs", logRoutes)

export default router
