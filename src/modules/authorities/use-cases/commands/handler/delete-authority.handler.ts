import { AuthorityRepository } from '@/modules/authorities/infra/authority.repository'
import { NotFoundException } from '@nestjs/common'
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs'
import { DeleteAuthorityCommand } from '../command/delete-authority.command'

@CommandHandler(DeleteAuthorityCommand)
export class DeleteAuthorityHandler
  implements ICommandHandler<DeleteAuthorityCommand>
{
  constructor(private authorityRepository: AuthorityRepository) {}

  async execute(command: DeleteAuthorityCommand) {
    const { id } = command

    const authority = await this.authorityRepository.getById(id)

    if (!authority) throw new NotFoundException('Autoridade nao encontrada')

    return await this.authorityRepository.delete(id)
  }
}
