import { PrismaService } from '@/common/database/prisma/prisma.service'
import { Injectable } from '@nestjs/common'
import { Prisma } from '@prisma/client'
import { ICreateAuthorityDto } from '../http/dto/authorities.dto'

@Injectable()
export class AuthorityRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async getAll(occurrenceId: string) {
    return await this.prismaService.authority.findMany({
      where: { occurrenceId },
    })
  }

  async getById(id: string) {
    return await this.prismaService.authority.findUnique({ where: { id } })
  }

  async create(data: ICreateAuthorityDto) {
    return await this.prismaService.authority.createMany({ data })
  }

  async update(id: string, data: any) {
    return await this.prismaService.authority.update({ where: { id }, data })
  }

  async delete(id: string) {
    return await this.prismaService.authority.delete({ where: { id } })
  }

  public async getByParams<T extends keyof Prisma.AuthorityWhereInput>(
    where: Record<T, Prisma.AuthorityWhereInput[T]>,
  ) {
    return await this.prismaService.authority.findFirst({
      where: where,
    })
  }
}
