import { ParticipantRepository } from '@/modules/participants/infra/participant.repository'
import { NotFoundException } from '@nestjs/common'
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs'
import { DeleteParticipantCommand } from '../command'

@CommandHandler(DeleteParticipantCommand)
export class DeleteParticipantHandler
  implements ICommandHandler<DeleteParticipantCommand>
{
  constructor(private participantService: ParticipantRepository) {}

  async execute(command: DeleteParticipantCommand) {
    const { id } = command

    const participant = await this.participantService.getById(id)

    if (!participant) throw new NotFoundException('Participante não encontrado')

    return await this.participantService.delete(id)
  }
}
