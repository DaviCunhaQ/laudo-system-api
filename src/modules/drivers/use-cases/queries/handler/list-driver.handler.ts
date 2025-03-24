import { DriverRepository } from '@/modules/drivers/infra/driver.repository'
import { OccurrenceRepository } from '@/modules/occurrences/infra/occurrence.repository'
import { NotFoundException } from '@nestjs/common'
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs'
import { ListDriverQuery } from '../query'

@QueryHandler(ListDriverQuery)
export class ListDriverHandler implements IQueryHandler<ListDriverQuery> {
  constructor(
    private driverRepository: DriverRepository,
    private occurrenceRepository: OccurrenceRepository,
  ) {}

  async execute(query: ListDriverQuery) {
    const { occurrenceId } = query

    if (!occurrenceId) throw new NotFoundException('Ocorrência não fornecida')

    const occurrenceExists =
      await this.occurrenceRepository.getById(occurrenceId)

    if (!occurrenceExists) {
      throw new NotFoundException('Ocorrência não encontrada')
    }

    const drivers = await this.driverRepository.getAll(occurrenceId)

    return drivers
  }
}
