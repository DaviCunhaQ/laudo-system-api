import 'express-async-errors'
import express, { NextFunction, Request, Response, Router } from "express";
import { routes } from "./routes";
import { AppError } from "./errors/AppError";
import { ZodError } from "zod";
import cors from "cors"

const app = express();

app.use(cors({
  origin: process.env.CORS_ORIGIN,
  credentials: true,
}))

app.use(express.json());
app.use(routes);

app.use((error: Error, req: Request , res: Response, next: NextFunction)=>{

  if (error instanceof AppError){
    res.status(error.statusCode).json({
      status: "Erro",
      message: error.message
    })
    return 
  }

  if (error instanceof ZodError){
    res.status(500).json({
      message: "Formato de Envio da Requisição Inválida.",
      errors: error.message
    })
    return 
  }

  res.status(500).json({
    status: "Erro",
    message: "Erro interno no servidor."
  })
  return 
})

app.listen(process.env.PORT || 3333, () => console.log("Server is running!"));
