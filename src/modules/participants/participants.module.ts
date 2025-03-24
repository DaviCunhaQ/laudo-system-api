import { PrismaModule } from '@/common/database/prisma/prisma.module'
import { Module } from '@nestjs/common'
import { OccurrenceModule } from '../occurrences/occurrence.module'

import { ParticipantsController } from './http/controller/participants.controller'
import { ParticipantRepository } from './infra/participant.repository'

import {
  CreateParticipantHandler,
  DeleteParticipantHandler,
  UpdateParticipantHandler,
} from './use-cases/commands/handler'

import {
  ListParticipantHandler,
  ShowParticipantHandler,
} from './use-cases/queries/handler'

@Module({
  imports: [PrismaModule, OccurrenceModule],
  controllers: [ParticipantsController],
  providers: [
    ParticipantRepository,
    CreateParticipantHandler,
    DeleteParticipantHandler,
    UpdateParticipantHandler,
    ListParticipantHandler,
    ShowParticipantHandler,
  ],
})
export class ParticipantsModule {}
