import { DriverRepository } from '@/modules/drivers/infra/driver.repository'
import { NotFoundException } from '@nestjs/common'
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs'
import { UpdateDriverCommand } from '../command'

@CommandHandler(UpdateDriverCommand)
export class UpdateDriverHandler
  implements ICommandHandler<UpdateDriverCommand>
{
  constructor(private readonly driverRepository: DriverRepository) {}

  async execute(command: UpdateDriverCommand) {
    const { id, data } = command

    const driver = await this.driverRepository.getById(id)

    if (!driver) {
      throw new NotFoundException('Motorista não encontrado')
    }

    return await this.driverRepository.update(id, data)
  }
}
