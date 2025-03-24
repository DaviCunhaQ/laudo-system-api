import { PrismaModule } from '@/common/database/prisma/prisma.module'
import { Module } from '@nestjs/common'
import { OccurrenceModule } from '../occurrences/occurrence.module'
import { LocationController } from './http/controller/location.controller'
import { LocationRepository } from './infra/location.repository'
import {
  CreateLocationHandler,
  DeleteLocationHandler,
  UpdateLocationHandler,
} from './use-cases/commands/handler'

import { ShowLocationHandler } from './use-cases/queries/handler'

@Module({
  imports: [PrismaModule, OccurrenceModule],
  controllers: [LocationController],
  providers: [
    LocationRepository,
    CreateLocationHandler,
    ShowLocationHandler,
    UpdateLocationHandler,
    DeleteLocationHandler,
  ],
})
export class LocationModule {}
