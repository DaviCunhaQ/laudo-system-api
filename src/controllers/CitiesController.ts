import { Request , Response } from "express";
import prisma from "../lib/prisma";

export class CitiesController {
  public async list(_req: Request, res: Response) {
    
    const cities = await prisma.city.findMany({
      orderBy:[{
        name: 'asc'
      }]
    })
    res.status(200).json(cities);
    return;
  }
}