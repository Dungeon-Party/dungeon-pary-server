import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { Logger } from './utils/winston/winston.service'

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
  })
  app.useLogger(app.get(Logger))
  await app.listen(process.env.PORT ?? 3000)
}
bootstrap()
