import { AuthorityRepository } from '@/modules/authorities/infra/authority.repository'
import { NotFoundException } from '@nestjs/common'
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs'
import { DeleteAuthorityCommand } from '../command/delete-authority.command'
import { UpdateAuthorityCommand } from '../command/update-authority.command'

@CommandHandler(UpdateAuthorityCommand)
export class UpdateAuthorityHandler
  implements ICommandHandler<UpdateAuthorityCommand>
{
  constructor(private authorityRepository: AuthorityRepository) {}

  async execute(command: UpdateAuthorityCommand) {
    const { id, data } = command

    const authority = await this.authorityRepository.getById(id)

    if (!authority) throw new NotFoundException('Autoridade nao encontrada')

    return await this.authorityRepository.update(id, data)
  }
}
