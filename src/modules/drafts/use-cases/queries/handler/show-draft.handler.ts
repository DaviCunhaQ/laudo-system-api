import { DraftRepository } from '@/modules/drafts/infra/draft.repository'
import { OccurrenceRepository } from '@/modules/occurrences/infra/occurrence.repository'
import { BadRequestException } from '@nestjs/common'
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs'
import { ShowDraftQuery } from '../query'

@QueryHandler(ShowDraftQuery)
export class ShowDraftHandler implements IQueryHandler<ShowDraftQuery> {
  constructor(private draftRepository: DraftRepository) {}

  async execute(query: ShowDraftQuery) {
    const { id } = query

    const draft = await this.draftRepository.getById(id)

    if (!draft) {
      throw new BadRequestException('Rascunho inexistente')
    }

    return await this.draftRepository.getById(id)
  }
}
