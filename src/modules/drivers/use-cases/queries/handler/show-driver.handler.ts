import { DriverRepository } from '@/modules/drivers/infra/driver.repository'
import { NotFoundException } from '@nestjs/common'
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs'
import { ShowDriverQuery } from '../query'

@QueryHandler(ShowDriverQuery)
export class ShowDriverHandler implements IQueryHandler<ShowDriverQuery> {
  constructor(private readonly driverRepository: DriverRepository) {}

  async execute(query: ShowDriverQuery) {
    const { id } = query

    const driver = await this.driverRepository.getById(id)

    if (!driver) throw new NotFoundException('Motorista não encontrado')

    return driver
  }
}
