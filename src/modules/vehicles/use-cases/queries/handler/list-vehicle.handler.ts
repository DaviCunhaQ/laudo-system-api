import { OccurrenceRepository } from '@/modules/occurrences/infra/occurrence.repository'
import { VehicleRepository } from '@/modules/vehicles/infra/vehicle.repository'
import { NotFoundException } from '@nestjs/common'
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs'
import { ListVehicleQuery } from '../query'

@QueryHandler(ListVehicleQuery)
export class ListVehicleHandler implements IQueryHandler<ListVehicleQuery> {
  constructor(
    private vehicleRepository: VehicleRepository,
    private occurrenceRepository: OccurrenceRepository,
  ) {}

  async execute(query: ListVehicleQuery) {
    const { occurrenceId } = query

    if (!occurrenceId) throw new NotFoundException('Ocorrência não fornecida')

    const occurrenceExists =
      await this.occurrenceRepository.getById(occurrenceId)

    if (!occurrenceExists) {
      throw new NotFoundException('Ocorrência não encontrada')
    }

    const vehicle = await this.vehicleRepository.getAll(occurrenceId)

    return vehicle
  }
}
