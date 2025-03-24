import { UserRepository } from '@/modules/users/infra/user.repository'
import { NotFoundException } from '@nestjs/common'
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs'
import * as bcrypt from 'bcrypt'
import { UpdateUserCommand } from '../command'

@CommandHandler(UpdateUserCommand)
export class UpdateUserHandler implements ICommandHandler<UpdateUserCommand> {
  constructor(private userRepository: UserRepository) {}

  async execute(command: UpdateUserCommand): Promise<void> {
    const { id, data } = command

    const { email, name, password, role } = data

    const user = await this.userRepository.getById(id)

    if (!user) {
      throw new NotFoundException('Usuário não encontrado')
    }

    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10)
      await this.userRepository.update(id, {
        email,
        name,
        password: hashedPassword,
        role,
      })
    }

    await this.userRepository.update(id, { email, name, role })
  }
}
