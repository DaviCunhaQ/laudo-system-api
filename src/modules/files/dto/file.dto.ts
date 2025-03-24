import { createZodDto } from 'nestjs-zod'
import { z } from 'zod'

export const FileSchema = z.object({
  fieldname: z.string(),
  originalname: z.string(),
  encoding: z.string(),
  mimetype: z.string(),
  buffer: z.instanceof(Buffer),
})

export class FileDTO extends createZodDto(FileSchema) {}
