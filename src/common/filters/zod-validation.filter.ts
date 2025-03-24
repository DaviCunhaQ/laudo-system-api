import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpStatus,
} from '@nestjs/common'
import { ZodValidationException } from 'nestjs-zod'
import { ZodError } from 'zod'

@Catch(ZodValidationException)
export class ZodValidationExceptionFilter implements ExceptionFilter {
  catch(exception: ZodValidationException, host: ArgumentsHost) {
    const ctx = host.switchToHttp()
    const response = ctx.getResponse()

    const zodError: ZodError = exception.getZodError()

    const errors = zodError.errors.map((err) => ({
      field: err.path.join('.'),
      message: err.message,
    }))

    return response.status(HttpStatus.BAD_REQUEST).json({
      statusCode: HttpStatus.BAD_REQUEST,
      message: 'Validação inválida',
      errors,
    })
  }
}
