import { createZodDto } from 'nestjs-zod'
import { z } from 'zod'

export const AuthoritySchema = z.object({
  occurrenceId: z
    .string()
    .cuid({ message: 'O ID da ocorrência deve ser um CUID válido.' }),
  name: z
    .string()
    .min(1, { message: 'O nome da autoridade é obrigatório.' })
    .nullable(),
  serviceTime: z
    .string()
    .min(1, { message: 'O tempo de serviço é obrigatório.' })
    .nullable(),
  providences: z
    .string()
    .min(1, { message: 'As providências são obrigatórias.' })
    .nullable(),
})

export class ICreateAuthorityDto extends createZodDto(
  z.array(AuthoritySchema),
) {}

export class IUpdateAuthorityDto extends createZodDto(
  AuthoritySchema.partial(),
) {}
