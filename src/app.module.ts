import { Module } from '@nestjs/common'
import { UserModule } from './users/user.module'
import { PrismaModule } from './common/prisma/prisma.module'
import { AuthModule } from './auth/auth.module'
import { WinstonModule } from './common/winston/winston.module'
import { SystemModule } from './systems/system.module'

@Module({
  imports: [WinstonModule, PrismaModule, AuthModule, UserModule, SystemModule],
})
export class AppModule {}
