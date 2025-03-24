import { PrismaService } from '@/common/database/prisma/prisma.service'

import { Injectable } from '@nestjs/common'
import { Prisma } from '@prisma/client'
import {
  ICreateOccurrenceDto,
  IUpdateOccurrenceDto,
} from '../http/dto/occurrence.dto'

@Injectable()
export class OccurrenceRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async getAll() {
    return await this.prismaService.occurrence.findMany()
  }

  async getById(id: string) {
    return await this.prismaService.occurrence.findUnique({
      where: { id },
      include: {
        location: true,
        drivers: true,
        vehicles: true,
        participants: true,
        authorities: true,
      },
    })
  }

  async create(data: Prisma.OccurrenceCreateInput) {
    return await this.prismaService.occurrence.create({ data })
  }

  async update(id: string, data: Prisma.OccurrenceUpdateInput) {
    return await this.prismaService.occurrence.update({
      where: { id },
      data: data,
    })
  }

  async delete(id: string) {
    return await this.prismaService.occurrence.delete({ where: { id } })
  }

  async getByParams<T extends keyof Prisma.OccurrenceWhereInput>(
    where: Record<T, Prisma.OccurrenceWhereInput[T]>,
  ) {
    return this.prismaService.vehicle.findFirst({ where })
  }
}
