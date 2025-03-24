import { AuthorityRepository } from '@/modules/authorities/infra/authority.repository'
import { NotFoundException } from '@nestjs/common'
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs'
import { ShowAuthorityQuery } from '../query/show-authority.handler'

@QueryHandler(ShowAuthorityQuery)
export class ShowAuthorityHandler implements IQueryHandler<ShowAuthorityQuery> {
  constructor(private authorityRepository: AuthorityRepository) {}

  async execute(query: ShowAuthorityQuery) {
    const { id } = query

    if (!id) throw new NotFoundException('Autoridade não fornecida')

    const authority = await this.authorityRepository.getById(id)

    if (!authority) throw new NotFoundException('Autoridade nao encontrada')

    return await this.authorityRepository.getById(query.id)
  }
}
