import { UserRepository } from '@/modules/users/infra/user.repository'
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs'
import * as bcrypt from 'bcrypt'
import { NotFoundException } from '@nestjs/common'
import { AuthService } from '@/modules/auth/infra/auth.service'
import { ResetUserPasswordCommand } from '../command/reset-password.command'

@CommandHandler(ResetUserPasswordCommand)
export class ResetUserPasswordHandler
  implements ICommandHandler<ResetUserPasswordCommand>
{
  constructor(
    private readonly userRepository: UserRepository,
    private readonly authService: AuthService,
  ) {}

  async execute(command: ResetUserPasswordCommand): Promise<void> {
    const { token, password } = command.data

    const email = await this.authService.decodeConfirmationToken(token)

    const user = await this.userRepository.getByParams({ email })

    if (!user) {
      throw new NotFoundException('Email não encontrado')
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    await this.userRepository.updatePasswordAndResetToken(user.id, {
      password: hashedPassword,
      resetToken: null,
    })
  }
}
