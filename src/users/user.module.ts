import {Module} from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { PrismaModule } from '../utils/prisma/prisma.module';

@Module({
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}