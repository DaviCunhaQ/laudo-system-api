import { VehicleRepository } from '@/modules/vehicles/infra/vehicle.repository'
import { NotFoundException } from '@nestjs/common'
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs'
import { UpdateVehicleCommand } from '../command'

@CommandHandler(UpdateVehicleCommand)
export class UpdateVehicleHandler
  implements ICommandHandler<UpdateVehicleCommand>
{
  constructor(private vehicleRepository: VehicleRepository) {}

  async execute(command: UpdateVehicleCommand) {
    const { id, data } = command

    const vehicle = await this.vehicleRepository.getById(id)

    if (!vehicle) throw new NotFoundException('Veículo não encontrado')

    return await this.vehicleRepository.update(id, data)
  }
}
