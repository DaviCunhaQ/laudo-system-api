import { LocationRepository } from '@/modules/locations/infra/location.repository'
import { OccurrenceRepository } from '@/modules/occurrences/infra/occurrence.repository'
import { NotFoundException } from '@nestjs/common'
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs'
import { ShowLocationQuery } from '../query'

@QueryHandler(ShowLocationQuery)
export class ShowLocationHandler implements IQueryHandler<ShowLocationQuery> {
  constructor(private locationRepository: LocationRepository) {}

  async execute(query: ShowLocationQuery) {
    const { id } = query

    if (!id) throw new NotFoundException('Localização não fornecida')

    const location = await this.locationRepository.getById(id)

    if (!location) throw new NotFoundException('Localização não encontrada')

    return location
  }
}
