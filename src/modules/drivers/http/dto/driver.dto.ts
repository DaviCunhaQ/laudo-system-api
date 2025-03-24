import { createZodDto } from 'nestjs-zod'
import { z } from 'zod'

export const DriverSchema = z.object({
  occurrenceId: z
    .string()
    .cuid({ message: 'O ID da ocorrência deve ser um CUID válido.' }),
  vehicleId: z.string().cuid({
    message: 'O ID do veículo deve ser um CUID válido.',
  }),
  name: z
    .string()
    .min(1, { message: 'O nome do motorista é obrigatório.' })

    .nullable(),
  contact: z.string().nullable(),
  isLicensed: z
    .boolean({
      message: 'A informação sobre a licença é obrigatória.',
    })

    .nullable(),
})

export class ICreateDriverDto extends createZodDto(z.array(DriverSchema)) {}

export class IUpdateDriverDto extends createZodDto(
  DriverSchema.partial().omit({ vehicleId: true, occurrenceId: true }),
) {}
