import { DraftRepository } from '@/modules/drafts/infra/draft.repository'
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs'
import { ListDraftsQuery } from '../query/list-handler.query'

@QueryHandler(ListDraftsQuery)
export class ListDraftHandler implements IQueryHandler<ListDraftsQuery> {
  constructor(private draftRepository: DraftRepository) {}

  async execute() {
    return await this.draftRepository.getAll()
  }
}
