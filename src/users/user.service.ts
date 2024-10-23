import { Injectable } from '@nestjs/common'
import { Prisma, User } from '@prisma/client'
import { hashSync } from 'bcryptjs'

import { PrismaService } from '../common/prisma/prisma.service'
import { Logger } from '../common/winston/winston.service'

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name)

  constructor(private prisma: PrismaService) {}

  async findOne(userWhereInput: Prisma.UserWhereInput): Promise<User | null> {
    return this.prisma.user.findFirst({
      where: userWhereInput,
    })
  }

  async findAll(params: {
    skip?: number
    take?: number
    cursor?: Prisma.UserWhereUniqueInput
    where?: Prisma.UserWhereInput
    orderBy?: Prisma.UserOrderByWithRelationInput
  }): Promise<User[]> {
    const { skip, take, cursor, where, orderBy } = params
    return this.prisma.user.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    })
  }

  async createUser(data: Prisma.UserCreateInput): Promise<User> {
    data.password = hashSync(data.password, process.env.SALT_ROUNDS || 10)
    return this.prisma.user.create({
      data,
    })
  }

  async updateUser(params: {
    where: Prisma.UserWhereUniqueInput
    data: Prisma.UserUpdateInput
  }): Promise<User> {
    const { where, data } = params
    return this.prisma.user.update({
      data,
      where,
    })
  }

  async deleteUser(where: Prisma.UserWhereUniqueInput): Promise<User> {
    return this.prisma.user.delete({
      where,
    })
  }

  async findApiKey(key: string): Promise<Partial<User> | null> {
    return this.prisma.user.findFirst({
      where: {
        apiKey: {
          some: {
            key,
            expiresAt: { gt: new Date() },
          },
        },
      },
      select: {
        name: true,
        username: true,
        email: true,
      },
    })
  }
}
