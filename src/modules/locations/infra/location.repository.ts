import { PrismaService } from '@/common/database/prisma/prisma.service'
import { Injectable } from '@nestjs/common'

import { Prisma } from '@prisma/client'
import {
  ICreateLocationDto,
  IUpdateLocationDto,
} from '../http/dto/location.dto'

@Injectable()
export class LocationRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async getAll() {
    return this.prismaService.location.findMany()
  }

  async getById(id: string) {
    return this.prismaService.location.findUnique({ where: { id } })
  }

  async create(data: ICreateLocationDto) {
    return this.prismaService.location.create({ data })
  }

  async update(id: string, data: IUpdateLocationDto) {
    return this.prismaService.location.update({
      where: { id },
      data,
    })
  }

  async delete(id: string) {
    return this.prismaService.location.delete({
      where: { id },
    })
  }

  public async getByParams<T extends keyof Prisma.LocationWhereInput>(
    where: Record<T, Prisma.LocationWhereInput[T]>,
  ) {
    return await this.prismaService.authority.findFirst({
      where: where,
    })
  }
}
