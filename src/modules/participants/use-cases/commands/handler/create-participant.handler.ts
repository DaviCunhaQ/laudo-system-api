import { OccurrenceRepository } from '@/modules/occurrences/infra/occurrence.repository'
import { ParticipantRepository } from '@/modules/participants/infra/participant.repository'
import { BadRequestException, NotFoundException } from '@nestjs/common'
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs'
import { CreateParticipantCommand } from '../command'

@CommandHandler(CreateParticipantCommand)
export class CreateParticipantHandler
  implements ICommandHandler<CreateParticipantCommand>
{
  constructor(
    private readonly participantRepository: ParticipantRepository,
    private readonly occurrenceRepository: OccurrenceRepository,
  ) {}

  async execute(command: CreateParticipantCommand) {
    const { data } = command

    if (!data) {
      throw new BadRequestException('Nenhum participante fornecido')
    }

    for (const participant of data) {
      const { occurrenceId, name } = participant

      const occurrence = await this.occurrenceRepository.getById(occurrenceId)
      if (!occurrence) {
        throw new NotFoundException(`Ocorrência ${occurrenceId} não encontrada`)
      }

      const participantExists = await this.participantRepository.getByParams({
        name,
        occurrenceId,
      })
      if (participantExists) {
        throw new BadRequestException(
          `O participante ${name} já foi registrado na ocorrência ${occurrenceId}`,
        )
      }
    }

    return await this.participantRepository.create(data)
  }
}
