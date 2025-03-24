import { OccurrenceRepository } from '@/modules/occurrences/infra/occurrence.repository'
import { VehicleRepository } from '@/modules/vehicles/infra/vehicle.repository'
import { BadRequestException, NotFoundException } from '@nestjs/common'
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs'
import { CreateVehicleCommand } from '../command/create-vehicle.command'

@CommandHandler(CreateVehicleCommand)
export class CreateVehicleHandler
  implements ICommandHandler<CreateVehicleCommand>
{
  constructor(
    private readonly vehicleRepository: VehicleRepository,
    private readonly occurrenceRepository: OccurrenceRepository,
  ) {}

  async execute(command: CreateVehicleCommand) {
    const { data } = command

    if (!data.length) {
      throw new BadRequestException('Nenhum veículo fornecido')
    }

    const { occurrenceId } = data[0]

    const occurrenceExists =
      await this.occurrenceRepository.getById(occurrenceId)
    if (!occurrenceExists) {
      throw new NotFoundException('Ocorrência não encontrada')
    }

    await this.validateVehicles(data, occurrenceId)

    return this.vehicleRepository.create(data)
  }

  private async validateVehicles(data: any[], occurrenceId: string) {
    for (const { plate } of data) {
      if (plate) {
        await this.ensureVehicleNotExists(plate, occurrenceId)
      }
    }
  }

  private async ensureVehicleNotExists(plate: string, occurrenceId: string) {
    const vehicleInOccurrence = await this.vehicleRepository.getByParams({
      plate,
      occurrenceId,
    })
    if (vehicleInOccurrence) {
      throw new BadRequestException(
        `Veículo com placa ${plate} já registrado nesta ocorrência`,
      )
    }

    const vehicleExists = await this.vehicleRepository.getByParams({ plate })
    if (vehicleExists) {
      throw new BadRequestException(
        `Veículo com placa ${plate} já registrado em outra ocorrência`,
      )
    }
  }
}
