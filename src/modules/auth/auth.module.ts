import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { JwtModule } from '@nestjs/jwt'
import { UsersModule } from '../users/users.module'
import { AuthController } from './http/controller/auth.controller'
import { AuthGuard } from './infra/auth.guard'

import { AuthService } from './infra/auth.service'
import {
  ForgotUserPasswordHandler,
  LoginUserHandler,
  ResetUserPasswordHandler,
} from './use-cases/commands/handlers'

@Module({
  imports: [
    UsersModule,
    ConfigModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        global: true,
        secret: configService.get<string>('SECRET_KEY'),
        signOptions: { expiresIn: '1d' },
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [AuthController],
  providers: [
    LoginUserHandler,
    ResetUserPasswordHandler,
    ForgotUserPasswordHandler,
    AuthService,
    { provide: 'APP_GUARD', useClass: AuthGuard },
  ],
})
export class AuthModule {}
