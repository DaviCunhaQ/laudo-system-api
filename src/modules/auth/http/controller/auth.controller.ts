import { Body, Controller, Post } from '@nestjs/common'
import { CommandBus } from '@nestjs/cqrs'

import { Public } from 'src/common/decorators/public.decorator'

import {
  IAuthDTO,
  IForgotPasswordDTO,
  IResetPasswordDTO,
} from '../dto/auth.dto'

import {
  ForgotUserPasswordCommand,
  LoginUserCommand,
  ResetUserPasswordCommand,
} from '../../use-cases/commands/command'

@Controller()
export class AuthController {
  constructor(private readonly commandBus: CommandBus) {}

  @Public()
  @Post('sign-in')
  async signIn(@Body() data: IAuthDTO): Promise<any> {
    return await this.commandBus.execute(new LoginUserCommand(data))
  }

  @Public()
  @Post('forgot-password')
  async forgotPassword(@Body() data: IForgotPasswordDTO) {
    const { email } = data

    await this.commandBus.execute(new ForgotUserPasswordCommand({ email }))

    return {
      message:
        'Verifique seu email e siga as instruções para resetar sua senha',
    }
  }

  @Public()
  @Post('reset-password')
  resetPassword(@Body() data: IResetPasswordDTO) {
    const { token, password } = data

    return this.commandBus.execute(
      new ResetUserPasswordCommand({ token, password }),
    )
  }
}
