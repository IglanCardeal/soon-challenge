import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function createRandomCompanyClient(name: string) {
  return await prisma.company.create({
    data: {
      name,
    },
  })
}

export async function findAllCompanyClients() {
  return await prisma.company.findMany({})
}

export async function clearAllCompanyClients() {
  return await prisma.company.deleteMany({})
}
