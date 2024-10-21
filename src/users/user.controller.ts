import { Controller, Get } from '@nestjs/common';
import { User } from '@prisma/client';
import { UserService } from './user.service';
import { Logger } from 'src/utils/winston/winston.service';

@Controller('users')
export class UserController {
  private readonly logger = new Logger(UserController.name);

  constructor(private readonly userService: UserService) {}

  @Get()
  findAll(): Promise<User[]> {
    this.logger.info('Fetching all users');
    return this.userService.findAll({});
  }
}