import { Prisma } from "@prisma/client"
import { Request, Response, NextFunction } from "express"
// Definição explícita da tipagem do erro
interface ErrorHandler extends Error {
  status?: number;
}

export const errorHandler = (
  error: ErrorHandler,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error("Erro detectado:", error)

  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    switch (error.code) {
      case "P2002":
        return res.status(400).json({
          message: `Erro: O campo '${error.meta?.target}' já está em uso.`,
        })

      case "P2003":
        return res.status(400).json({
          message:
            "Erro: Violação de chave estrangeira. O registro referenciado não existe.",
        })

      case "P2025":
        return res.status(404).json({
          message: "Erro: Registro não encontrado.",
        })

      default:
        return res.status(500).json({
          message: "Erro desconhecido do banco de dados.",
          code: error.code,
        })
    }
  }

  if (error instanceof Prisma.PrismaClientValidationError) {
    return res.status(400).json({
      message: "Erro de validação: Verifique os dados enviados.",
    })
  }

  res.status(500).json({
    message: "Erro interno no servidor.",
  })
}
