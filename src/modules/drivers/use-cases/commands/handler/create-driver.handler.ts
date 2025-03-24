import { DriverRepository } from '@/modules/drivers/infra/driver.repository'
import { OccurrenceRepository } from '@/modules/occurrences/infra/occurrence.repository'
import { VehicleRepository } from '@/modules/vehicles/infra/vehicle.repository'
import { BadRequestException, NotFoundException } from '@nestjs/common'
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs'
import { CreateDriverCommand } from '../command'

@CommandHandler(CreateDriverCommand)
export class CreateDriverHandler
  implements ICommandHandler<CreateDriverCommand>
{
  constructor(
    private readonly driverRepository: DriverRepository,
    private readonly occurrenceRepository: OccurrenceRepository,
    private readonly vehicleRepository: VehicleRepository,
  ) {}

  async execute(command: CreateDriverCommand) {
    const { data } = command

    if (!data.length) {
      throw new BadRequestException('Nenhum motorista fornecido')
    }

    for (const driver of data) {
      await this.validateDriver(driver)
    }

    return await this.driverRepository.create(data)
  }

  private async validateDriver(driver: any) {
    const { occurrenceId, vehicleId, name } = driver

    await this.validateOccurrence(occurrenceId)
    await this.validateVehicle(vehicleId)
    await this.checkDriverExistence(name, occurrenceId)
    await this.checkVehicleAssigned(vehicleId, occurrenceId, name)
  }

  private async validateOccurrence(occurrenceId: string) {
    const occurrence = await this.occurrenceRepository.getById(occurrenceId)
    if (!occurrence) {
      throw new NotFoundException(`Ocorrência ${occurrenceId} não encontrada`)
    }
  }

  private async validateVehicle(vehicleId: string) {
    const vehicleExists = await this.vehicleRepository.getById(vehicleId)
    if (!vehicleExists) {
      throw new NotFoundException(`Veículo ${vehicleId} não encontrado`)
    }
  }

  private async checkDriverExistence(name: string, occurrenceId: string) {
    const driverExistsInOccurrence = await this.driverRepository.getByParams({
      name,
      occurrenceId,
    })
    if (driverExistsInOccurrence) {
      throw new BadRequestException(
        `O motorista ${name} já foi registrado na ocorrência ${occurrenceId}`,
      )
    }
  }

  private async checkVehicleAssigned(
    vehicleId: string,
    occurrenceId: string,
    name: string,
  ) {
    const vehicleAssignedToAnotherDriver =
      await this.driverRepository.getByParams({
        vehicleId,
        occurrenceId,
      })
    if (
      vehicleAssignedToAnotherDriver &&
      vehicleAssignedToAnotherDriver.name !== name
    ) {
      throw new BadRequestException(
        `O veículo já está atribuído a outro motorista na ocorrência ${occurrenceId}`,
      )
    }
  }
}
