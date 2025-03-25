import { verify } from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";
import { AppError } from "../errors/AppError";

export function ensureAuthenticate(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const authHeader = req.headers.authorization
  if (!authHeader){
    res.status(401).json({
      message: "Sem autorização!"
    })
    return
  }
  const [_,token] = authHeader.split(' ')

  try {
    const payload = verify(token, process.env.PASSWORD_TOKEN || "minhachavesecreta")
    next()
  } catch (error) {
    throw new AppError("Token inválido", 401)
  }
}
