import {
  BadRequestException,
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
  CreateOccurrenceCommand,
  DeleteOccurrenceCommand,
  UpdateOccurrenceCommand,
} from '../../use-cases/commands/command'

import {
  ListOccurrenceQuery,
  ShowOccurrenceQuery,
} from '../../use-cases/queries/query'

import {
  ICreateOccurrenceDto,
  IUpdateOccurrenceDto,
} from '../dto/occurrence.dto'
import { PaginationSchema } from '../dto/query.dto'

@Controller('occurrences')
export class OccurrencesController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Get()
  async findAll(@Query() query: Record<string, string>) {
    const queryParams = {
      page: query.page ? Number(query.page) : undefined,
      perPage: query.perPage ? Number(query.perPage) : undefined,
    }

    const queryValid = PaginationSchema.safeParse(queryParams)

    if (!queryValid.success) {
      throw new BadRequestException(queryValid.error.format())
    }

    const { page = 1, perPage = 10 } = queryValid.data

    return await this.queryBus.execute(new ListOccurrenceQuery(page, perPage))
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.queryBus.execute(new ShowOccurrenceQuery(id))
  }

  @Post()
  async create(@Body() data: ICreateOccurrenceDto) {
    const occurrence = await this.commandBus.execute(
      new CreateOccurrenceCommand(data),
    )

    return { id: occurrence.id, message: 'Ocorrência criada com sucesso' }
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateOccurrenceDto: IUpdateOccurrenceDto,
  ) {
    await this.commandBus.execute(
      new UpdateOccurrenceCommand({ id, ...updateOccurrenceDto }),
    )

    return { message: 'Ocorrência atualizada com sucesso' }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    await this.commandBus.execute(new DeleteOccurrenceCommand({ id }))

    return { message: 'Ocorrência removida com sucesso' }
  }
}
