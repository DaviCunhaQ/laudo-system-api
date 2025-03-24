import { PrismaService } from '@/common/database/prisma/prisma.service'
import { ConflictException } from '@nestjs/common'
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs'
import { ListUsersQuery } from '../query'

@QueryHandler(ListUsersQuery)
export class ListUsersHandler implements IQueryHandler<ListUsersQuery> {
  constructor(private readonly prismaService: PrismaService) {}

  async execute(query: ListUsersQuery) {
    const { page, perPage } = query

    const [users, totalUsers] = await this.prismaService.$transaction([
      this.prismaService.user.findMany({
        skip: (page - 1) * perPage,
        take: perPage,
      }),
      this.prismaService.user.count(),
    ])

    const mappedUsers = users.map((user) => ({
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
    }))

    return {
      page,
      totalPages: Math.ceil(totalUsers / perPage),
      users: mappedUsers,
    }
  }
}
