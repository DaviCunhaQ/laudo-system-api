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
import { ICreateUserDto, IUpdateUserDto } from '../dto/user.dto'

import { CommandBus, QueryBus } from '@nestjs/cqrs'
import { Public } from 'src/common/decorators/public.decorator'

import {
  CreateUserCommand,
  DeleteUserCommand,
  UpdateUserCommand,
} from '@modules/users/use-cases/commands/command'

import {
  ListUsersQuery,
  ShowUserQuery,
} from '@modules/users/use-cases/queries/query'
import { PaginationSchema } from '../dto/query.dto'

@Controller('users')
export class UsersController {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus,
  ) {}

  @Public()
  @Post()
  async create(@Body() data: ICreateUserDto) {
    await this.commandBus.execute(new CreateUserCommand(data))

    return { message: 'Usuário criado com sucesso' }
  }

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

    return await this.queryBus.execute(new ListUsersQuery(page, perPage))
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.queryBus.execute(new ShowUserQuery(id))
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() data: IUpdateUserDto) {
    await this.commandBus.execute(new UpdateUserCommand(id, data))

    return { message: 'Usuário atualizado com sucesso' }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    await this.commandBus.execute(new DeleteUserCommand(id))

    return { message: 'Usuário removido com sucesso' }
  }
}
