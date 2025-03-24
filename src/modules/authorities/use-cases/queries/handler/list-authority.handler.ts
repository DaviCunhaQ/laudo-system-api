import { AuthorityRepository } from '@/modules/authorities/infra/authority.repository'
import { OccurrenceRepository } from '@/modules/occurrences/infra/occurrence.repository'
import { NotFoundException } from '@nestjs/common'
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs'
import { ListAuthorityQuery } from '../query/list-authority.handler'

@QueryHandler(ListAuthorityQuery)
export class ListAuthorityHandler implements IQueryHandler<ListAuthorityQuery> {
  constructor(
    private authorityRepository: AuthorityRepository,
    private occurrenceRepository: OccurrenceRepository,
  ) {}

  async execute(query: ListAuthorityQuery) {
    const { occurrenceId } = query

    if (!occurrenceId) throw new NotFoundException('Ocorrência não fornecida')

    const occurrence = await this.occurrenceRepository.getById(occurrenceId)

    if (!occurrence) throw new NotFoundException('Ocorrência não encontrada')

    return await this.authorityRepository.getAll(occurrenceId)
  }
}
