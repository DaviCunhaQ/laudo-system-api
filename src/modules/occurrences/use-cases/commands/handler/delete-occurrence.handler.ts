import { OccurrenceRepository } from '@/modules/occurrences/infra/occurrence.repository'
import { NotFoundException } from '@nestjs/common'
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs'
import { DeleteOccurrenceCommand } from '../command'

@CommandHandler(DeleteOccurrenceCommand)
export class DeleteOccurrenceHandler
  implements ICommandHandler<DeleteOccurrenceCommand>
{
  constructor(private occurrenceRepository: OccurrenceRepository) {}

  async execute(command: DeleteOccurrenceCommand): Promise<any> {
    const { id } = command.data

    const occurrence = await this.occurrenceRepository.getById(id)

    if (!occurrence) throw new NotFoundException('Ocorrência não encontrada')

    return await this.occurrenceRepository.delete(id)
  }
}
