import { IQueryHandler, QueryHandler } from '@nestjs/cqrs'
import { ShowUserQuery } from '../query'
import { UserRepository } from '@/modules/users/infra/user.repository'
import { NotFoundException } from '@nestjs/common'

@QueryHandler(ShowUserQuery)
export class ShowUserHandler implements IQueryHandler<ShowUserQuery> {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(query: ShowUserQuery) {
    const user = await this.userRepository.getById(query.id)
    if (!user) throw new NotFoundException('Usuário não encontrado')

    return { id: user.id, email: user.email, name: user.name, role: user.role }
  }
}
