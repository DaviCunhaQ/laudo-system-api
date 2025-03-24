import { Injectable } from '@nestjs/common'
import { Prisma } from '@prisma/client'
import { PrismaService } from 'src/common/database/prisma/prisma.service'
import { ICreateDraftDto, IUpdateDraftDto } from '../http/dto/draft.dto'

@Injectable()
export class DraftRepository {
  constructor(private readonly prismaService: PrismaService) {}

  public async getAll() {
    return await this.prismaService.drafts.findMany()
  }

  public async getById(id: string) {
    return await this.prismaService.drafts.findUnique({ where: { id } })
  }

  public async create(data: ICreateDraftDto) {
    return await this.prismaService.drafts.create({ data })
  }

  public async update(id: string, data: IUpdateDraftDto) {
    return await this.prismaService.drafts.update({ where: { id }, data })
  }

  public async delete(id: string) {
    return await this.prismaService.drafts.delete({ where: { id } })
  }

  public async getByParams<T extends keyof Prisma.DriverWhereInput>(
    where: Record<T, Prisma.DriverWhereInput[T]>,
  ) {
    return await this.prismaService.drafts.findFirst({
      where: where,
    })
  }
}
