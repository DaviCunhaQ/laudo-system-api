import { PrismaService } from '@/common/database/prisma/prisma.service'
import { Injectable } from '@nestjs/common'
import { Prisma } from '@prisma/client'
import { ICreateVehicleDto, IUpdateVehicleDto } from '../http/dto/vehicle.dto'

@Injectable()
export class VehicleRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async getAll(occurrenceId: string) {
    return this.prismaService.vehicle.findMany({
      where: { occurrenceId },
    })
  }

  async getById(id: string) {
    return this.prismaService.vehicle.findUnique({ where: { id } })
  }

  async create(data: ICreateVehicleDto) {
    return this.prismaService.vehicle.createMany({ data })
  }

  async update(id: string, data: IUpdateVehicleDto) {
    return this.prismaService.vehicle.update({ where: { id }, data })
  }

  async delete(id: string) {
    return this.prismaService.vehicle.delete({ where: { id } })
  }

  async getByParams<T extends keyof Prisma.VehicleWhereInput>(
    where: Record<T, Prisma.VehicleWhereInput[T]>,
  ) {
    return this.prismaService.vehicle.findFirst({ where })
  }
}
