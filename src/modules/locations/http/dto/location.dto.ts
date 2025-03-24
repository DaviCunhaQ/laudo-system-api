import { createZodDto } from 'nestjs-zod'
import { z } from 'zod'

export const LocationSchema = z.object({
  occurrenceId: z
    .string()
    .cuid({ message: 'O ID da ocorrência deve ser um CUID válido.' }),
  street: z.string().min(1, { message: 'O nome da rua é obrigatório.' }),
  number: z.string().nullable(),
  neighborhood: z.string().nullable(),
  city: z.string().min(1, { message: 'O nome da cidade é obrigatório.' }),
  state: z.string().min(1, { message: 'O estado é obrigatório.' }),
  geolocation: z
    .string()
    .min(1, { message: 'A geolocalização é obrigatória.' }),
  reference: z.string().nullable(),
})

export class ICreateLocationDto extends createZodDto(LocationSchema) {}

export class IUpdateLocationDto extends createZodDto(
  LocationSchema.partial().omit({ occurrenceId: true }),
) {}
