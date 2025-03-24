import { z } from 'zod'
import { createZodDto } from 'nestjs-zod'

export const AuthSchema = z.object({
  email: z.string().email('Por favor, insira um e-mail válido.'),
  password: z.string().min(6, 'A senha deve ter no mínimo 6 caracteres.'),
})

export const ForgotPasswordSchema = z.object({
  email: z
    .string({ required_error: 'O e-mail é obrigatório.' })
    .email({ message: 'Por favor, insira um e-mail válido.' }),
})

export const ResetPasswordSchema = z.object({
  token: z.string({ required_error: 'O token é obrigatório.' }),
  password: z
    .string({ required_error: 'A senha é obrigatória.' })
    .min(6, 'A senha deve ter no mínimo 6 caracteres.'),
})

export class IAuthDTO extends createZodDto(AuthSchema) {}

export class IForgotPasswordDTO extends createZodDto(ForgotPasswordSchema) {}

export class IResetPasswordDTO extends createZodDto(ResetPasswordSchema) {}
