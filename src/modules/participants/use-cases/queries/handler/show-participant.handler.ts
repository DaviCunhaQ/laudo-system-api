import { ParticipantRepository } from '@/modules/participants/infra/participant.repository'
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs'
import { ShowParticipantQuery } from '../query/show-participant.query'
import { NotFoundException } from '@nestjs/common'

@QueryHandler(ShowParticipantQuery)
export class ShowParticipantHandler
  implements IQueryHandler<ShowParticipantQuery>
{
  constructor(private participantService: ParticipantRepository) {}

  async execute(query: ShowParticipantQuery) {
    const { id } = query

    const participant = await this.participantService.getById(id)

    if (!participant) throw new NotFoundException('Participante nao encontrado')

    return await this.participantService.getById(id)
  }
}
