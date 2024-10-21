import { ConsoleLogger, Injectable } from '@nestjs/common'
import Winston, { createLogger, format, transports } from 'winston'

const { combine, timestamp, label, printf, colorize } = format
const logFormat = printf(({ level, message, label, timestamp }) => {
  return `${timestamp} [${label}] ${level}: ${message}`
})

@Injectable()
export class Logger extends ConsoleLogger {
  logger: Winston.Logger

  constructor(customLabel?: string) {
    super()
    this.logger = createLogger({
      level: process.env.LOG_LEVEL || 'info',
      format: combine(
        colorize(),
        label({ label: customLabel || 'default' }),
        timestamp(),
        logFormat,
      ),
      transports: [new transports.Console()],
    })
  }

  info(message: string) {
    this.logger.info(message)
  }

  error(message: string) {
    this.logger.error(message)
  }

  warn(message: string) {
    this.logger.warn(message)
  }

  debug(message: string) {
    this.logger.debug(message)
  }

  verbose(message: string) {
    this.logger.verbose(message)
  }

  log(message: string) {
    this.info(message)
  }
}
