import { CommandHandler, ICommandHandler } from '@nestjs/cqrs'
import * as bcrypt from 'bcrypt'

import { LoginUserCommand } from '../command/login-user.command'
import { UserRepository } from '@/modules/users/infra/user.repository'
import { NotFoundException, UnauthorizedException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'

@CommandHandler(LoginUserCommand)
export class LoginUserHandler implements ICommandHandler<LoginUserCommand> {
  constructor(
    private userRepository: UserRepository,
    private jwtService: JwtService,
  ) {}

  async execute(command: LoginUserCommand): Promise<any> {
    const { email, password } = command.data

    const user = await this.userRepository.getByParams({ email })

    if (!user) {
      throw new NotFoundException('Usuário não encontrado')
    }

    const isPasswordValid = await bcrypt.compare(password, user.password)

    if (!isPasswordValid) {
      throw new UnauthorizedException('Credenciais inválidas')
    }

    return {
      id: user.id,
      access_token: await this.jwtService.signAsync({
        id: user.id,
        name: user.name,
        role: user.role,
      }),
    }
  }
}
