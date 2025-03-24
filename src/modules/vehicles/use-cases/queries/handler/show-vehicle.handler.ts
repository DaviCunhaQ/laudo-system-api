import { VehicleRepository } from '@/modules/vehicles/infra/vehicle.repository'
import { NotFoundException } from '@nestjs/common'
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs'
import { ShowVehicleQuery } from '../query'

@QueryHandler(ShowVehicleQuery)
export class ShowVehicleHandler implements IQueryHandler<ShowVehicleQuery> {
  constructor(private vehicleRepository: VehicleRepository) {}

  async execute(query: ShowVehicleQuery) {
    const { id } = query

    const vehicle = await this.vehicleRepository.getById(id)

    if (!vehicle) throw new NotFoundException('Veículo não encontrado')

    return vehicle
  }
}
