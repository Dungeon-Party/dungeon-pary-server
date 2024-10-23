import { Controller, Get } from '@nestjs/common'
import { System } from '@prisma/client'

import { Logger } from '../common/winston/winston.service'
import { SystemService } from './system.service'

@Controller('systems')
export class SystemController {
  private readonly logger = new Logger(SystemController.name)

  constructor(private readonly systemService: SystemService) {}

  @Get()
  getAll(): Promise<System[]> {
    this.logger.info('Fetching all systems')
    return this.systemService.findAll({})
  }
}
