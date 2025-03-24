import { PrismaModule } from '@/common/database/prisma/prisma.module'
import { Module } from '@nestjs/common'
import { OccurrencesController } from './http/controller/occurrence.controller'

import { OccurrenceRepository } from './infra/occurrence.repository'

import {
  CreateOccurrenceHandler,
  DeleteOccurrenceHandler,
  ListOccurrenceHandler,
  ShowOccurrenceHandler,
  UpdateOccurrenceHandler,
} from './use-cases'

@Module({
  imports: [PrismaModule],
  controllers: [OccurrencesController],
  providers: [
    OccurrenceRepository,
    ListOccurrenceHandler,
    ShowOccurrenceHandler,
    CreateOccurrenceHandler,
    UpdateOccurrenceHandler,
    DeleteOccurrenceHandler,
  ],
  exports: [OccurrenceRepository],
})
export class OccurrenceModule {}
