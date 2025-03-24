import { ICreateAuthorityDto } from '@/modules/authorities/http/dto/authorities.dto'
import { ICreateDriverDto } from '@/modules/drivers/http/dto/driver.dto'
import { ICreateLocationDto } from '@/modules/locations/http/dto/location.dto'
import { ICreateOccurrenceDto } from '@/modules/occurrences/http/dto/occurrence.dto'
import { ICreateIncidentParticipantDto } from '@/modules/participants/http/dto/participant.dto'
import { ICreateVehicleDto } from '@/modules/vehicles/http/dto/vehicle.dto'

export class CreateDraftCommand {
  constructor(
    public readonly data: {
      formData: {
        form1: ICreateOccurrenceDto | null
        form2: ICreateLocationDto | null
        form3: {
          drivers: ICreateDriverDto | null
          vehicles: ICreateVehicleDto | null
        } | null
        form4: ICreateIncidentParticipantDto | null
        form5: ICreateAuthorityDto | null
      }
    },
    public readonly id: string | null,
  ) {}
}
