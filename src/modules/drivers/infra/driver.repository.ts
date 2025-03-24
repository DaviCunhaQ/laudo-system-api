import { PrismaService } from '@/common/database/prisma/prisma.service'
import { Injectable } from '@nestjs/common'
import { Prisma } from '@prisma/client'
import { ICreateDriverDto, IUpdateDriverDto } from '../http/dto/driver.dto'

@Injectable()
export class DriverRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async getAll(occurrenceId: string) {
    return await this.prismaService.driver.findMany({
      where: { occurrenceId },
    })
  }

  async getById(id: string) {
    return await this.prismaService.driver.findUnique({ where: { id } })
  }

  async create(data: ICreateDriverDto) {
    return await this.prismaService.driver.createMany({ data })
  }

  async update(id: string, data: IUpdateDriverDto) {
    return await this.prismaService.driver.update({ where: { id }, data })
  }

  async delete(id: string) {
    return await this.prismaService.driver.delete({ where: { id } })
  }

  public async getByParams<T extends keyof Prisma.DriverWhereInput>(
    where: Record<T, Prisma.DriverWhereInput[T]>,
  ) {
    return await this.prismaService.driver.findFirst({
      where: where,
    })
  }
}
