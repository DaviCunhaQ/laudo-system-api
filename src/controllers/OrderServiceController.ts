import { PrismaClient } from "@prisma/client";
import { Request , Response } from "express";
import prisma from "../lib/prisma";
import { AppError } from "../errors/AppError";
import z from "zod"
import {hash} from "bcrypt"
import { DraftSchema, ServiceOrderSchema } from "../types";

export class OrderServiceController {
  public async list(_req: Request, res: Response) {
    
    const serviceOrders = await prisma.serviceOrder.findMany()
    res.status(200).json(serviceOrders);
    return;
  }

  public async show (req: Request, res: Response) {
    
    const { id } = req.params;
    const serviceOrder = await prisma.serviceOrder.findUnique({
      where: {
        id: id
      }
    });

    if (!serviceOrder){
      throw new AppError("Ordem de serviço não encontrada",404)
    }

    res.status(200).json(serviceOrder);
    return;
  }

  public async create (req: Request, res: Response) {
    
    const bodyParsed = ServiceOrderSchema.parse(req.body);

    const orderService = await prisma.serviceOrder.create({
      data: bodyParsed
    })

    res.status(201).json({message: "Ordem de serviço criada com sucesso!" , data: orderService});
    return;
  }
  
  public async update (req: Request, res: Response) {
    const { id } = req.params;
    const bodyParsed = DraftSchema.parse(req.body);
    await prisma.user.update({
      where: { id },
      data: bodyParsed
    });

    res.status(201).json({message: "Ordem de serviço atualizada com sucesso!"});
    return;
  }

  public async delete (req: Request, res: Response) {
    
    const { id } = req.params;

    const serviceOrder = prisma.serviceOrder.findUnique({
      where: {id}
    })

    if (!serviceOrder){
      throw new AppError("Ordem de serviço não encontrada.", 404)
    }

    await prisma.serviceOrder.delete({
      where: { id }
    });
    res.status(201).json({message: "Ordem de serviço deletada com sucesso!"});
    return;
  }
}