import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common'
import { CommandBus, QueryBus } from '@nestjs/cqrs'

import {
  CreateLocationCommand,
  DeleteLocationCommand,
  UpdateLocationCommand,
} from '../../use-cases/commands/command'

import { ShowLocationQuery } from '../../use-cases/queries/query'
import { ICreateLocationDto, IUpdateLocationDto } from '../dto/location.dto'

@Controller('locations')
export class LocationController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Post()
  async create(@Body() data: ICreateLocationDto) {
    await this.commandBus.execute(new CreateLocationCommand(data))
    return { message: 'Localização criada com sucesso' }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.queryBus.execute(new ShowLocationQuery(id))
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() data: IUpdateLocationDto) {
    await this.commandBus.execute(new UpdateLocationCommand(id, data))
    return { message: 'Localização atualizada com sucesso' }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    await this.commandBus.execute(new DeleteLocationCommand(id))
    return { message: 'Localização removida com sucesso' }
  }
}
