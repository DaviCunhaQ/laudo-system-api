import { createZodDto } from 'nestjs-zod'
import { z } from 'zod'

export const VehicleSchema = z.object({
  id: z.string().cuid(),
  occurrenceId: z.string().cuid(),
  plate: z.string().nullable(),
  model: z.string().nullable(),
  color: z.string().nullable(),
})

// DTO para um array de veículos
export class ICreateVehicleDto extends createZodDto(z.array(VehicleSchema)) {}

// DTO para atualização de um veículo
export class IUpdateVehicleDto extends createZodDto(
  VehicleSchema.partial().omit({ id: true, occurrenceId: true }),
) {}
