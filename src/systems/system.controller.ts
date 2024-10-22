import { Controller, Get } from '@nestjs/common'
import { Logger } from '../common/winston/winston.service'
import { SystemService } from './system.service'
import { System } from '@prisma/client'

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
