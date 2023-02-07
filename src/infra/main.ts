import { ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { logger } from './logger'

const PORT = 3000

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.useGlobalPipes(new ValidationPipe())
  await app.listen(PORT)

  logger.log(`Server Up on port: ${PORT}`)
}
bootstrap()
