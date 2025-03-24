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
  CreateDriverCommand,
  DeleteDriverCommand,
  UpdateDriverCommand,
} from '../../use-cases/commands/command'

import { ListDriverQuery, ShowDriverQuery } from '../../use-cases/queries/query'
import { ICreateDriverDto, IUpdateDriverDto } from '../dto/driver.dto'

@Controller('drivers')
export class DriversController {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus,
  ) {}

  @Get()
  async findAll(@Query('occurrenceId') occurrenceId: string) {
    return await this.queryBus.execute(new ListDriverQuery(occurrenceId))
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.queryBus.execute(new ShowDriverQuery(id))
  }

  @Post()
  async create(@Body() data: ICreateDriverDto) {
    await this.commandBus.execute(new CreateDriverCommand(data))

    return {
      message: 'Motorista criado com sucesso',
    }
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() data: IUpdateDriverDto) {
    await this.commandBus.execute(new UpdateDriverCommand(id, data))

    return {
      message: 'Motorista atualizado com sucesso',
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    await this.commandBus.execute(new DeleteDriverCommand(id))

    return {
      message: 'Motorista removido com sucesso',
    }
  }
}
