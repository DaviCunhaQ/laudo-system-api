import { ConfigService } from '@nestjs/config' // Importa o ConfigService
import { NestFactory } from '@nestjs/core'
import {
  DocumentBuilder,
  SwaggerCustomOptions,
  SwaggerModule,
} from '@nestjs/swagger'
import { patchNestJsSwagger } from 'nestjs-zod'
import { SwaggerTheme, SwaggerThemeNameEnum } from 'swagger-themes'
import { AppModule } from './app.module'
import { ZodValidationExceptionFilter } from './common/filters/zod-validation.filter'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  const configService = app.get(ConfigService)
  patchNestJsSwagger()

  const swaggerConfig = new DocumentBuilder()
    .setTitle('Api sistema de laudos')
    .setDescription(
      'API para facilitar a criação dos laudos',
    )
    .setVersion('1.0')
    .build()

  const document = SwaggerModule.createDocument(app, swaggerConfig)

  const theme = new SwaggerTheme()
  const options: SwaggerCustomOptions = {
    explorer: true,
    customCss: theme.getBuffer(SwaggerThemeNameEnum.DARK_MONOKAI),
  }

  if (configService.get<string>('NODE_ENV') === 'development') {
    SwaggerModule.setup('docs', app, document, options)
  }

  app.enableCors()
  app.useGlobalFilters(new ZodValidationExceptionFilter())

  // Substitui process.env.PORT pelo ConfigService
  const port = configService.get<string>('PORT') ?? '3000'
  await app.listen(port)
}

bootstrap()
