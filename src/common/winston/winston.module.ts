import { Module } from '@nestjs/common'
import { Logger } from './winston.service'

@Module({
  providers: [Logger],
  exports: [Logger],
})
export class WinstonModule {}
