import { LocationRepository } from '@/modules/locations/infra/location.repository'
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs'
import { UpdateLocationCommand } from '../command/update-location.command'

@CommandHandler(UpdateLocationCommand)
export class UpdateLocationHandler
  implements ICommandHandler<UpdateLocationCommand>
{
  constructor(private locationRepository: LocationRepository) {}

  async execute(command: UpdateLocationCommand) {
    const { id } = command

    const location = await this.locationRepository.getById(id)

    if (!location) throw new Error('Localização não encontrada')

    return await this.locationRepository.update(id, command.data)
  }
}
