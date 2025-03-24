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
  CreateParticipantCommand,
  DeleteParticipantCommand,
  UpdateParticipantCommand,
} from '../../use-cases/commands/command'
import {
  ListParticipantQuery,
  ShowParticipantQuery,
} from '../../use-cases/queries/query'
import {
  ICreateIncidentParticipantDto,
  IUpdateIncidentParticipantDto,
} from '../dto/participant.dto'

@Controller('participants')
export class ParticipantsController {
  constructor(
    private queryBus: QueryBus,
    private commandBus: CommandBus,
  ) {}

  @Get()
  async findAll(@Query('occurrenceId') occurrenceId: string) {
    return await this.queryBus.execute(new ListParticipantQuery(occurrenceId))
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.queryBus.execute(new ShowParticipantQuery(id))
  }

  @Post()
  async create(@Body() createParticipantDto: ICreateIncidentParticipantDto) {
    await this.commandBus.execute(
      new CreateParticipantCommand(createParticipantDto),
    )

    return {
      message: 'Participante criado com sucesso',
    }
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateParticipantDto: IUpdateIncidentParticipantDto,
  ) {
    await this.commandBus.execute(
      new UpdateParticipantCommand(id, updateParticipantDto),
    )

    return {
      message: 'Participante atualizado com sucesso',
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    await this.commandBus.execute(new DeleteParticipantCommand(id))

    return {
      message: 'Participante removido com sucesso',
    }
  }
}
