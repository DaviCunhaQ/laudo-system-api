import { CommandHandler, ICommandHandler } from '@nestjs/cqrs'
import { ForgotUserPasswordCommand } from '../command/forgot-password.command'
import { UserRepository } from '@/modules/users/infra/user.repository'
import { NotFoundException } from '@nestjs/common'
import { AuthService } from '@/modules/auth/infra/auth.service'

@CommandHandler(ForgotUserPasswordCommand)
export class ForgotUserPasswordHandler
  implements ICommandHandler<ForgotUserPasswordCommand>
{
  constructor(
    private readonly userRepository: UserRepository,
    private readonly authService: AuthService,
  ) {}

  async execute(command: ForgotUserPasswordCommand): Promise<void> {
    const { email } = command.data

    const user = await this.userRepository.getByParams({ email })

    if (!user) {
      throw new NotFoundException(`Email não encontrado`)
    }

    const resetToken = this.authService.generateResetToken(email)

    await this.authService.sendResetPasswordEmail(email, resetToken)
  }
}
