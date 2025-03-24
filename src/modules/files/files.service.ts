import { OccurrenceRepository } from '@modules/occurrences/infra/occurrence.repository'
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common'
import { ConfigService } from '@nestjs/config' // Importa o ConfigService
import { createClient } from '@supabase/supabase-js'
import { FileDTO } from './dto/file.dto'

@Injectable()
export class FilesService {
  constructor(
    private readonly occurrenceRepository: OccurrenceRepository,
    private readonly configService: ConfigService, // Injeta o ConfigService
  ) {}

  private supabaseClient() {
    const supabaseUrl = this.configService.get<string>('SUPABASE_PROJECT_URL')
    const supabaseKey = this.configService.get<string>('SUPABASE_API_KEY')

    if (!supabaseUrl || !supabaseKey) {
      throw new BadRequestException('Erro ao obter as credenciais do Supabase')
    }

    return createClient(supabaseUrl, supabaseKey)
  }

  async uploadFile(occurrenceId: string, files: FileDTO[]) {
    const occurrence = await this.occurrenceRepository.getById(occurrenceId)
    if (!occurrence) {
      throw new NotFoundException('Ocorrência não encontrada')
    }

    const supabase = this.supabaseClient()
    const bucketName = 'occurrences'

    for (const file of files) {
      const filePath = `${occurrenceId}/${file.originalname}`

      const { error } = await supabase.storage
        .from(bucketName)
        .upload(filePath, file.buffer, {
          contentType: file.mimetype,
          upsert: true,
        })

      if (error) {
        console.error(error)
        throw new BadRequestException(
          `Erro ao enviar o arquivo ${file.originalname}: ${error.message}`,
        )
      }
    }
  }

  async getOneFile(occurrenceId: string, fileName: string) {
    const supabase = this.supabaseClient()
    const bucketName = 'occurrences'
    const filePath = `${occurrenceId}/${fileName}`

    const occurrenceExists =
      await this.occurrenceRepository.getById(occurrenceId)
    if (!occurrenceExists) {
      throw new NotFoundException('Ocorrência não encontrada')
    }

    const { data, error } = await supabase.storage
      .from(bucketName)
      .download(filePath)

    if (error) {
      console.error(`Erro ao baixar o arquivo ${fileName}:`, error)
      throw new BadRequestException(`Erro ao obter o arquivo ${fileName}`)
    }

    return {
      buffer: Buffer.from(await data.arrayBuffer()),
      contentType: data.type,
    }
  }

  async deleteFile(occurrenceId: string, fileName: string) {
    const supabase = this.supabaseClient()
    const bucketName = 'occurrences'
    const filePath = `${occurrenceId}/${fileName}`

    const occurrenceExists =
      await this.occurrenceRepository.getById(occurrenceId)
    if (!occurrenceExists) {
      throw new NotFoundException('Ocorrência não encontrada')
    }

    const { data: files, error: listError } = await supabase.storage
      .from(bucketName)
      .list(`${occurrenceId}`, { limit: 100 })

    if (listError) {
      console.error(listError)
      throw new BadRequestException(listError.message)
    }

    const fileExists = files.some((file) => file.name === fileName)
    if (!fileExists) {
      throw new NotFoundException(`Arquivo ${fileName} não encontrado`)
    }

    const { error } = await supabase.storage.from(bucketName).remove([filePath])
    if (error) {
      console.error(error)
      throw new BadRequestException(error.message)
    }
  }
}
