import { ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { AppModule } from './infra/app.module'
import { logger } from './infra/logger'

import { Request, Response, NextFunction } from 'express'

const PORT = 3000

async function bootstrap() {
  try {
    const app = await NestFactory.create(AppModule)

    app.useGlobalPipes(new ValidationPipe())
    app.use((_req: Request, _res: Response, next: NextFunction) => {
      logger.log('Request...')
      next()
    })
    await app.listen(PORT)

    logger.log(`Server Up on port: ${PORT}`)
  } catch (error: any) {
    logger.error(error.stack)
  }
}
bootstrap()
