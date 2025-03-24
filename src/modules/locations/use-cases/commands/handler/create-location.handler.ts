import { LocationRepository } from '@/modules/locations/infra/location.repository'
import { BadRequestException } from '@nestjs/common'
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs'
import { CreateLocationCommand } from '../command/create-location.command'

@CommandHandler(CreateLocationCommand)
export class CreateLocationHandler
  implements ICommandHandler<CreateLocationCommand>
{
  constructor(private locationRepository: LocationRepository) {}

  async execute(command: CreateLocationCommand) {
    const { data } = command

    const { occurrenceId } = data

    const location = await this.locationRepository.getByParams({
      occurrenceId,
    })

    if (location)
      throw new BadRequestException(
        'Ocorrência ja possui localização registrada',
      )

    await this.locationRepository.create(command.data)
  }
}
