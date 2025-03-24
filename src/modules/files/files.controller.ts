import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  StreamableFile,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common'
import { FilesService } from './files.service'
import { FilesInterceptor } from '@nestjs/platform-express'
import { FileDTO } from './dto/file.dto'
import { ImageValidationInterceptor } from './file.interceptor'

@Controller('files')
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  @Post()
  @UseInterceptors(FilesInterceptor('files'), ImageValidationInterceptor)
  async uploadFile(
    @UploadedFiles() files: Array<FileDTO>,
    @Body('occurrenceId') occurrenceId: string,
  ) {
    await this.filesService.uploadFile(occurrenceId, files)

    return { message: 'Arquivos enviados com sucesso' }
  }

  @Get(':occurrenceId/:fileName')
  async getOneFile(
    @Param('occurrenceId') occurrenceId: string,
    @Param('fileName') fileName: string,
  ) {
    const { buffer, contentType } = await this.filesService.getOneFile(
      occurrenceId,
      fileName,
    )

    return new StreamableFile(buffer, { type: contentType })
  }

  @Delete(':occurrenceId/:fileName')
  async deleteFile(
    @Param('occurrenceId') occurrenceId: string,
    @Param('fileName') fileName: string,
  ) {
    await this.filesService.deleteFile(occurrenceId, fileName)

    return { message: 'Arquivo excluido com sucesso' }
  }
}
