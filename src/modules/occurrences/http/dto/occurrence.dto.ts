import { z } from 'zod'

import { createZodDto } from 'nestjs-zod'

export const OccurrenceSchema = z.object({
  id: z
    .string()
    .cuid({ message: 'O ID da ocorrência deve ser um CUID válido.' }),
  category: z.string(),
  subcategory: z.string().nullable(),
  description: z.string(),
  comments: z.string(),
  details: z.string(),
  accompaniment: z.string(),
  status: z.enum(['ABERTO', 'EM_PROGRESSO', 'ENCERRADO'], {
    errorMap: () => ({
      message: 'O status deve ser ABERTO, EM_PROGRESSO ou ENCERRADO.',
    }),
  }),
  materialDamage: z.string(),
  trafficImpact: z.enum(
    [
      'BLOQUEIO_PARCIAL',
      'BLOQUEIO_TOTAL',
      'BLOQUEIO_PARCIAL',
      'CONGESTIONAMENTO_INTENSO',
      'CONGESTIONAMENTO_LEVE',
      'CONGESTIONAMENTO_MODERADO',
      'DESVIO_NECESSARIO',
      'SEM_IMPACTO',
      'TRANSITO_LENTO',
    ],
    {
      errorMap: () => ({
        message:
          'O impacto na trafegabilidade deve ser um dos seguintes: BLOQUEIO_PARCIAL, BLOQUEIO_TOTAL, BLOQUEIO_PARCIAL, CONGESTIONAMENTO_INTENSO, CONGESTIONAMENTO_LEVE, CONGESTIONAMENTO_MODERADO, DESVIO_NECESSARIO, SEM_IMPACTO, TRANSITO_LENTO.',
      }),
    },
  ),
  registeredAt: z.string().datetime({
    message: 'O campo registeredAt deve ser uma data e hora',
  }),
})

export class ICreateOccurrenceDto extends createZodDto(OccurrenceSchema) {}

export class IUpdateOccurrenceDto extends createZodDto(
  OccurrenceSchema.partial(),
) {}
