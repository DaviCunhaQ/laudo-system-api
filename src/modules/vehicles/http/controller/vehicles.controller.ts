import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common'
import { CommandBus, QueryBus } from '@nestjs/cqrs'

import {
  CreateVehicleCommand,
  DeleteVehicleCommand,
  UpdateVehicleCommand,
} from '../../use-cases/commands/command'

import {
  ListVehicleQuery,
  ShowVehicleQuery,
} from '../../use-cases/queries/query'

import { ICreateVehicleDto, IUpdateVehicleDto } from '../dto/vehicle.dto'

@Controller('vehicles')
export class VehiclesController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Get()
  async findAll(@Query('occurrenceId') occurrenceId: string) {
    return await this.queryBus.execute(new ListVehicleQuery(occurrenceId))
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.queryBus.execute(new ShowVehicleQuery(id))
  }

  @Post()
  async create(@Body() data: ICreateVehicleDto) {
    await this.commandBus.execute(new CreateVehicleCommand(data))

    return {
      message: 'Veículo criado com sucesso',
    }
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() data: IUpdateVehicleDto) {
    await this.commandBus.execute(new UpdateVehicleCommand(id, data))

    return {
      message: 'Veículo atualizado com sucesso',
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    await this.commandBus.execute(new DeleteVehicleCommand(id))

    return {
      message: 'Veículo removido com sucesso',
    }
  }
}
