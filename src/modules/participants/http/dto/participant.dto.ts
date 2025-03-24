import { createZodDto } from 'nestjs-zod'
import { z } from 'zod'

export const IncidentParticipantSchema = z.object({
  occurrenceId: z
    .string()
    .cuid({ message: 'O ID da ocorrência deve ser um CUID válido.' }),
  name: z.string().min(1, { message: 'O nome é obrigatório.' }).nullable(),
  contact: z.string().nullable(),
  description: z.string().nullable(),
  participation: z
    .enum(['PASSAGEIRO', 'PEDESTRE', 'TESTEMUNHA'], {
      errorMap: () => ({
        message:
          'A participação deve ser um dos seguintes: MOTORISTA, PASSAGEIRO, PEDESTRE, TESTEMUNHA',
      }),
    })
    .nullable(),
  status: z.enum(['FERIDO', 'OBITO', 'SEM_FERIMENTOS']).nullable(),
})

// DTOs para validação
export class ICreateIncidentParticipantDto extends createZodDto(
  z.array(IncidentParticipantSchema),
) {}

export class IUpdateIncidentParticipantDto extends createZodDto(
  IncidentParticipantSchema.partial().omit({ occurrenceId: true }),
) {}
