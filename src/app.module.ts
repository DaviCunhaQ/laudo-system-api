import { MailerModule } from '@nestjs-modules/mailer'
import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config' // Adicione ConfigService
import { CqrsModule } from '@nestjs/cqrs'
import { ZodValidationPipe } from 'nestjs-zod'
import { AppController } from './app.controller'
import { AppService } from './app.service'

import { envSchema } from './common/constants/envSchema'

import {
  AuthModule,
  AuthoritiesModule,
  DraftsModule,
  DriversModule,
  FilesModule,
  LocationModule,
  OccurrenceModule,
  ParticipantsModule,
  UsersModule,
  VehicleModule,
} from './modules'

@Module({
  imports: [
    UsersModule,
    AuthModule,
    OccurrenceModule,
    LocationModule,
    ConfigModule.forRoot({
      envFilePath: '.env',
      validate: (config) => {
        const parsedConfig = envSchema.safeParse(config)
        if (!parsedConfig.success) {
          throw new Error('Vá')
        }
        return parsedConfig.data
      },
    }),
    CqrsModule.forRoot(),
    MailerModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        transport: {
          host: configService.get<string>('MAIL_HOST'),
          port: Number(configService.get<string>('MAIL_PORT')),
          secure: true,
          auth: {
            user: configService.get<string>('MAIL_USER'),
            pass: configService.get<string>('MAIL_PASSWORD'),
          },
        },
        defaults: {
          from: `<${configService.get<string>('MAIL_USER')}>`,
        },
      }),
      inject: [ConfigService],
    }),
    DriversModule,
    VehicleModule,
    ParticipantsModule,
    AuthoritiesModule,
    FilesModule,
    DraftsModule,
  ],
  controllers: [AppController],
  providers: [AppService, { provide: 'APP_PIPE', useClass: ZodValidationPipe }],
})
export class AppModule {}
