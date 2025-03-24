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
  CreateAuthorityCommand,
  DeleteAuthorityCommand,
  UpdateAuthorityCommand,
} from '../../use-cases/commands/command'
import {
  ListAuthorityQuery,
  ShowAuthorityQuery,
} from '../../use-cases/queries/query'
import {
  ICreateAuthorityDto,
  IUpdateAuthorityDto,
} from '../dto/authorities.dto'

@Controller('authorities')
export class AuthoritiesController {
  constructor(
    private commandBus: CommandBus,
    private queryBus: QueryBus,
  ) {}

  @Post()
  async create(@Body() data: ICreateAuthorityDto) {
    await this.commandBus.execute(new CreateAuthorityCommand(data))
    return {
      message: 'Autoridade criada com sucesso',
    }
  }

  @Get()
  async findAll(@Query('occurrenceId') occurrenceId: string) {
    return await this.queryBus.execute(new ListAuthorityQuery(occurrenceId))
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.queryBus.execute(new ShowAuthorityQuery(id))
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() data: IUpdateAuthorityDto) {
    await this.commandBus.execute(new UpdateAuthorityCommand(id, data))
    return {
      message: 'Autoridade atualizada com sucesso',
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    await this.commandBus.execute(new DeleteAuthorityCommand(id))
    return {
      message: 'Autoridade removida com sucesso',
    }
  }
}
