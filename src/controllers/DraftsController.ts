import { PrismaClient } from "@prisma/client";
import { Request , Response } from "express";
import prisma from "../lib/prisma";
import { AppError } from "../errors/AppError";
import z from "zod"
import {hash} from "bcrypt"
import { DraftSchema } from "../types";

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
    const {city , order_type , service_value , displacement_value, ...rest} = DraftSchema.parse(req.body);
    if (city && order_type){
      const finalCity = await prisma.city.findUnique({
        where: { id: city }
      })
      const finalSoType = await prisma.soType.findUnique({
        where: { id: order_type }
      })
      const draft = await prisma.draft.create({
        data: {
          city,
          order_type,
          service_value: finalSoType?.service_value ? finalSoType.service_value : service_value,
          displacement_value: finalSoType?.service_value? finalCity?.displacement_value : displacement_value,  
          ...rest
        }
      });
      res.status(201).json({message: "Rascunho criado com sucesso!" , data: draft});
      return;
    }else{
      const draft = await prisma.draft.create({
        data: {
          ...rest
        }
      });
      res.status(201).json({message: "Rascunho criado com sucesso!" , data: draft});
      return;
    }
  }
  
  public async update (req: Request, res: Response) {
    const { id } = req.params;
    const bodyParsed = DraftSchema.parse(req.body);
    await prisma.draft.update({
      where: { id },
      data: bodyParsed
    });

    
    res.status(200).json({message: "Rascunho atualizado com sucesso!"});
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