import { PrismaClient } from "@prisma/client";
import { Request , Response } from "express";
import prisma from "../lib/prisma";

export class UsersController {
  public async list(_req: Request, res: Response) {
    
    const users = await prisma.user.findMany();
    res.status(200).json(users);
    return;
  }

  public async show (req: Request, res: Response) {
    
    const { id } = req.params;
    const user = await prisma.user.findUnique({
      where: {
        id: id
      }
    });
    const userToShow = user ? {
      name: user.name,
      email: user.email,
      id: user
    } : { message: "Usuário não encontrado" };

    res.status(user ? 200 : 400).json(userToShow);
    return;
  }

  public async create (req: Request, res: Response) {
    
    const { name, email , password } = req.body;
    const user = await prisma.user.create({
      data: {
        name: name,
        email: email,
        password: password
      }
    });
    res.status(201).json({message: "Usuário criado com sucesso!" , user});
    return;
  }
  
  public async update (req: Request, res: Response) {
    
    const { id } = req.params;
    const { name, email , password } = req.body;
    const user = await prisma.user.update({
      where: { id },
      data: {
        name: name,
        email: email,
        password: password
      }
    });
    res.status(201).json({message: "Usuário atualizado com sucesso!" , user});
    return;
  }

  public async delete (req: Request, res: Response) {
    
    const { id } = req.params;
    const user = await prisma.user.delete({
      where: { id }
    });
    res.status(201).json({message: "Usuário deletado com sucesso!"});
    return;
  }
}