import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  Query,
} from '@nestjs/common'
import { CommandBus, QueryBus } from '@nestjs/cqrs'
import {
  CreateDraftCommand,
  DeleteDraftCommand,
  UpdateDraftCommand,
} from '../../use-cases/commands/command'
import { ShowDraftQuery } from '../../use-cases/queries/query'
import { ListDraftsQuery } from '../../use-cases/queries/query/list-handler.query'
import { ICreateDraftDto, IUpdateDraftDto } from '../dto/draft.dto'

@Controller('drafts')
export class DraftsController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Post()
  async create(
    @Query('id') id: string | null,
    @Body() createDraftDto: ICreateDraftDto,
  ) {
    await this.commandBus.execute(new CreateDraftCommand(createDraftDto, id))
  }

  @Get()
  async findAll() {
    return this.queryBus.execute(new ListDraftsQuery())
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.queryBus.execute(new ShowDraftQuery(id))
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() data: IUpdateDraftDto) {
    return this.commandBus.execute(new UpdateDraftCommand(id, data))
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.commandBus.execute(new DeleteDraftCommand(id))
  }
}
