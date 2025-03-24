import { ParticipantRepository } from '@/modules/participants/infra/participant.repository'
import { NotFoundException } from '@nestjs/common'
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs'
import { UpdateParticipantCommand } from '../command'

@CommandHandler(UpdateParticipantCommand)
export class UpdateParticipantHandler
  implements ICommandHandler<UpdateParticipantCommand>
{
  constructor(private participantService: ParticipantRepository) {}

  async execute(command: UpdateParticipantCommand) {
    const { id, data } = command

    const participant = await this.participantService.getById(id)

    if (!participant) throw new NotFoundException('Participante nao encontrado')

    return await this.participantService.update(id, data)
  }
}
