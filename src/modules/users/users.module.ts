import { Module } from '@nestjs/common'

import { UserRepository } from './infra/user.repository'

import { PrismaModule } from 'src/common/database/prisma/prisma.module'

import {
  CreateUserHandler,
  DeleteUserHandler,
  UpdateUserHandler,
} from '@modules/users/use-cases/commands/handler'

import {
  ListUsersHandler,
  ShowUserHandler,
} from '@modules/users/use-cases/queries/handler'

import { UsersController } from '@modules/users/http/controller/users.controller'

@Module({
  imports: [PrismaModule],
  controllers: [UsersController],
  providers: [
    UserRepository,
    CreateUserHandler,
    DeleteUserHandler,
    UpdateUserHandler,
    ListUsersHandler,
    ShowUserHandler,
  ],
  exports: [UserRepository],
})
export class UsersModule {}
