import { PrismaClient } from "@prisma/client";
import { Request , Response } from "express";
import prisma from "../lib/prisma";
import { AppError } from "../errors/AppError";
import z from "zod"
import {hash} from "bcrypt"

export class DraftsController {
  public async list(_req: Request, res: Response) {
    
    const drafts = await prisma.draft.findMany()
    res.status(200).json(drafts);
    return;
  }

  public async show (req: Request, res: Response) {
    
    const { id } = req.params;
    const draft = await prisma.draft.findUnique({
      where: {
        id: id
      }
    });

    if (!draft){
      throw new AppError("Rascunho não encontrado.",404)
    }

    res.status(200).json(draft);
    return;
  }

  public async create (req: Request, res: Response) {

    const BodySchema = z.object({
      name: z.string().min(1,"O campo nome não pode estar vazio."),
      email: z.string().email().min(1, "O campo email não pode estar vazio."),
      password: z.string().min(8, "A senha deve possuir no mínimo 8 caracteres."),
      role: z.enum(["Dev","Admin","Analist","Redator"])
    })
    
    const { name, email , password , role } = BodySchema.parse(req.body);
    const userExists = await prisma.user.findFirst({
      where:{
        email: email
      }
    })

    if(userExists){
      throw new AppError("Usuário já existe." , 409)
    }

    const passwordHash = await hash(password,6)

    const user = await prisma.user.create({
      data: {
        name: name,
        email: email,
        password: passwordHash,
        role: role
      }
    });

    const {password: pass, ...rest} = user

    res.status(201).json({message: "Usuário criado com sucesso!" , data: rest});
    return;
  }
  
  public async update (req: Request, res: Response) {
    const BodySchema = z.object({
      name: z.string().optional(),
      email: z.string().email().optional(),
      password: z.string().optional(),
      role: z.enum(["Dev","Admin","Analist","Redator"]).optional()
    })
    const { id } = req.params;
    const { name, email , password , role } = BodySchema.parse(req.body);

    const userExists = prisma.user.findUnique({
      where: {id}
    })

    if (!userExists){
      throw new AppError("Usuário não encontrado.", 404)
    }

    if (password){
      const passwordHash = await hash(password,6)
      await prisma.user.update({
        where: { id },
        data: {
          name: name,
          email: email,
          password: passwordHash,
          role: role
        }
      });
    }else{
      await prisma.user.update({
        where: { id },
        data: {
          name: name,
          email: email,
          password: password,
          role: role
        }
      });
    }

    
    res.status(201).json({message: "Usuário atualizado com sucesso!"});
    return;
  }

  public async delete (req: Request, res: Response) {
    
    const { id } = req.params;

    const draft = prisma.draft.findUnique({
      where: {id}
    })

    if (!draft){
      throw new AppError("Rascunho não encontrado.", 404)
    }

    await prisma.draft.delete({
      where: { id }
    });
    res.status(201).json({message: "Rascunho deletado com sucesso!"});
    return;
  }
}