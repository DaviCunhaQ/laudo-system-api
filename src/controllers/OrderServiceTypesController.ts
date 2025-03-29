import { Request , Response } from "express";
import prisma from "../lib/prisma";

export class OrderServiceTypesController {
  public async list(_req: Request, res: Response) {
    
    const serviceTypes = await prisma.soType.findMany()
    res.status(200).json(serviceTypes);
    return;
  }
}