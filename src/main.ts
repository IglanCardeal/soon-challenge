import { ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { AppModule } from './infra/app.module'
import { logger } from './infra/logger'

import { Request, Response, NextFunction } from 'express'
import {
  clearAllCompanyClients,
  createRandomCompanyClient,
} from './infra/repository/utils'

const PORT = 3000

const feedClientsTables = async () => {
  const clients = [
    {
      id: 1,
      name: 'Teste',
    },
    {
      id: 1,
      name: 'Teste3',
    },
    {
      id: 1,
      name: 'Teste3',
    },
  ]

  const promises = clients.map(({ id, name }) =>
    createRandomCompanyClient(name, id),
  )

  await Promise.all(promises)

  logger.log('\n==================INFO==================\n')
  logger.warn('[DB Restart]: New clients created. Use one of these: ')
  logger.warn(JSON.stringify(clients))
  logger.log('\n========================================\n')
}

async function bootstrap() {
  try {
    const app = await NestFactory.create(AppModule)

    app.useGlobalPipes(new ValidationPipe())
    app.use((_req: Request, _res: Response, next: NextFunction) => {
      logger.log('Request...')
      next()
    })

    await clearAllCompanyClients()

    await feedClientsTables()

    await app.listen(PORT)

    logger.log(`Server Up on port: ${PORT}`)
  } catch (error: any) {
    logger.error(error.stack)
  }
}
bootstrap()
