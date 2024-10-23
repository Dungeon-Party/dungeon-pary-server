import { Injectable } from '@nestjs/common'
import { Prisma, System } from '@prisma/client'

import { PrismaService } from '../common/prisma/prisma.service'
import { Logger } from '../common/winston/winston.service'

@Injectable()
export class SystemService {
  private readonly logger = new Logger(SystemService.name)

  constructor(private prisma: PrismaService) {}

  async findOne(
    systemWhereUniqueInput: Prisma.SystemWhereUniqueInput,
  ): Promise<System | null> {
    return this.prisma.system.findUnique({
      where: systemWhereUniqueInput,
    })
  }

  async findAll(params: {
    skip?: number
    take?: number
    cursor?: Prisma.SystemWhereUniqueInput
    where?: Prisma.SystemWhereInput
    orderBy?: Prisma.SystemOrderByWithRelationInput
  }): Promise<System[]> {
    const { skip, take, cursor, where, orderBy } = params
    return this.prisma.system.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    })
  }
}
