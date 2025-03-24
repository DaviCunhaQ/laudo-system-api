import { VehicleRepository } from '@/modules/vehicles/infra/vehicle.repository'
import { NotFoundException } from '@nestjs/common'
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs'
import { DeleteVehicleCommand } from '../command'

@CommandHandler(DeleteVehicleCommand)
export class DeleteVehicleHandler
  implements ICommandHandler<DeleteVehicleCommand>
{
  constructor(private vehicleRepository: VehicleRepository) {}

  async execute(command: DeleteVehicleCommand) {
    const { id } = command

    const vehicle = await this.vehicleRepository.getById(id)

    if (!vehicle) throw new NotFoundException('Veículo não encontrado')

    await this.vehicleRepository.delete(id)
  }
}
