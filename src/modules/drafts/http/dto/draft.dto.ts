import { AuthoritySchema } from '@/modules/authorities/http/dto/authorities.dto'
import { DriverSchema } from '@/modules/drivers/http/dto/driver.dto'
import { LocationSchema } from '@/modules/locations/http/dto/location.dto'
import { OccurrenceSchema } from '@/modules/occurrences/http/dto/occurrence.dto'
import { IncidentParticipantSchema } from '@/modules/participants/http/dto/participant.dto'
import { VehicleSchema } from '@/modules/vehicles/http/dto/vehicle.dto'
import { createZodDto } from 'nestjs-zod'
import { z } from 'zod'

export const DraftSchema = z.object({
  formData: z.object({
    form1: OccurrenceSchema.nullable().default(null),
    form2: LocationSchema.nullable().default(null),
    form3: z
      .object({
        drivers: z.array(DriverSchema).nullable().default(null),
        vehicles: z.array(VehicleSchema).nullable().default(null),
      })
      .nullable()
      .default(null),
    form4: z.array(IncidentParticipantSchema).nullable().default(null),
    form5: z.array(AuthoritySchema).nullable().default(null),
  }),
})

export class ICreateDraftDto extends createZodDto(DraftSchema) {}
export class IUpdateDraftDto extends createZodDto(DraftSchema) {}
