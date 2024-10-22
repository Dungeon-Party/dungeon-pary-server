import { NestFactory } from '@nestjs/core'
import { VersioningType } from '@nestjs/common'
import { AppModule } from './app.module'
import { Logger } from './common/winston/winston.service'

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
  })
  app.useLogger(app.get(Logger))
  app.enableVersioning({
    type: VersioningType.URI,
  })
  await app.listen(process.env.PORT ?? 3000)
}
bootstrap()
