import { OccurrenceRepository } from '@/modules/occurrences/infra/occurrence.repository'
import { NotFoundException } from '@nestjs/common'
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs'
import { UpdateOccurrenceCommand } from '../command'

@CommandHandler(UpdateOccurrenceCommand)
export class UpdateOccurrenceHandler
  implements ICommandHandler<UpdateOccurrenceCommand>
{
  constructor(private occurrenceRepository: OccurrenceRepository) {}

  async execute(command: UpdateOccurrenceCommand) {
    const { id } = command.data

    const occurrence = await this.occurrenceRepository.getById(id)

    if (!occurrence) throw new NotFoundException('Ocorrência não encontrada')

    const payload = command.data

    return await this.occurrenceRepository.update(id, payload)
  }
}
