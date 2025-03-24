import { Injectable } from '@nestjs/common'
import { User, Prisma } from '@prisma/client'
import { PrismaService } from 'src/common/database/prisma/prisma.service'

@Injectable()
export class UserRepository {
  constructor(private readonly prismaService: PrismaService) {}

  public async getAll(): Promise<User[]> {
    return await this.prismaService.user.findMany()
  }

  public async getById(id: string) {
    return await this.prismaService.user.findUnique({ where: { id } })
  }

  public async getByParams<T extends keyof Prisma.UserWhereInput>(
    where: Record<T, Prisma.UserWhereInput[T]>,
  ) {
    return await this.prismaService.user.findFirst({
      where: where,
    })
  }

  public async create(user: Prisma.UserCreateInput) {
    return await this.prismaService.user.create({ data: user })
  }

  public async update(id: string, user: Prisma.UserUpdateInput) {
    return await this.prismaService.user.update({ where: { id }, data: user })
  }

  public async delete(id: string) {
    return await this.prismaService.user.delete({ where: { id } })
  }

  public async updatePasswordAndResetToken(id: string, data: any) {
    return await this.prismaService.user.update({
      where: { id },
      data: {
        password: data.password,
        resetToken: data.resetToken,
      },
    })
  }
}
