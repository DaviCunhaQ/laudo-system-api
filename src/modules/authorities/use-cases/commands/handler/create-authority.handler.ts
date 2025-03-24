import { AuthorityRepository } from '@/modules/authorities/infra/authority.repository'
import { OccurrenceRepository } from '@/modules/occurrences/infra/occurrence.repository'
import { BadRequestException, NotFoundException } from '@nestjs/common'
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs'
import { CreateAuthorityCommand } from '../command/create-authority.command'

@CommandHandler(CreateAuthorityCommand)
export class CreateAuthorityHandler
  implements ICommandHandler<CreateAuthorityCommand>
{
  constructor(
    private authorityRepository: AuthorityRepository,
    private occurrenceRepository: OccurrenceRepository,
  ) {}

  async execute(command: CreateAuthorityCommand) {
    const { data } = command

    if (!data.length)
      throw new BadRequestException('Nenhuma autoridade fornecida')

    for (const authority of data) {
      const { occurrenceId, name } = authority

      const occurrence = await this.occurrenceRepository.getById(occurrenceId)
      if (!occurrence)
        throw new NotFoundException(`Ocorrência ${occurrenceId} não encontrada`)

      const authorityExists = await this.authorityRepository.getByParams({
        name,
        occurrenceId,
      })

      if (authorityExists) {
        throw new BadRequestException(
          `A autoridade ${name} já foi registrada na ocorrência ${occurrenceId}`,
        )
      }
    }

    return await this.authorityRepository.create(data)
  }
}
