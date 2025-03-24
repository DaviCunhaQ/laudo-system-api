import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  BadRequestException,
} from '@nestjs/common'
import { Observable } from 'rxjs'
import { Request } from 'express'

@Injectable()
export class ImageValidationInterceptor implements NestInterceptor {
  private readonly MAX_FILE_SIZE = 10 * 1024 * 1024 // 10MB

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request: Request = context.switchToHttp().getRequest()
    const files = request.files

    if (Array.isArray(files) && files.length > 0) {
      files.forEach((file: Express.Multer.File) => {
        if (!file.mimetype.startsWith('image/')) {
          throw new BadRequestException('O arquivo enviado não é uma imagem')
        }

        // Verifique o tamanho do arquivo
        if (file.size > this.MAX_FILE_SIZE) {
          throw new BadRequestException(
            'O tamanho do arquivo não pode ser maior que 10MB',
          )
        }
      })
    } else {
      throw new BadRequestException(
        'Nenhum arquivo enviado ou o formato está incorreto',
      )
    }

    return next.handle()
  }
}
