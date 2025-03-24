import { DriverRepository } from '@/modules/drivers/infra/driver.repository'
import { NotFoundException } from '@nestjs/common'
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs'
import { DeleteDriverCommand } from '../command'

@CommandHandler(DeleteDriverCommand)
export class DeleteDriverHandler
  implements ICommandHandler<DeleteDriverCommand>
{
  constructor(private readonly driverRepository: DriverRepository) {}

  async execute(command: DeleteDriverCommand) {
    const { id } = command

    const driver = await this.driverRepository.getById(id)

    if (!driver) {
      throw new NotFoundException('Motorista não encontrado')
    }

    await this.driverRepository.delete(id)
  }
}
