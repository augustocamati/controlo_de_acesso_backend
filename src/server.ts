import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import routes from "./routes"

dotenv.config()

const app = express()
app.use(express.json())
app.use(cors())

app.use("/api", routes)

const PORT = process.env.PORT || 3003


  app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`)
  })
