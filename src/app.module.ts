import { Module } from '@nestjs/common'
import { UserModule } from './users/user.module'
import { PrismaModule } from './utils/prisma/prisma.module'
import { AuthModule } from './auth/auth.module'
import { WinstonModule } from './utils/winston/winston.module'

@Module({
  imports: [UserModule, PrismaModule, AuthModule, WinstonModule],
})
export class AppModule {}
