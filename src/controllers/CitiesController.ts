import { Request , Response } from "express";
import prisma from "../lib/prisma";
import { AppError } from "../errors/AppError";
import z from "zod";

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
  
  public async create (req: Request, res: Response) {

    const BodySchema = z.object({
      name: z.string().min(1,"O campo nome não pode estar vazio."),
      displacement_value: z.number().min(1, "O campo email não pode estar vazio."),
      identify: z.string().min(1, "O campo nome não pode estar vazio.")
    })
    
    const { name, displacement_value , identify } = BodySchema.parse(req.body);
    const userExists = await prisma.city.findFirst({
      where:{
        identify: identify
      }
    })

    if(userExists){
      throw new AppError("Cidade já existe." , 409)
    }

    const user = await prisma.city.create({
      data: {
        name: name,
        displacement_value: displacement_value,
        identify: identify
      }
    });

    res.status(201).json({message: "Cidade criada com sucesso!" , data: user});
    return;
  }
}