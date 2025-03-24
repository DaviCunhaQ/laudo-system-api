import { UserRepository } from '@/modules/users/infra/user.repository'
import { ConflictException } from '@nestjs/common'
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs'
import * as bcrypt from 'bcrypt'
import { CreateUserCommand } from '../command'

@CommandHandler(CreateUserCommand)
export class CreateUserHandler implements ICommandHandler<CreateUserCommand> {
  constructor(private userRepository: UserRepository) {}

  async execute(command: CreateUserCommand): Promise<void> {
    const { email, name, password, role } = command.data

    const user = await this.userRepository.getByParams({ email })

    if (user) {
      throw new ConflictException('Usuário já cadastrado')
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    await this.userRepository.create({
      email,
      name,
      password: hashedPassword,
      role,
    })
  }
}
