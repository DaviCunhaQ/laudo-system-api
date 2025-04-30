import { PrismaClient } from "@prisma/client";
import { Request , Response } from "express";
import prisma from "../lib/prisma";
import { AppError } from "../errors/AppError";
import z from "zod"
import {hash} from "bcrypt"
import { CreateServiceOrderSchema, DraftSchema, ServiceOrderSchema } from "../types";

export class OrderServiceController {
  public async list(_req: Request, res: Response) {
    
    const serviceOrders = await prisma.serviceOrder.findMany({
      orderBy: {created_at: "desc"}
    })
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
    
    const {city: cityId, order_type: soTypeId , form_link, service_value , displacement_value, contact_name, company, order_number, cep, client_name, contact_number, opening_date, rgi_registration, address} = CreateServiceOrderSchema.parse(req.body);

    const orderExists = await prisma.serviceOrder.findUnique({
      where: {order_number}
    })

    if(orderExists) throw new AppError("O.S. já cadastrada!", 400)

    const finalCity = await prisma.city.findUnique({
      where: { id: cityId }
    })

    const finalSoType = await prisma.soType.findUnique({
      where: {id: soTypeId}
    })

    const helloMessage = `Olá ${contact_name} Estamos assessorando a empresa ${company}, credenciada da Caixa Econômica e recebemos a ordem de serviço (O.S) de N° ${order_number} do tipo ${finalSoType?.code} ,do cliente  ${client_name}. Em breve será feita a análise inicial da documentação e qualquer problema ou atualização no processo entraremos em contato.`
    const formMessage = `Para agilizar o atendimento, desenvolvemos um questionário para ser preenchido com algumas informações básicas. Este questionário não é obrigatório, mas ajuda a equipe técnica a adiantar a redação do laudo. Segue o link: [Questionário](${form_link})`
    const finish_message = `Oi, o seu laudo de nº ${order_number}, do cliente ${client_name}, está concluído e já se encontra no sistema da caixa. Procure sua agência ou seu correspondente bancário, qualquer dúvida estamos a disposição.`
    const now = new Date()
    const futureDate = new Date(now)
    futureDate.setDate(now.getDate() + (finalSoType?.days_limit as number));
    const date_expire = futureDate.toLocaleDateString('pt-BR');

    const orderService = await prisma.serviceOrder.create({
      data: {
        service_value: finalSoType?.service_value ? finalSoType.service_value as number : service_value as number,
        displacement_value: finalSoType?.service_value? finalCity?.displacement_value as number : displacement_value as number,  
        city: cityId,
        order_type: soTypeId,
        status: "LAUNCHED",
        order_number,
        client_name,
        cep,
        company,
        contact_name,
        contact_number,
        opening_date,
        rgi_registration,
        date_expire,
        form_message: formMessage,
        hello_message: helloMessage,
        address,
        finish_message
      }
    })

    res.status(201).json({message: "Ordem de serviço criada com sucesso!" , data: orderService});
    return;
  }
  
  public async update (req: Request, res: Response) {
    const { id } = req.params;
    const bodyParsed = DraftSchema.parse(req.body);
    await prisma.serviceOrder.update({
      where: { id },
      data: bodyParsed
    });

    res.status(200).json({message: "Ordem de serviço atualizada com sucesso!"});
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