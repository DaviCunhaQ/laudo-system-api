import { PrismaModule } from '@/common/database/prisma/prisma.module'
import { OccurrenceModule } from '@modules/occurrences/occurrence.module'
import { VehicleModule } from '@modules/vehicles/vehicles.module'
import { DriversController } from './http/controller/driver.controller'
import { DriverRepository } from './infra/driver.repository'

import {
  CreateDriverHandler,
  DeleteDriverHandler,
  UpdateDriverHandler,
} from './use-cases/commands/handler'

import { Module } from '@nestjs/common'
import {
  ListDriverHandler,
  ShowDriverHandler,
} from './use-cases/queries/handler'

@Module({
  imports: [PrismaModule, OccurrenceModule, VehicleModule],
  controllers: [DriversController],
  providers: [
    DriverRepository,
    CreateDriverHandler,
    UpdateDriverHandler,
    DeleteDriverHandler,
    ListDriverHandler,
    ShowDriverHandler,
  ],
})
export class DriversModule {}
