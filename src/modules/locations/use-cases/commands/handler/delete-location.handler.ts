import { LocationRepository } from '@/modules/locations/infra/location.repository'
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs'
import { DeleteLocationCommand } from '../command/delete-location.command'

@CommandHandler(DeleteLocationCommand)
export class DeleteLocationHandler
  implements ICommandHandler<DeleteLocationCommand>
{
  constructor(private locationRepository: LocationRepository) {}

  async execute(command: DeleteLocationCommand) {
    const { id } = command

    const location = await this.locationRepository.getById(id)

    if (!location) throw new Error('Localização não encontrada')

    await this.locationRepository.delete(id)
  }
}
