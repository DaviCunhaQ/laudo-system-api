import { MailerService } from '@nestjs-modules/mailer'
import { BadRequestException, Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { JwtService } from '@nestjs/jwt'

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly mailerService: MailerService,
    private readonly configService: ConfigService,
  ) {}

  public generateResetToken(email: string): string {
    const payload = { email }
    return this.jwtService.sign(payload, {
      secret: this.configService.get<string>('SECRET_KEY'),
      expiresIn: '1h',
    })
  }

  public async sendResetPasswordEmail(
    email: string,
    token: string,
  ): Promise<void> {
    const url = `${this.configService.get<string>('FRONTEND_RESET_PASSWORD_URL')}?token=${token}`
    const text = `Olá, \nPara resetar sua senha, clique neste link: ${url}`

    await this.mailerService.sendMail({
      to: email,
      subject: 'Resetar sua senha',
      text,
    })
  }

  public async decodeConfirmationToken(token: string) {
    try {
      const payload = await this.jwtService.verify(token, {
        secret: this.configService.get<string>('SECRET_KEY'),
      })
      if (typeof payload === 'object' && 'email' in payload) {
        return payload.email
      }
      throw new BadRequestException()
    } catch (error) {
      if (error?.name === 'TokenExpiredError') {
        throw new BadRequestException('Token expirado')
      }
      throw new BadRequestException('Token inválido')
    }
  }
}
