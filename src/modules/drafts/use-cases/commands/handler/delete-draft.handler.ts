import { DraftRepository } from '@/modules/drafts/infra/draft.repository'
import { BadRequestException } from '@nestjs/common'
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs'
import { DeleteDraftCommand } from '../command'

@CommandHandler(DeleteDraftCommand)
export class CreateHandler implements ICommandHandler<DeleteDraftCommand> {
  constructor(private draftRepository: DraftRepository) {}

  async execute(command: DeleteDraftCommand) {
    const { id } = command

    const draft = await this.draftRepository.getById(id)

    if (!draft) {
      throw new BadRequestException('Rascunho inexistente')
    }

    return await this.draftRepository.delete(id)
  }
}
