import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import prisma from "../lib/prisma";
import { AppError } from "../errors/AppError";
import z from "zod";
import { compare, hash } from "bcrypt";
import { sign } from "jsonwebtoken";

export class LoginController {
  public async login(req: Request, res: Response) {
    const BodySchema = z.object({
      email: z.string().email().min(1, "O campo email não pode estar vazio."),
      password: z
        .string()
        .min(8, "A senha deve possuir no mínimo 8 caracteres."),
    });

    const { email, password } = BodySchema.parse(req.body);
    const user = await prisma.user.findFirst({
      where: {
        email: email,
      },
    });

    if (!user) {
      throw new AppError("Email ou senha incorretos.");
    }

    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch) {
      throw new AppError("Email ou senha incorretos.");
    }

    const token = sign(
      {},
      process.env.PASSWORD_TOKEN || "minhachavesecreta",
      {
        subject: user.id,
        expiresIn: "1d",
      }
    );

    res.status(201).json({ token: token, id: user.id, name: user.name, role: user.role });
    return;
  }
}
