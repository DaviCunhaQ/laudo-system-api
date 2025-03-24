import { OccurrenceRepository } from '@/modules/occurrences/infra/occurrence.repository'
import { ConflictException } from '@nestjs/common'
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs'
import { CreateOccurrenceCommand } from '../command'

@CommandHandler(CreateOccurrenceCommand)
export class CreateOccurrenceHandler
  implements ICommandHandler<CreateOccurrenceCommand>
{
  constructor(private occurrenceRepository: OccurrenceRepository) {}

  async execute(command: CreateOccurrenceCommand) {
    const { id } = command.data

    const occurrence = await this.occurrenceRepository.getById(id)

    if (occurrence) {
      throw new ConflictException('Ocorrência já existente')
    }

    const payload = command.data

    return await this.occurrenceRepository.create(payload)
  }
}
