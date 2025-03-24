import { PrismaModule } from '@/common/database/prisma/prisma.module'
import { Module } from '@nestjs/common'
import { OccurrenceModule } from '../occurrences/occurrence.module'
import { AuthoritiesController } from './http/controller/authorities.controller'
import { AuthorityRepository } from './infra/authority.repository'

import {
  CreateAuthorityHandler,
  DeleteAuthorityHandler,
  UpdateAuthorityHandler,
} from './use-cases/commands/handler'

import {
  ListAuthorityHandler,
  ShowAuthorityHandler,
} from './use-cases/queries/handler'

@Module({
  imports: [PrismaModule, OccurrenceModule],
  controllers: [AuthoritiesController],
  providers: [
    AuthorityRepository,
    CreateAuthorityHandler,
    ListAuthorityHandler,
    ShowAuthorityHandler,
    UpdateAuthorityHandler,
    DeleteAuthorityHandler,
  ],
})
export class AuthoritiesModule {}
