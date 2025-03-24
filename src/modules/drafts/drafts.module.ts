import { Module } from '@nestjs/common'

import { OccurrenceModule } from '../occurrences/occurrence.module'
import { DraftsController } from './http/controller/drafts.controller'
import { DraftRepository } from './infra/draft.repository'

import {
  CreateDraftHandler,
  CreateHandler,
  UpdateDraftHandler,
} from './use-cases/commands/handler'

import { PrismaModule } from '@/common/database/prisma/prisma.module'
import { ListDraftHandler, ShowDraftHandler } from './use-cases/queries/handler'

@Module({
  imports: [OccurrenceModule, PrismaModule],
  controllers: [DraftsController],
  providers: [
    DraftRepository,
    CreateDraftHandler,
    CreateHandler,
    UpdateDraftHandler,
    ShowDraftHandler,
    ListDraftHandler,
  ],
})
export class DraftsModule {}
