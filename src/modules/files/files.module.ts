import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { OccurrenceModule } from '../occurrences/occurrence.module'
import { FilesController } from './files.controller'
import { FilesService } from './files.service'

@Module({
  imports: [OccurrenceModule, ConfigModule],
  controllers: [FilesController],
  providers: [FilesService],
})
export class FilesModule {}
