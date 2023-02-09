import { PrismaClient } from '@prisma/client'
import { logger } from 'src/infra/logger'

const prisma = new PrismaClient()

const clientsToCreate = [
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

const feedClientsTables = async () => {
  const promises = clientsToCreate.map(({ id, name }) =>
    createRandomCompanyClient(name, id),
  )

  await Promise.all(promises)

  logger.log('\n==================INFO==================\n')
  logger.warn('[DB Restart]: New clients created. Use one of these: ')
  logger.warn(JSON.stringify(clientsToCreate))
  logger.log('\n========================================\n')
}

export async function createRandomCompanyClient(name: string, id: number) {
  return await prisma.company.upsert({
    where: { id },
    update: { name: name },
    create: { id, name: name },
  })
}

export async function findAllCompanyClients() {
  return await prisma.company.findMany({})
}

export async function clearAllCompanyClients() {
  await prisma.serviceRequest.deleteMany({})
  return await prisma.company.deleteMany({})
}

export async function setupClientRandomData() {
  const clients = await findAllCompanyClients()

  if (clients.length) {
    logger.warn('[DB Restart]: Clients saved: ')
    logger.warn(JSON.stringify(clientsToCreate))
    return
  }

  await clearAllCompanyClients()
  await feedClientsTables()
}
