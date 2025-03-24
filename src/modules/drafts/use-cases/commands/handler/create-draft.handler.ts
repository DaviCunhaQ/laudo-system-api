import { DraftRepository } from '@/modules/drafts/infra/draft.repository'
import { OccurrenceRepository } from '@/modules/occurrences/infra/occurrence.repository'
import { BadRequestException } from '@nestjs/common'
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs'
import { CreateDraftCommand } from '../command'

@CommandHandler(CreateDraftCommand)
export class CreateDraftHandler implements ICommandHandler<CreateDraftCommand> {
  constructor(private draftRepository: DraftRepository) {}

  async execute(command: CreateDraftCommand) {
    const { id } = command
    const { data } = command

    if (id) {
      const draft = await this.draftRepository.getById(id)

      if (!draft) {
        throw new BadRequestException('Rascunho inexistente')
      }

      await this.draftRepository.update(id, data)

      return {
        message: 'Rascunho atualizado com sucesso',
      }
    }

    await this.draftRepository.create(data)

    return {
      message: 'Rascunho criado com sucesso',
    }
  }
}
