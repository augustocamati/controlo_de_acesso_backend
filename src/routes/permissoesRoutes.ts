import { Request, Response, Router } from "express"
import { PrismaClient } from "@prisma/client"

const router = Router()
const prisma = new PrismaClient()

// Criar uma permissão
router.post("/", async (req, res) => {
  try {
    const { usuario, cargo, salas, quartos, rfid, status } = req.body
    const novaPermissao = await prisma.permissao.create({
      data: {
        usuario,
        cargo,
        salas: JSON.stringify(salas), // Armazena salas como string JSON
        quartos: JSON.stringify(quartos),
        rfid: rfid.toLowerCase().trim(), // Converte o UID para minúsculas
        status,
      },
    })
    

 
    res.status(201).json(novaPermissao)
  } catch (error) {
    res.status(500).json({ message: "Erro ao criar permissão.", error })
  }
})

// Listar todas as permissões
router.get("/", async (req, res) => {
  try {
    const permissoes = await prisma.permissao.findMany()

    // Converter a string JSON das salas para array antes de retornar
    const permissoesFormatadas = permissoes.map((permissao) => ({
      ...permissao,
      salas: JSON.parse(permissao.salas),
      quartos: JSON.parse(permissao.quartos),
      
    }))


   

    
    res.json(permissoesFormatadas)
  } catch (error) {
    res.status(500).json({ message: "Erro ao listar permissões.", error })
  }
})

router.get("/uid", async (req, res) => {
  const { uid } = req.query

  if (!uid) {
    throw new Error("UID não fornecido")
  }

  try {
    const permissao = await prisma.permissao.findUnique({
      where: { rfid: String(uid).toLowerCase().trim() }, // Converte o UID para minúsculas
    })

    if (!permissao) {
      throw new Error("Permissão não encontrada")
    }
let usuarioData
console.log("fora", permissao.cargo)
if(permissao.cargo === "Visitante"){  
      console.log("first", permissao.cargo)
      const usuario = await prisma.visitante.findFirst({
        where: { nome: permissao.usuario },
      })
      usuarioData = usuario
    }
    else{
      const usuario = await prisma.funcionario.findMany({
        where: { nome: permissao.usuario, cargo: permissao.cargo },
      })
      usuarioData= usuario
    }

    // Se existir, respondemos com os dados
    res.json({
      status: "ok",
      permissao: permissao,
      usuarioData // Ajuste este campo conforme o nome real
    })
  } catch (error: any) {
    console.error("Erro ao verificar UID:", error)
    res
      .status(500)
      .json({ status: "erro", error:error.message })
  }
})

// Atualizar uma permissão
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params
    const { usuario, cargo, salas, quartos, rfid, status } = req.body

    const permissaoAtualizada = await prisma.permissao.update({
      where: { id: Number(id) },
      data: {
        usuario,
        cargo,
        salas: JSON.stringify(salas), // Salvar array como JSON string
        quartos: JSON.stringify(quartos),
        rfid,
        status,
      },
    })

    res.json(permissaoAtualizada)
  } catch (error) {
    res.status(500).json({ message: "Erro ao atualizar permissão.", error })
  }
})

// Deletar uma permissão
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params

    await prisma.permissao.delete({ where: { id: Number(id) } })

    res.status(204).send()
  } catch (error) {
    res.status(500).json({ message: "Erro ao deletar permissão.", error })
  }
})

export default router
