import { PrismaService } from '@/common/database/prisma/prisma.service'
import { ConflictException } from '@nestjs/common'
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs'
import { ListOccurrenceQuery } from '../query/list-occurrence.query'

@QueryHandler(ListOccurrenceQuery)
export class ListOccurrenceHandler
  implements IQueryHandler<ListOccurrenceQuery>
{
  constructor(private readonly prismaService: PrismaService) {}

  async execute(query: ListOccurrenceQuery): Promise<any> {
    const { page, perPage } = query

    if (page < 1 || perPage < 1) {
      throw new ConflictException(
        'Os valores da paginação devem ser maiores que 0.',
      )
    }

    const [occurrences, total] = await this.prismaService.$transaction([
      this.prismaService.occurrence.findMany({
        skip: (page - 1) * perPage,
        take: perPage,
      }),
      this.prismaService.occurrence.count(),
    ])

    return {
      page,
      totalPages: Math.ceil(total / perPage),
      occurrences,
    }
  }
}
