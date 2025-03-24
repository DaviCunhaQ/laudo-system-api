import { OccurrenceRepository } from '@/modules/occurrences/infra/occurrence.repository'
import { ParticipantRepository } from '@/modules/participants/infra/participant.repository'
import { NotFoundException } from '@nestjs/common'
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs'
import { ListParticipantQuery } from '../query/list-participant.query'

@QueryHandler(ListParticipantQuery)
export class ListParticipantHandler
  implements IQueryHandler<ListParticipantQuery>
{
  constructor(
    private participantService: ParticipantRepository,
    private occurrenceRepository: OccurrenceRepository,
  ) {}

  async execute(query: ListParticipantQuery) {
    const { occurrenceId } = query

    if (!occurrenceId) throw new NotFoundException('Ocorrência não fornecida')

    const occurrenceExists =
      await this.occurrenceRepository.getById(occurrenceId)

    if (!occurrenceExists) {
      throw new NotFoundException('Ocorrência não encontrada')
    }

    return await this.participantService.getAll(occurrenceId)
  }
}
