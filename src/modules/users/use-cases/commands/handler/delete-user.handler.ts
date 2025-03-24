import { UserRepository } from '@/modules/users/infra/user.repository'
import { NotFoundException } from '@nestjs/common'
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs'
import { DeleteUserCommand } from '../command'

@CommandHandler(DeleteUserCommand)
export class DeleteUserHandler implements ICommandHandler<DeleteUserCommand> {
  constructor(private userRepository: UserRepository) {}

  async execute(command: DeleteUserCommand): Promise<void> {
    const { id } = command

    const user = await this.userRepository.getById(id)

    if (!user) {
      throw new NotFoundException('Usuário nao encontrado')
    }

    await this.userRepository.delete(id)
  }
}
