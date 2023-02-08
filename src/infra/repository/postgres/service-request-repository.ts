import { PrismaClient } from '@prisma/client'
import {
  FindCompanyServicesRepository,
  FindServiceRequestRepository,
  ServiceRequestRepository,
} from 'src/domain/contracts'
import { ServiceRequest } from 'src/domain/model/service-request'
import { FindCompanyServicesDTO } from 'src/usecases/find-company-services/find-company-services-contracts'

const prisma = new PrismaClient()

export class PostgreServiceRequestRepository
  implements
    ServiceRequestRepository,
    FindServiceRequestRepository,
    FindCompanyServicesRepository
{
  async save(
    serviceRequest: Omit<ServiceRequest, 'id'>,
  ): Promise<ServiceRequest> {
    const {
      collectionAddress,
      createdAt,
      deliveries,
      serviceType,
      total,
      vehicles,
    } = serviceRequest

    const resp = await prisma.serviceRequest.create({
      data: {
        companyId: +serviceRequest.company.id,
        collectionAddress,
        createdAt,
        deliveries: JSON.stringify(deliveries),
        serviceType,
        total,
        vehicles,
      },
    })

    return { ...serviceRequest, id: resp.id }
  }

  async findById(id: string): Promise<ServiceRequest | null> {
    const resp = await prisma.serviceRequest.findUnique({
      where: {
        id,
      },
      include: {
        company: true,
      },
    })
    if (!resp) return null

    return {
      id: resp.id,
      serviceType: resp.serviceType,
      createdAt: resp.createdAt,
      total: resp.total,
      collectionAddress: resp.collectionAddress,
      deliveries: JSON.parse(resp.deliveries as string),
      vehicles: resp.vehicles,
      company: resp.company,
    } as any
  }

  async findByCompanyId(
    data: FindCompanyServicesDTO,
  ): Promise<ServiceRequest[]> {
    const { companyId, endDate, startDate } = data
    const res: any[] =
      await prisma.$queryRaw`SELECT * FROM "ServiceRequest" WHERE "companyId" = ${companyId} AND "createdAt" BETWEEN ${startDate} AND ${endDate}`

    for (let index = 0; index < res.length; index++) {
      res[index].deliveries = JSON.parse(res[index].deliveries)
    }

    return res as ServiceRequest[]
  }
}
