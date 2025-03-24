import { DraftRepository } from '@/modules/drafts/infra/draft.repository'
import { BadRequestException } from '@nestjs/common'
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs'
import { UpdateDraftCommand } from '../command'

@CommandHandler(UpdateDraftCommand)
export class UpdateDraftHandler implements ICommandHandler<UpdateDraftCommand> {
  constructor(private draftRepository: DraftRepository) {}

  async execute(command: UpdateDraftCommand) {
    const { id, data } = command

    const draft = await this.draftRepository.getById(id)

    if (!draft) {
      throw new BadRequestException('Rascunho inexistente')
    }

    return await this.draftRepository.update(id, data)
  }
}
