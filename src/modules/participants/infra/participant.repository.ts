import { PrismaService } from '@/common/database/prisma/prisma.service'
import { Injectable } from '@nestjs/common'
import { Prisma } from '@prisma/client'
import { ICreateIncidentParticipantDto } from '../http/dto/participant.dto'

@Injectable()
export class ParticipantRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async getAll(occurrenceId: string) {
    return await this.prismaService.incidentParticipan.findMany({
      where: { occurrenceId },
    })
  }

  async getById(id: string) {
    return await this.prismaService.incidentParticipan.findUnique({
      where: { id },
    })
  }

  async create(data: ICreateIncidentParticipantDto) {
    return await this.prismaService.incidentParticipan.createMany({ data })
  }

  async update(id: string, data: any) {
    return await this.prismaService.incidentParticipan.update({
      where: { id },
      data,
    })
  }

  async delete(id: string) {
    return await this.prismaService.incidentParticipan.delete({
      where: { id },
    })
  }

  public async getByParams<T extends keyof Prisma.IncidentParticipanWhereInput>(
    where: Record<T, Prisma.IncidentParticipanWhereInput[T]>,
  ) {
    return await this.prismaService.incidentParticipan.findFirst({
      where: where,
    })
  }
}
