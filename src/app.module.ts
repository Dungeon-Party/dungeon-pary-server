import { Module } from '@nestjs/common';
import { UserModule } from './users/user.module';
import { PrismaModule } from './utils/prisma/prisma.module';

@Module({
  imports: [UserModule, PrismaModule],
})
export class AppModule {}