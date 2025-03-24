import { PrismaModule } from '@/common/database/prisma/prisma.module'
import { Module } from '@nestjs/common'
import { OccurrenceModule } from '../occurrences/occurrence.module'
import { VehiclesController } from './http/controller/vehicles.controller'
import { VehicleRepository } from './infra/vehicle.repository'

import {
  ListVehicleHandler,
  ShowVehicleHandler,
} from './use-cases/queries/handler'

import {
  CreateVehicleHandler,
  DeleteVehicleHandler,
  UpdateVehicleHandler,
} from './use-cases/commands/handler'

@Module({
  imports: [PrismaModule, OccurrenceModule],
  controllers: [VehiclesController],
  providers: [
    VehicleRepository,
    ListVehicleHandler,
    ShowVehicleHandler,
    CreateVehicleHandler,
    DeleteVehicleHandler,
    UpdateVehicleHandler,
  ],
  exports: [VehicleRepository],
})
export class VehicleModule {}
