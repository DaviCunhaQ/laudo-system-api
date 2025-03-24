import { OccurrenceRepository } from '@/modules/occurrences/infra/occurrence.repository'
import { NotFoundException } from '@nestjs/common'
import { ICommandHandler, QueryHandler } from '@nestjs/cqrs'
import { ShowOccurrenceQuery } from '../query/show-occurrence.query'

@QueryHandler(ShowOccurrenceQuery)
export class ShowOccurrenceHandler
  implements ICommandHandler<ShowOccurrenceQuery>
{
  constructor(private readonly occurrenceRepository: OccurrenceRepository) {}

  async execute(command: ShowOccurrenceQuery) {
    const { id } = command

    const occurrence = await this.occurrenceRepository.getById(id)

    if (!occurrence) throw new NotFoundException('Ocorrência nao encontrada')

    return await this.occurrenceRepository.getById(id)
  }
}
