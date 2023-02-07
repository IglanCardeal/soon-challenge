import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

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
