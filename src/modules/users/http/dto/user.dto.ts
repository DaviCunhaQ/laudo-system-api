import { createZodDto } from 'nestjs-zod'
import { z } from 'zod'

export const UserSchema = z.object({
  name: z
    .string({
      required_error: 'O nome é obrigatório.',
    })
    .min(1, 'O nome não pode estar vazio.'),

  email: z
    .string({
      required_error: 'O e-mail é obrigatório.',
    })
    .email('Por favor, insira um e-mail válido.'),

  password: z
    .string({
      required_error: 'A senha é obrigatória.',
    })
    .min(6, 'A senha deve ter no mínimo 6 caracteres.'),

  role: z
    .enum(['ADMIN', 'SUPERADMIN', 'USER'], {
      required_error: 'O papel (role) é obrigatório.',
      invalid_type_error:
        'O papel (role) deve ser "admin", "superadmin" ou "user".',
    })
    .default('USER'),
})

export class ICreateUserDto extends createZodDto(UserSchema) {}

export class IUpdateUserDto extends createZodDto(UserSchema.partial()) {}
